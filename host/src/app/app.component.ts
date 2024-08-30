import { Component } from "@angular/core";
import { MfGridComponent } from "./mf-grid.component";

@Component({
  selector: "app-root",
  standalone: true,
  template: `<h1>Host application</h1>
    <app-mf-grid />`,
  imports: [MfGridComponent],
})
export class AppComponent {}
