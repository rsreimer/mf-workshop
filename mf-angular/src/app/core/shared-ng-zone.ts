import { NgZone } from "@angular/core";

declare global {
  interface Window {
    __MF_SHARED_ZONE__?: NgZone;
  }
}

export function provideSharedNgZone() {
  return {
    provide: NgZone,
    useValue:
      window.__MF_SHARED_ZONE__ ?? new NgZone({ enableLongStackTrace: true }),
  };
}
