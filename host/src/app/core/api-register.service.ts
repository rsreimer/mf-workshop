import { Injectable } from "@angular/core";

export interface ApiRegister {
  register(key: string, api: Function): void;
  acquire(key: string): Function | undefined;
}

@Injectable({ providedIn: "root" })
export class ApiRegisterService implements ApiRegister {
  #apis: Record<string, Function> = {};

  register(key: string, fn: Function): void {
    if (this.#apis[key]) {
      console.error(`API key "${key}" already exists`);
    } else {
      this.#apis[key] = fn;
    }
  }

  acquire(key: string): Function | undefined {
    if (!this.#apis[key]) {
      console.error(`API key "${key}" does not exist`);
    }

    return this.#apis[key];
  }
}
