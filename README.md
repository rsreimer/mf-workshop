# Getting started

1. Pick a unique name for your micro frontend using only letters a-z.
2. Set the name in the name field in `mf-angular/package.json` or `mf-react/package.json`.
3. Use the name for the element in `mf-angular/bootstrap.ts` or `mf-react/bootstrap.tsx`. It should be `mf-<name>`.
4. Repeat for both mf-react and mf-angular.

# Running locally
In the host: `npm start`
In the mf: `npm start`

To use your local version add an override in `micro-frontend.service.ts` in host.

# Deploying
in your mf:
`npm run build`
`npm run deploy`
