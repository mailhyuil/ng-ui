import { Component, output } from "@angular/core";

@Component({
  selector: "app-modal-header",
  templateUrl: "./modal-header.component.html",
  styleUrls: ["./modal-header.component.scss"],
  standalone: true,
  imports: [],
})
export class ModalHeaderComponent {
  dismiss = output();
}
