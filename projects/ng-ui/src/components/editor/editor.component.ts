import {
  booleanAttribute,
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from "@angular/core";
import { AbstractControl, FormsModule, NgControl } from "@angular/forms";
import { QuillEditorComponent, QuillModules } from "ngx-quill";
import Quill from "quill";
import ImageResizor from "quill-image-resizor";
import { ValueAccessorDirective } from "../../directives/value-accessor.directive";
import { EDITOR_IMAGE_SERVICE } from "../../interfaces/image-service.interface";
import { ErrorMessageComponent } from "../error-message/error-message.component";
import { LabelComponent } from "../label/label.component";

// If Quill does not come from window-object -> set find method to correct instance
ImageResizor.Quill = Quill;
Quill.register("modules/imageResizor", ImageResizor);

@Component({
  selector: "app-editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.scss"],
  standalone: true,
  imports: [
    QuillEditorComponent,
    FormsModule,
    LabelComponent,
    ErrorMessageComponent,
  ],
  hostDirectives: [ValueAccessorDirective],
})
export class EditorComponent implements OnInit {
  value = signal("");
  editor?: Quill;
  modules: QuillModules = {};
  placeholder = input("글을 작성해주세요.");
  label = input("");
  required = input(false, {
    transform: booleanAttribute,
  });
  hints = input<string[]>([]);
  uploadImageChange = output<string>();
  imageService = inject(EDITOR_IMAGE_SERVICE);
  ngControl = inject(NgControl, {
    optional: true,
    self: true,
  });
  control?: AbstractControl;
  constructor(public valueAccessor: ValueAccessorDirective<string>) {
    this.modules = {
      imageResizor: {},
    };
    valueAccessor.value.subscribe((v) => {
      this.value.set(v);
    });
  }
  ngOnInit(): void {
    this.control = this.ngControl?.control || undefined;
  }

  setValue(event: any) {
    this.valueAccessor.writeValue(event);
    this.valueAccessor.valueChange(event);
  }

  onEditorCreated(editor: Quill) {
    this.editor = editor;
    const toolbar: any = this.editor.getModule("toolbar");
    toolbar.addHandler("image", this.imageHandler.bind(this));
  }

  imageHandler() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      if (!this.editor) throw new Error("editor is not defined");

      const file: any = input.files ? input.files[0] : null;
      if (!file) return;

      const range = this.editor.getSelection();
      if (!range) return;

      this.imageService.upload(file).subscribe(({ url }) => {
        if (!this.editor) throw new Error("editor is not defined");
        this.editor.insertEmbed(range.index, "image", `${url}`);
        this.uploadImageChange.emit(url);
        this.setValue(this.editor.root.innerHTML);
      });
    };
  }
  handleBlur() {
    this.valueAccessor.touchedChange(true);
  }
}
