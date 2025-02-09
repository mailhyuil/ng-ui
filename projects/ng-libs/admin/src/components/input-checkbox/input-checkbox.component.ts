import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ValueAccessorDirective } from '@mailhyuil/ng-libs';

@Component({
  selector: 'mh-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.scss'],
  standalone: true,
  imports: [NgClass],
  hostDirectives: [ValueAccessorDirective],
})
export class InputCheckboxComponent {
  value = signal(false);
  private readonly valueAccessor = inject(ValueAccessorDirective<boolean>);
  constructor() {
    this.valueAccessor.value.subscribe((v) => {
      this.value.set(v);
    });
  }
  toggle() {
    const newValue = !this.value();
    this.valueAccessor.writeValue(newValue);
    this.valueAccessor.valueChange(newValue);
  }
}
