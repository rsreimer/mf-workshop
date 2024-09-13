import { Component, ElementRef, inject, OnInit } from "@angular/core";
import { MicroFrontendService } from "./core/micro-frontend.service";

// Names of micro frontends that should not be rendered
const BLOCKED: string[] = [];

@Component({
  selector: "app-mf-grid",
  standalone: true,
  imports: [],
  template: "",
  styles: `
    :host {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      padding: 8px;
    }

    :host > ::ng-deep * {
      border: 1px solid #ddd;
    }
  `,
})
export class MfGridComponent implements OnInit {
  #service = inject(MicroFrontendService);
  #elementRef = inject(ElementRef);

  ngOnInit() {
    this.insertMicroFrontends();
  }

  async insertMicroFrontends() {
    const mfs = await this.#service.getMicroFrontends();

    mfs
      .filter((mf) => !BLOCKED.includes(mf.name))
      .reverse()
      .forEach(async ({ name }) => {
        const mfElement = document.createElement(`mf-${name}`);

        this.#elementRef.nativeElement.appendChild(mfElement);

        await this.#service.bootstrap(name);
      });
  }
}
