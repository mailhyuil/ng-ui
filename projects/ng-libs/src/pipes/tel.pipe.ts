import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tel',
  standalone: true,
})
export class TelPipe implements PipeTransform {
  transform(tel: string): string {
    return tel
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
  }
}
