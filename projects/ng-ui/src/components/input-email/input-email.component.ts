import {
  booleanAttribute,
  Component,
  HostListener,
  inject,
  input,
  OnInit,
  signal,
} from "@angular/core";
import { AbstractControl, FormsModule, NgControl } from "@angular/forms";
import { ValueAccessorDirective } from "../../directives/value-accessor.directive";
import { ErrorMessageComponent } from "../error-message/error-message.component";
import { LabelComponent } from "../label/label.component";

@Component({
  selector: "app-input-email",
  templateUrl: "./input-email.component.html",
  styleUrls: ["../../themes/input.component.scss"],
  standalone: true,
  imports: [FormsModule, ErrorMessageComponent, LabelComponent],
  hostDirectives: [ValueAccessorDirective],
})
export class InputEmailComponent implements OnInit {
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
  maxLength = input(100);
  isOpen = signal(false);
  hints = input<string[]>([]);
  emails = input([
    "naver.com",
    "gmail.com",
    "hanmail.net",
    "nate.com",
    "kakao.com",
  ]);
  index = signal(0);

  constructor(public readonly valueAccessor: ValueAccessorDirective<string>) {
    valueAccessor.value.subscribe((v) => {
      this.value.set(v);
    });
  }

  ngOnInit(): void {
    this.control = this.ngControl?.control || undefined;
  }

  @HostListener("keydown", ["$event"])
  handleKeyDown(event: KeyboardEvent) {
    const emails = this.emails();
    if (event.key === "ArrowDown") {
      this.index.set((this.index() + 1) % emails.length);
    } else if (event.key === "ArrowUp") {
      this.index.set((this.index() - 1 + emails.length) % emails.length);
    } else if (event.key === "Enter") {
      event.stopPropagation();
      event.preventDefault();
      this.selectEmail(this.value() + emails[this.index()]);
    }
  }

  setValue(event: string) {
    this.valueAccessor.writeValue(event);
    this.valueAccessor.valueChange(event);
  }

  handleInput(event: any) {
    if (event.data === "@") {
      this.isOpen.set(true);
    } else {
      this.isOpen.set(false);
    }
  }

  selectEmail(email: string) {
    this.valueAccessor.writeValue(email);
    this.valueAccessor.valueChange(email);
    this.isOpen.set(false);
  }

  handleBlur() {
    this.valueAccessor.touchedChange(true);
  }
}
