import { Component, inject } from "@angular/core";
import { API_REGISTER } from "./core/api-register";

@Component({
  selector: "app-color-switcher",
  standalone: true,
  imports: [],
  template: `<button (click)="randomizeColor()">Randomize color</button>`,
})
export class ColorSwitcherComponent {
  #apis = inject(API_REGISTER);

  randomizeColor() {
    const setColor = this.#apis.acquire("react-set-color");

    if (!setColor) {
      return;
    }

    setColor("#" + Math.floor(Math.random() * 16777215).toString(16) + "33");
  }
}
