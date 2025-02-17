import { booleanAttribute, Component, computed, input } from '@angular/core';
import { Color } from '../../types/color.type';

export type ButtonStyle = 'solid' | 'text';

@Component({
  selector: 'mh-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [],
})
export class ButtonComponent {
  expand = input(false, { transform: booleanAttribute });
  color = input<Color>('primary');
  disabled = input(false);
  type = input<string>('button');
  variant = input<ButtonStyle>('solid');
  computedStyle = computed(() => {
    const width = this.expand() ? 'w-full' : 'max-w-max';
    const color = this.color();
    const style =
      this.variant() === 'solid'
        ? this.solidColorMap[color]
        : this.textColorMap[color];
    return `${style} ${width}`;
  });
  solidColorMap: Record<Color, string> = {
    primary: 'bg-primary-500 text-white hover:opacity-70',
    secondary: 'bg-secondary-500 text-white hover:opacity-70',
    tertiary: 'bg-tertiary-500 text-white hover:opacity-70',
    danger: 'bg-danger-500 text-white hover:opacity-70',
    neutral: 'bg-neutral-500 text-white hover:opacity-70',
    success: 'bg-success-500 text-white hover:opacity-70',
    warning: 'bg-warning-500 text-white hover:opacity-70',
    info: 'bg-info-500 text-white hover:opacity-70',
    medium: 'bg-medium-500 text-white hover:opacity-70',
  };
  textColorMap: Record<Color, string> = {
    primary: 'text-primary-500 hover:bg-primary-50',
    secondary: 'text-secondary-500 hover:bg-secondary-50',
    tertiary: 'text-tertiary-500 hover:bg-tertiary-50',
    danger: 'text-danger-500 hover:bg-danger-50',
    neutral: 'text-neutral-500 hover:bg-neutral-50',
    success: 'text-success-500 hover:bg-success-50',
    warning: 'text-warning-500 hover:bg-warning-50',
    info: 'text-info-500 hover:bg-info-50',
    medium: 'text-medium-500 hover:bg-medium-50',
  };
}
