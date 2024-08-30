import { Component } from "@angular/core";
import { ChatComponent } from "./chat.component";
import { ColorSwitcherComponent } from "./color-switcher.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [ChatComponent, ColorSwitcherComponent],
  template: `
    <h2>Angular Micro Frontend</h2>
    <app-chat />
    <app-color-switcher />
  `,
})
export class AppComponent {}
