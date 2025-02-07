import { Component, input, OnDestroy, signal } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Component({
  selector: "app-select-item",
  templateUrl: "./select-item.component.html",
  styleUrls: ["./select-item.component.scss"],
  standalone: true,
  imports: [],
})
export class SelectItemComponent implements OnDestroy {
  value = input<string | undefined>(undefined);
  select$ = new Subject<string>();
  selectedValue$ = new BehaviorSubject<string | undefined>(undefined);
  hidden = signal(false);
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
