import {
  booleanAttribute,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from "@angular/core";
import { AbstractControl, FormsModule, NgControl } from "@angular/forms";
import { NumbersOnlyDirective } from "../../directives/numbers-only.directive";
import { ValueAccessorDirective } from "../../directives/value-accessor.directive";
import { ErrorMessageComponent } from "../error-message/error-message.component";
import { LabelComponent } from "../label/label.component";

@Component({
  selector: "app-input-tel",
  templateUrl: "./input-tel.component.html",
  styleUrls: ["../../themes/input.component.scss"],
  standalone: true,
  imports: [
    FormsModule,
    ErrorMessageComponent,
    LabelComponent,
    NumbersOnlyDirective,
  ],
  hostDirectives: [ValueAccessorDirective],
})
export class InputTelComponent implements OnInit {
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
  type = input("text");
  maxLength = input(11);
  hints = ['"-" 없이 숫자만 입력해주세요'];
  constructor(public readonly valueAccessor: ValueAccessorDirective<string>) {
    valueAccessor.value.subscribe((v) => {
      this.value.set(v);
    });
  }

  ngOnInit(): void {
    this.control = this.ngControl?.control || undefined;
  }

  setValue(event: string) {
    const numbersOnlyValue = event.replace(/[^0-9]*/g, "");
    if (event !== numbersOnlyValue) {
      this.setValue(numbersOnlyValue);
      return;
    }
    this.valueAccessor.writeValue(event);
    this.valueAccessor.valueChange(event);
  }

  handleBlur() {
    this.valueAccessor.touchedChange(true);
  }
}
