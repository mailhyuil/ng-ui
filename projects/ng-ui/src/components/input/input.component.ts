import {
  booleanAttribute,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from "@angular/core";
import { AbstractControl, FormsModule, NgControl } from "@angular/forms";
import { ValueAccessorDirective } from "../../directives/value-accessor.directive";
import { ErrorMessageComponent } from "../error-message/error-message.component";
import { LabelComponent } from "../label/label.component";

export type InputType = "text" | "password" | "number";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["../../themes/input.component.scss"],
  standalone: true,
  imports: [FormsModule, ErrorMessageComponent, LabelComponent],
  hostDirectives: [ValueAccessorDirective],
})
export class InputComponent implements OnInit {
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
  type = input<InputType>("text");
  maxLength = input(100);
  hints = input<string[]>([]);
  constructor(public readonly valueAccessor: ValueAccessorDirective<string>) {
    valueAccessor.value.subscribe((v) => {
      this.value.set(v);
    });
  }

  ngOnInit(): void {
    this.control = this.ngControl?.control || undefined;
  }

  setValue(event: string) {
    this.valueAccessor.writeValue(event);
    this.valueAccessor.valueChange(event);
  }

  handleBlur() {
    this.valueAccessor.touchedChange(true);
  }
}
