import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
  standalone: true,
})
export class FileSizePipe implements PipeTransform {
  transform(size: number, suffix = 'MB'): string {
    if (size < 1024) return size + 'B';
    if (size < 1024 * 1024) return (size / 1024).toFixed(2) + 'KB';
    return (size / (1024 * 1024)).toFixed(2) + suffix;
  }
}
