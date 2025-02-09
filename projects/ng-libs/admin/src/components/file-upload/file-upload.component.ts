import { NgOptimizedImage } from '@angular/common';
import {
  booleanAttribute,
  Component,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import {
  FileSizePipe,
  ToastService,
  ValueAccessorDirective,
} from '@mailhyuil/ng-libs';
import { HintComponent } from '../hint/hint.component';

interface CurrentFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  createdAt: Date;
  deletedAt: Date;

  extension?: string;
}

@Component({
  selector: 'mh-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  standalone: true,
  imports: [FileSizePipe, HintComponent, NgOptimizedImage],
  hostDirectives: [ValueAccessorDirective],
})
export class FileUploadComponent {
  toastService = inject(ToastService);

  value?: File | File[];
  accept = input<string[]>([]);
  label = input<string>();
  hints = input<string[]>([]);
  maxLength = input<number | undefined>(undefined);
  required = input(false, {
    transform: booleanAttribute,
  });

  currentFiles = model<CurrentFile[] | undefined>(undefined);
  currentFile = model<CurrentFile | undefined>(undefined);

  deleteFileChange = output<string>();

  multiple = false;
  uploadingUrl?: string;
  uploadingUrls: string[] = [];
  isActive = false;

  private readonly valueAccessor = inject(
    ValueAccessorDirective<File | File[] | undefined>
  );
  constructor() {
    this.valueAccessor.value.subscribe((value) => {
      if (!value) return;
      this.value = value;

      if (this.isFileArray(value)) {
        this.multiple = true;
        this.setObjectUrls(value);
        return;
      }

      this.setObjectUrl(value);
    });
  }

  onChange(event: any) {
    if (!event.target) return;
    const files = event.target.files;
    const isValidated = this.validate(files);
    if (!isValidated) return;

    if (this.isFileArray(this.value)) {
      this.value = Array.from([...this.value, ...files]);
      this.setObjectUrls(this.value);
      this.valueAccessor.valueChange(this.value);
      this.valueAccessor.touchedChange(true);
      return;
    }

    const file = files[0];
    this.value = file;
    this.setObjectUrl(file);
    if (!this.value) return;
    this.valueAccessor.valueChange(this.value);
    this.valueAccessor.touchedChange(true);
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    const isValidated = this.validate(files);
    if (!isValidated) return;
    if (this.isFileArray(this.value)) {
      this.isActive = false;
      this.value = Array.from([...this.value, ...files]);
      this.setObjectUrls(this.value);
      this.valueAccessor.valueChange(this.value);
      this.valueAccessor.touchedChange(true);
      return;
    }
    this.isActive = false;
    const file = files[0];
    if (!file) return;
    this.value = file;
    this.setObjectUrl(file);
    if (!this.value) return;
    this.valueAccessor.valueChange(this.value);
    this.valueAccessor.touchedChange(true);
  }

  remove(file: File, objectUrl: string) {
    URL.revokeObjectURL(objectUrl);

    if (this.isFileArray(this.value)) {
      this.value = this.value.filter((f) => f !== file);
      this.setObjectUrls(this.value);
      this.valueAccessor.valueChange(this.value);
      this.valueAccessor.touchedChange(true);
      return;
    }

    this.value = undefined;
    this.uploadingUrl = undefined;
    this.valueAccessor.valueChange(this.value);
    this.valueAccessor.touchedChange(true);
  }

  setObjectUrl(file: File) {
    if (!file) {
      this.uploadingUrl = undefined;
      return;
    }
    this.uploadingUrl = URL.createObjectURL(file);
  }

  setObjectUrls(files: File[]) {
    if (!files) {
      this.uploadingUrls = [];
      return;
    }
    this.uploadingUrls = files.map((file) => URL.createObjectURL(file));
  }

  onDragOver(ev: Event) {
    this.isActive = true;
    ev.preventDefault();
    ev.stopPropagation();
  }

  onDragLeave(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    this.isActive = false;
  }

  private validate(files: FileList | null) {
    const maxLength = this.maxLength();
    if (this.isFileArray(this.value)) {
      const currentFileCount = this.currentFiles?.length ?? 0;
      if (
        maxLength &&
        files &&
        files.length + currentFileCount + this.value.length > (maxLength ?? 0)
      ) {
        this.toastService.openDanger(
          `최대 ${maxLength}개까지 업로드 가능합니다.`
        );
        return false;
      }
    }
    if (this.isFile(this.value)) {
      if (
        maxLength &&
        files &&
        files.length + (this.currentFile() ? 1 : 0) + (this.value ? 1 : 0) >
          (maxLength ?? 0)
      ) {
        this.toastService.openDanger(
          `최대 ${maxLength}개까지 업로드 가능합니다.`
        );
        return false;
      }
    }
    return true;
  }

  isFileArray(value: File | File[] | undefined): value is File[] {
    if (this.currentFiles()) return true;
    return Array.isArray(value);
  }

  isFile(value: File | File[] | undefined): value is File {
    if (this.currentFile()) return true;
    return value instanceof File;
  }

  emitDeleteFile(id: string, index?: number) {
    if (index !== undefined && index > -1) {
      const currentFiles = this.currentFiles();
      if (!currentFiles) return;
      const rest = currentFiles.filter((_, i) => i !== index);
      this.currentFiles.set(rest);
    } else {
      this.currentFile.set(undefined);
    }
    this.deleteFileChange.emit(id);
  }
}
