import { Component, inject, input } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ModalContentComponent } from '../modal-content/modal-content.component';
import { ModalFooterComponent } from '../modal-footer/modal-footer.component';
import { ModalHeaderComponent } from '../modal-header/modal-header.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
@Component({
  selector: 'mh-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [ModalHeaderComponent, ModalFooterComponent, ModalContentComponent],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 2500 },
    },
  ],
})
export class ModalComponent {
  modalService = inject(ModalService);
  submit = input<(() => void) | undefined>(undefined);
  title = input('');
  content = input('');
  format = input<'html' | 'text'>('html');
  dismiss() {
    this.modalService.dismiss();
  }
  _submit() {
    const submit = this.submit();
    if (submit) {
      submit();
      this.modalService.dismiss();
    }
  }
}
