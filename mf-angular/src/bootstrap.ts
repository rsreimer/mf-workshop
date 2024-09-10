import { createApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { createCustomElement } from "@angular/elements";
import { appConfig } from "./app/app.config";

export const appRefPromise = createApplication(appConfig);

appRefPromise.then((appRef) => {
  window.customElements.define(
    "mf-angular",
    createCustomElement(AppComponent, { injector: appRef.injector }),
  );
});
