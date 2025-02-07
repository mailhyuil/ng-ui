import { Component, computed, input } from '@angular/core';
import { Color } from '@mailhyuil/ng-libs';

@Component({
  selector: 'mh-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  standalone: true,
  imports: [],
})
export class BadgeComponent {
  color = input<Color>('primary');
  computedStyle = computed(() => {
    const color = this.color();
    return `bg-${color}-600 text-white`;
  });
}
