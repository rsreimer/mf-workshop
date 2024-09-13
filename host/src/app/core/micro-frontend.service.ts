import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { lastValueFrom, map } from "rxjs";
import {
  bootstrapMicroFrontend,
  MicroFrontend,
} from "./bootstrap-micro-frontend";

const ORIGIN = "https://where-ever-the-backend-is-hosted.com";

const OVERRIDES: MicroFrontend[] = [
  //{ name: "angular", url: "http://localhost:3001" },
  //{ name: "react", url: "http://localhost:3002" },
];

@Injectable({ providedIn: "root" })
export class MicroFrontendService {
  #http = inject(HttpClient);
  #microFrontendsPromise: Promise<MicroFrontend[]> | null = null;

  async bootstrap(name: string) {
    const microFrontends = await this.getMicroFrontends();
    const microFrontend = microFrontends.find((mf) => mf.name === name)!;

    bootstrapMicroFrontend(microFrontend);
  }

  getMicroFrontends(): Promise<MicroFrontend[]> {
    if (!this.#microFrontendsPromise) {
      const microFrontends$ = this.#http
        .get<MicroFrontend[]>(`${ORIGIN}/micro-frontend`)
        .pipe(
          map((microFrontends) => {
            return [
              ...microFrontends.filter(
                (mf) => !OVERRIDES.some((o) => o.name === mf.name),
              ),
              ...OVERRIDES,
            ];
          }),
        );

      this.#microFrontendsPromise = lastValueFrom(microFrontends$);
    }

    return this.#microFrontendsPromise;
  }
}
