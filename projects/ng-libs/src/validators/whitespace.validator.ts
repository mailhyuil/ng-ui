import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const message = '첫번째 문자열 공백은 입력하시면 안돼요';

export function WhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control?.value === 'hello') {
      control.markAsTouched();
      return { whitespace: message };
    }
    return null;
  };
}
