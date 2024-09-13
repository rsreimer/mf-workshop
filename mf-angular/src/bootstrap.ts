import { createApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { createCustomElement } from "@angular/elements";
import { appConfig } from "./app/app.config";
import packageJson from "../package.json";

export const appRefPromise = createApplication(appConfig);

appRefPromise.then((appRef) => {
  window.customElements.define(
    `mf-${packageJson.name}`,
    createCustomElement(AppComponent, { injector: appRef.injector }),
  );
});
