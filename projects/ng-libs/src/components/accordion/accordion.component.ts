import {
  Component,
  ElementRef,
  OnInit,
  contentChild,
  input,
  output,
  signal,
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { HintComponent } from '../hint/hint.component';

@Component({
  selector: 'mh-accordion',
  standalone: true,
  imports: [ButtonComponent, HintComponent],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {
  headerContent = contentChild<ElementRef<HTMLElement> | undefined>(
    'headerContent'
  );
  header = input.required<string>();
  buttonTitle = input<string>('');
  hints = input<string[]>([]);
  default = input<'open' | 'close'>('open');
  handleButtonClick = output<void>();
  isOpen = signal(false);

  ngOnInit() {
    if (this.default() === 'open') {
      this.isOpen.set(true);
    } else {
      this.isOpen.set(false);
    }
  }

  toggle() {
    this.isOpen.set(!this.isOpen());
  }

  slotClick(ev: Event) {
    ev.stopPropagation();
  }

  click(ev: Event) {
    ev.stopPropagation();
  }

  clickButton(ev: Event) {
    ev.stopPropagation();
    this.handleButtonClick.emit();
  }
}
