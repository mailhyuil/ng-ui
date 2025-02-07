import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  booleanAttribute,
  Component,
  contentChildren,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { AbstractControl, FormsModule, NgControl } from '@angular/forms';
import { tap } from 'rxjs';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { ValueAccessorDirective } from '../../directives/value-accessor.directive';
import { LabelComponent } from '../label/label.component';
import { SelectItemComponent } from '../select-item/select-item.component';

@Component({
  selector: 'mh-select-group',
  templateUrl: './select-group.component.html',
  styleUrls: ['../../themes/input.component.scss'],
  standalone: true,
  imports: [LabelComponent, FormsModule, ClickOutsideDirective, NgClass],
  hostDirectives: [ValueAccessorDirective],
})
export class SelectGroupComponent implements AfterViewInit, OnInit {
  value = signal<string>('');
  selects = contentChildren(SelectItemComponent);
  selectRefs = contentChildren(SelectItemComponent, {
    read: ElementRef,
  });
  data = model<unknown[]>([]);
  isOpen = signal(false);
  label = input('');
  placeholder = input('');
  required = input(false, {
    transform: booleanAttribute,
  });
  ngControl = inject(NgControl, {
    optional: true,
    self: true,
  });
  direction = input<'down' | 'up'>('down');
  directionMap = {
    down: 'bottom-0 left-0 translate-y-full',
    up: 'top-0 left-0 -translate-y-full',
  };
  control?: AbstractControl;
  search = input(false);

  constructor(public readonly valueAccessor: ValueAccessorDirective<string>) {
    valueAccessor.value.subscribe((v) => {
      if (v != null) {
        this.value.set(v);
        this.isOpen.set(false);
        setTimeout(() => {
          const selects = this.selects();
          selects.forEach((select) => {
            select.selectedValue$.next(v);
          });
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this._init();
  }

  index = signal(0);
  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const selects = this.selects();
    if (event.key === 'ArrowDown') {
      this.index.set((this.index() + 1) % selects.length);
    } else if (event.key === 'ArrowUp') {
      this.index.set((this.index() - 1 + selects.length) % selects.length);
    } else if (event.key === 'Enter') {
      event.stopPropagation();
      event.preventDefault();
      const value = selects[this.index()].value();
      if (!value) return;
      this.setValue(value);
    }
  }

  ngOnInit(): void {
    this.control = this.ngControl?.control || undefined;
  }

  _init() {
    const selects = this.selects();
    selects.forEach((select) => {
      select.select$
        .pipe(
          tap((value) => {
            selects.forEach((select) => {
              select.selectedValue$.next(value);
            });
          })
        )
        .subscribe((v) => {
          this.setValue(v);
        });
    });
  }

  setValue(value: string) {
    this.data.set([]);

    this.valueAccessor.writeValue(value);
    this.valueAccessor.valueChange(value);
  }
  open() {
    this.isOpen.set(true);
  }
  close() {
    this.isOpen.set(false);
  }
  searchValue(event: any) {
    const value = event.target.value;

    if (!value) {
      this.selects().forEach((select) => {
        select.hidden.set(false);
      });
      return;
    }

    this.selects().forEach((select) => {
      if (!select.value()?.includes(value)) {
        select.hidden.set(true);
      } else {
        select.hidden.set(false);
      }
    });

    this.open();
  }
}
