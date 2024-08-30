import { ApplicationConfig, NgZone } from "@angular/core";

export const appConfig: ApplicationConfig = {
  providers: [
    // @ts-ignore
    { provide: NgZone, useValue: window.__MF_SHARED_ZONE__ },
  ],
};
