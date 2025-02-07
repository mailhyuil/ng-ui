import { Directive, ElementRef, HostListener, output } from "@angular/core";

@Directive({
  selector: "[clickOutside]",
  standalone: true,
})
export class ClickOutsideDirective {
  clickOutside = output<void>();
  constructor(private elementRef: ElementRef) {}

  @HostListener("document:click", ["$event.target"])
  public handleClick(target: any) {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
