import { InjectionToken } from "@angular/core";

declare global {
  interface Window {
    __MF_API_REGISTER__?: ApiRegister;
  }
}

export interface ApiRegister {
  register(key: string, api: Function): void;
  acquire(key: string): Function | undefined;
}

export const API_REGISTER = new InjectionToken<ApiRegister>("API_REGISTER", {
  factory: () =>
    window.__MF_API_REGISTER__ ?? {
      register: () => {},
      acquire: () => undefined,
    },
});
