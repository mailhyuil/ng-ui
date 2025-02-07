import { Component, input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'mh-segment-item',
  templateUrl: './segment-item.component.html',
  styleUrls: ['./segment-item.component.scss'],
  standalone: true,
  imports: [],
})
export class SegmentItemComponent implements OnDestroy {
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
