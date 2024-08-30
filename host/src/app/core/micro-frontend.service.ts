import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import {
  bootstrapMicroFrontend,
  MicroFrontend,
} from "./bootstrap-micro-frontend";

const OVERRIDES: MicroFrontend[] = [
  //{ name: "react", url: "http://localhost:3002" },
];

const ORIGIN = "http://164.92.164.40";

@Injectable({ providedIn: "root" })
export class MicroFrontendService {
  #http = inject(HttpClient);
  #microFrontendsPromise: Promise<MicroFrontend[]> | null = null;

  async bootstrap(name: string) {
    const microFrontends = await this.getMicroFrontends();

    const override = OVERRIDES.find((mf) => mf.name === name);
    const microFrontend = microFrontends.find((mf) => mf.name === name)!;

    bootstrapMicroFrontend(override ?? microFrontend);
  }

  getMicroFrontends(): Promise<MicroFrontend[]> {
    if (!this.#microFrontendsPromise) {
      this.#microFrontendsPromise = lastValueFrom(
        this.#http.get<MicroFrontend[]>(`${ORIGIN}/micro-frontend`),
      );
    }

    return this.#microFrontendsPromise;
  }
}
