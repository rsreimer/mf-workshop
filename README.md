# Micro Frontend workshop

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
