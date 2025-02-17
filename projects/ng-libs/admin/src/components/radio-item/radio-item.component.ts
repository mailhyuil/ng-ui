import { AsyncPipe } from '@angular/common';
import { Component, input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'mh-radio-item',
  templateUrl: './radio-item.component.html',
  styleUrls: ['./radio-item.component.scss'],
  standalone: true,
  imports: [AsyncPipe],
})
export class RadioItemComponent implements OnDestroy {
  value = input<string | undefined>(undefined);
  select$ = new Subject<string>();
  selectedValue$ = new BehaviorSubject<string | undefined>(undefined);

  ngOnDestroy(): void {
    this.select$.complete();
    this.selectedValue$.complete();
  }

  _select() {
    const value = this.value();
    if (value) {
      this.select$.next(value);
    }
  }
}
