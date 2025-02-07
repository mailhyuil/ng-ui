import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[noWhitespace]",
  standalone: true,
})
export class NoWhitespaceDirective {
  constructor(private ele: ElementRef<HTMLInputElement>) {}

  private run() {
    setTimeout(() => {
      const ele = this.ele.nativeElement;
      const currentValue: string = ele.value;
      const noWhitespace = currentValue.replaceAll(/\s/g, "");
      ele.value = noWhitespace;
    });
  }

  @HostListener("paste", ["$event"])
  onPaste(event: ClipboardEvent) {
    this.run();
  }
}
