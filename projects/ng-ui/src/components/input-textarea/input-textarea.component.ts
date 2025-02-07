import {
  booleanAttribute,
  Component,
  inject,
  input,
  signal,
} from "@angular/core";
import { AbstractControl, FormsModule, NgControl } from "@angular/forms";
import { ValueAccessorDirective } from "../../directives/value-accessor.directive";
import { ErrorMessageComponent } from "../error-message/error-message.component";
import { LabelComponent } from "../label/label.component";

@Component({
  selector: "app-input-textarea",
  templateUrl: "./input-textarea.component.html",
  styleUrls: ["../../themes/input.component.scss"],
  standalone: true,
  imports: [FormsModule, ErrorMessageComponent, LabelComponent],
  hostDirectives: [ValueAccessorDirective],
})
export class InputTextareaComponent {
  value = signal("");
  label = input("");
  placeholder = input("");
  required = input(false, {
    transform: booleanAttribute,
  });
  ngControl = inject(NgControl, {
    optional: true,
    self: true,
  });
  control?: AbstractControl;
  maxLength = input(1024);
  hints = input<string[]>([]);
  constructor(public valueAccessor: ValueAccessorDirective<string>) {
    valueAccessor.value.subscribe((v) => [this.value.set(v)]);
  }

  setValue(event: any) {
    this.valueAccessor.writeValue(event);
    this.valueAccessor.valueChange(event);
  }

  handleBlur() {
    this.valueAccessor.touchedChange(true);
  }
}
