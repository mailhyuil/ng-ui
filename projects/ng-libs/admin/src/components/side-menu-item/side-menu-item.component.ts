import { NgClass, NgStyle } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription, debounceTime, fromEvent } from 'rxjs';
import { SideMenuItem } from '../../types/mh-route.interface';

@Component({
  selector: 'mh-side-menu-item',
  standalone: true,
  imports: [RouterModule, NgClass, NgStyle],
  templateUrl: './side-menu-item.component.html',
  styleUrls: ['./side-menu-item.component.scss'],
})
export class SideMenuItemComponent implements AfterViewInit, OnDestroy {
  container = viewChild<ElementRef<HTMLElement> | undefined>('container');
  containerHeight = signal('');
  item = input<SideMenuItem | undefined>();
  isOpen = signal(false);
  router = inject(Router);
  subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngAfterViewInit(): void {
    const container = this.container();
    if (!container) throw new Error('Container is not found');
    this.containerHeight.set(container.nativeElement.scrollHeight + 'px');
    const sub = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.containerHeight.set(container.nativeElement.scrollHeight + 'px');
      });
    this.subscriptions.push(sub);
  }

  toggleOpen() {
    this.isOpen.update((value) => !value);
  }
}
