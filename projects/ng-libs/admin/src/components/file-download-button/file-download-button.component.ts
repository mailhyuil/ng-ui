import { Component, Input } from '@angular/core';
import { FileSizePipe } from '@mailhyuil/ng-libs';
import { saveAs } from 'file-saver-es';

interface FileType {
  url: string;
  name: string;
  size: number;
}

@Component({
  selector: 'mh-file-download-button',
  templateUrl: './file-download-button.component.html',
  styleUrls: ['./file-download-button.component.scss'],
  standalone: true,
  imports: [FileSizePipe],
})
export class FileDownloadButtonComponent {
  @Input() file?: FileType;
  async download() {
    if (!this.file) return;
    saveAs(this.file.url, this.file.name);
  }
}
