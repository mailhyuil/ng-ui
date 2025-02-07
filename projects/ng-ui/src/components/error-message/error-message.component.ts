import { KeyValuePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  standalone: true,
  imports: [KeyValuePipe],
})
export class ErrorMessageComponent {
  control = input<AbstractControl>();
  name = input<string>();
}
