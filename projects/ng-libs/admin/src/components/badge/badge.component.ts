import { Component, computed, input } from '@angular/core';
import { Color } from '../../types/color.type';

@Component({
  selector: 'mh-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  standalone: true,
  imports: [],
})
export class BadgeComponent {
  value = input('');
  color = input<Color>('primary');
  computedStyle = computed(() => {
    const color = this.color();
    if (color === 'primary') return `bg-primary-500 text-white`;
    if (color === 'secondary') return `bg-secondary-500 text-white`;
    if (color === 'tertiary') return `bg-tertiary-500 text-white`;
    if (color === 'neutral') return `bg-neutral-500 text-white`;
    if (color === 'success') return `bg-success-500 text-white`;
    if (color === 'danger') return `bg-danger-500 text-white`;
    if (color === 'warning') return `bg-warning-500 text-white`;
    if (color === 'info') return `bg-info-500 text-white`;
    return `bg-primary-600 text-white`;
  });
}
