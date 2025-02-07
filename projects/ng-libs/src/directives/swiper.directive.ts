import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input,
  afterNextRender,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, fromEvent } from 'rxjs';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
@Directive({
  selector: '[swiper]',
  standalone: true,
})
export class SwiperDirective {
  @Input('options') options?: SwiperOptions;
  cdr = inject(ChangeDetectorRef);
  constructor(private element: ElementRef<SwiperContainer>) {
    afterNextRender(() => {
      Object.assign(this.element.nativeElement, this.options);
      this.element.nativeElement.initialize();
      fromEvent(window, 'resize')
        .pipe(debounceTime(300), takeUntilDestroyed())
        .subscribe(() => {
          this.element.nativeElement.swiper.update();
          this.cdr.detectChanges();
        });
    });
  }
}
