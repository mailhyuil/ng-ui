import { Directive, ElementRef, HostListener, inject } from "@angular/core";

@Directive({
  selector: "[numbersOnly]",
  standalone: true,
})
export class NumbersOnlyDirective {
  private readonly ele = inject(ElementRef<HTMLInputElement>);

  private run(event: any) {
    const currentValue: string = this.ele.nativeElement.value;
    const numbersOnlyValue = currentValue.replace(/[^0-9]*/g, "");
    if (currentValue !== numbersOnlyValue) {
      event.preventDefault();
      event.stopPropagation();
      this.ele.nativeElement.value = numbersOnlyValue;
    }
  }

  @HostListener("input", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    this.run(event);
  }

  @HostListener("paste", ["$event"])
  onPaste(event: ClipboardEvent) {
    this.run(event);
  }
}
