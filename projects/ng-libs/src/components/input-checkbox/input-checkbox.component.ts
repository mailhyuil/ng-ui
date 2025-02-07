import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ValueAccessorDirective } from '../../directives/value-accessor.directive';

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
  constructor(public readonly valueAccessor: ValueAccessorDirective<boolean>) {
    valueAccessor.value.subscribe((v) => {
      this.value.set(v);
    });
  }
  toggle() {
    const newValue = !this.value();
    this.valueAccessor.writeValue(newValue);
    this.valueAccessor.valueChange(newValue);
  }
}
