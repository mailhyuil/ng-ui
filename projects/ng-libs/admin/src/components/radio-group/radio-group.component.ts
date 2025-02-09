import {
  AfterViewInit,
  Component,
  contentChildren,
  inject,
  signal,
} from '@angular/core';
import { ValueAccessorDirective } from '@mailhyuil/ng-libs';
import { tap } from 'rxjs';
import { RadioItemComponent } from '../radio-item/radio-item.component';

@Component({
  selector: 'mh-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  standalone: true,
  imports: [],
  hostDirectives: [ValueAccessorDirective],
})
export class RadioGroupComponent implements AfterViewInit {
  radios = contentChildren(RadioItemComponent);
  value = signal<string | undefined>(undefined);

  private readonly valueAccessor = inject(ValueAccessorDirective<string>);
  constructor() {
    this.valueAccessor.value.subscribe((v) => {
      if (v != null) {
        this.value.set(v);
        setTimeout(() => {
          const radios = this.radios();
          radios.forEach((radio) => {
            radio.selectedValue$.next(v);
          });
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this._init();
  }

  _init() {
    const radios = this.radios();
    radios.forEach((radio) => {
      radio.select$
        .pipe(
          tap((value) => {
            radios.forEach((radio) => {
              radio.selectedValue$.next(value);
            });
          })
        )
        .subscribe((v) => {
          this.setValue(v);
        });
    });
  }

  setValue(value: string) {
    this.valueAccessor.writeValue(value);
    this.valueAccessor.valueChange(value);
  }
}
