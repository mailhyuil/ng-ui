import { NgClass } from "@angular/common";
import {
  booleanAttribute,
  Component,
  HostBinding,
  input,
  OnInit,
} from "@angular/core";
import { Color } from "../../types/color.type";

export type ButtonStyle = "solid" | "text";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
  standalone: true,
  imports: [NgClass],
})
export class ButtonComponent implements OnInit {
  expand = input(false, { transform: booleanAttribute });
  color = input<Color>("primary");
  disabled = input(false);
  type = input<string>("button");
  variant = input<ButtonStyle>("solid");
  solidColorMap: Record<Color, string> = {
    primary: "bg-primary-500 text-white hover:opacity-70",
    secondary: "bg-secondary-500 text-white hover:opacity-70",
    tertiary: "bg-tertiary-500 text-white hover:opacity-70",
    danger: "bg-danger-500 text-white hover:opacity-70",
    neutral: "bg-neutral-500 text-white hover:opacity-70",
    success: "bg-success-500 text-white hover:opacity-70",
    warning: "bg-warning-500 text-white hover:opacity-70",
    info: "bg-info-500 text-white hover:opacity-70",
    medium: "bg-medium-500 text-white hover:opacity-70",
  };
  textColorMap: Record<Color, string> = {
    primary: "text-primary-500 hover:bg-primary-50",
    secondary: "text-secondary-500 hover:bg-secondary-50",
    tertiary: "text-tertiary-500 hover:bg-tertiary-50",
    danger: "text-danger-500 hover:bg-danger-50",
    neutral: "text-neutral-500 hover:bg-neutral-50",
    success: "text-success-500 hover:bg-success-50",
    warning: "text-warning-500 hover:bg-warning-50",
    info: "text-info-500 hover:bg-info-50",
    medium: "text-medium-500 hover:bg-medium-50",
  };

  @HostBinding("class") class = "";

  ngOnInit(): void {
    const inputValues = [];
    if (this.expand()) {
      inputValues.push("w-full");
    } else {
      inputValues.push("max-w-max");
    }
    this.class = inputValues.join(" ");
  }
}
