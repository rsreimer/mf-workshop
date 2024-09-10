declare global {
  interface Window {
    __MF_API_REGISTER__: ApiRegister;
  }
}

export interface ApiRegister {
  register(key: string, api: Function): void;
  acquire(key: string): Function | undefined;
}

export const API_REGISTER = window.__MF_API_REGISTER__ ?? {
  register: () => {},
  acquire: () => undefined,
};
