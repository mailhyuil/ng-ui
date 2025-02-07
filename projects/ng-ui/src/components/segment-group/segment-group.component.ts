import {
  AfterViewInit,
  Component,
  contentChildren,
  ElementRef,
  model,
  signal,
  viewChild,
} from "@angular/core";
import { tap } from "rxjs";
import { SegmentItemComponent } from "../segment-item/segment-item.component";
import { ValueAccessorDirective } from "../../directives/value-accessor.directive";

@Component({
  selector: "app-segment-group",
  templateUrl: "./segment-group.component.html",
  styleUrls: ["./segment-group.component.scss"],
  standalone: true,
  imports: [],
  hostDirectives: [ValueAccessorDirective],
})
export class SegmentGroupComponent implements AfterViewInit {
  segments = contentChildren(SegmentItemComponent);
  value = signal<string | undefined>(undefined);

  cursor = model<string | undefined>(undefined);
  loading = model<boolean>(false);
  data = model<unknown[]>([]);
  index = viewChild<ElementRef<HTMLDivElement>>("index");
  container = viewChild<ElementRef<HTMLDivElement>>("container");
  childrenWidth: number[] = [];
  childrenPosition: number[] = [];

  constructor(public readonly valueAccessor: ValueAccessorDirective<string>) {
    valueAccessor.value.subscribe((v) => {
      if (v != null) {
        this.value.set(v);
        setTimeout(() => {
          const segments = this.segments();
          segments.forEach((segment) => {
            segment.selectedValue$.next(v);
          });
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this._init();

    // calculate children width and position
    const container = this.container()?.nativeElement;
    if (!container) return;
    const children = Array.from(container.children);
    children.forEach((child) => {
      this.childrenWidth.push(
        (child.scrollWidth / container.scrollWidth) * 100,
      );
    });
    this.childrenPosition = children.map((child) => {
      return this.sumBeforeIndex(this.childrenWidth, children.indexOf(child));
    });
    this.setIndex(0);
  }

  private sumBeforeIndex(arr: number[], index: number): number {
    if (index <= 0) return 0; // 첫 번째 인덱스면 합할 값이 없음
    return arr.slice(0, index).reduce((sum, num) => sum + num, 0);
  }

  private setIndex(selectedIndex: number) {
    const index = this.index()?.nativeElement;
    if (!index) return;
    index.style.transform = `translateX(${this.childrenPosition[selectedIndex]}%) scaleX(${this.childrenWidth[selectedIndex]}%)`;
  }

  private _init() {
    const segments = this.segments();
    segments.forEach((segment) => {
      segment.select$
        .pipe(
          tap((value) => {
            segments.forEach((segment) => {
              segment.selectedValue$.next(value);
            });
          }),
        )
        .subscribe((v) => {
          this.setValue(v);
        });
    });
  }

  setValue(value: string) {
    this.loading.set(true);
    this.cursor.set(undefined);
    this.data.set([]);
    const foundIndex = this.segments().findIndex(
      (segment) => segment.value() === value,
    );
    this.setIndex(foundIndex);
    this.valueAccessor.writeValue(value);
    this.valueAccessor.valueChange(value);
  }
}
