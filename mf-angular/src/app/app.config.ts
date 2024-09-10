import { ApplicationConfig } from "@angular/core";
import { provideSharedNgZone } from "./core/shared-ng-zone";

export const appConfig: ApplicationConfig = {
  providers: [provideSharedNgZone()],
};
