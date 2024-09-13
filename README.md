# Micro Frontend workshop

## Getting started

1. Pick a unique name for your micro frontend using only letters a-z.
2. Set the name in the name field in `mf-angular/package.json` or `mf-react/package.json`.
3. Use the name for the element in `mf-angular/bootstrap.ts` or `mf-react/bootstrap.tsx`. It should be `mf-<name>`.
4. Repeat for both mf-react and mf-angular.


## Running locally
### Micro frontend 

cd to `mf-react` or `mf-angular`;

`npm start`


`mf-angular` is served at http://localhost:3001

`mf-react` is served at http://localhost:3002

### Host

To load the locally served micro frontend, add an override in `host/src/app/core/micro-frontend.service.ts`.

Afterwards;

`npm start`

Access the host at http://localhost:3000


## Deploying a micro frontend

`npm run deploy`
