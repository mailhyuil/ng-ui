import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  snackBar = inject(MatSnackBar);
  openSuccess(message: string) {
    return this.snackBar.open(message, '확인', {
      panelClass: ['snackbar-success'],
      duration: 2500,
    });
  }
  openDanger(message: string) {
    return this.snackBar.open(message, '확인', {
      panelClass: ['snackbar-danger'],
      duration: 2500,
    });
  }
  openWarning(message: string) {
    return this.snackBar.open(message, '확인', {
      panelClass: ['snackbar-warning'],
      duration: 2500,
    });
  }
  openPrimary(message: string) {
    return this.snackBar.open(message, '확인', {
      panelClass: ['snackbar-primary'],
      duration: 2500,
    });
  }
}
