import { booleanAttribute, Component, input } from '@angular/core';
import { HintComponent } from '../hint/hint.component';

@Component({
  selector: 'mh-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  standalone: true,
  imports: [HintComponent],
})
export class LabelComponent {
  required = input(false, {
    transform: booleanAttribute,
  });
  label = input<string>('');
  hints = input<string[]>([]);
}
