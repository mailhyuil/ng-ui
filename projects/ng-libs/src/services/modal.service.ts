import { ComponentType } from "@angular/cdk/portal";
import { inject, Injectable, OnDestroy } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ModalComponent } from "../components/modal/modal.component";

@Injectable({
  providedIn: "root",
})
export class ModalService implements OnDestroy {
  private readonly dialog = inject(MatDialog);
  private readonly modals: MatDialogRef<unknown, any>[] = [];

  ngOnDestroy(): void {
    this.modals.forEach((modal) => modal.close());
  }

  dismiss() {
    const dialogRef = this.modals.pop();
    dialogRef?.close();
  }

  create({
    component,
    componentProps,
    panelClass,
  }: {
    component: ComponentType<unknown>;
    componentProps: any;
    panelClass?: string[];
  }) {
    const id = `modal-${Math.random().toString(36).substring(7)}`;

    const dialogRef = this.dialog.open(component, {
      data: componentProps,
      id,
      panelClass,
    });

    this.modals.push(dialogRef);

    Object.entries(componentProps).forEach(([key, value]) => {
      if (!dialogRef) return;
      dialogRef.componentRef?.setInput(key, value);
    });
  }

  createCommonModal({
    title,
    content,
    format,
    submit,
  }: {
    title: string;
    content: string;
    submit: () => void;
    format?: "html" | "text";
  }) {
    this.create({
      component: ModalComponent,
      componentProps: {
        title,
        content,
        format,
        submit,
      },
    });
  }
}
