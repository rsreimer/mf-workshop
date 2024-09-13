import { MicroFrontend } from "./app/core/bootstrap-micro-frontend";

/*
 * List of micro frontends to override the ones fetched from the backend
 *
 * @example ```{ name: "<name from package.json>", url: "http://localhost:3001" },```
 */
export const OVERRIDES: MicroFrontend[] = [
  //{ name: "angular", url: "http://localhost:3001" },
  //{ name: "react", url: "http://localhost:3002" },
];
