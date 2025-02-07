import { Component, computed, input } from "@angular/core";
import { Color } from "../../types/color.type";

@Component({
  selector: "app-badge",
  templateUrl: "./badge.component.html",
  styleUrls: ["./badge.component.scss"],
  standalone: true,
  imports: [],
})
export class BadgeComponent {
  color = input<Color>("primary");
  computedStyle = computed(() => {
    const color = this.color();
    return `bg-${color}-600 text-white`;
  });
}
