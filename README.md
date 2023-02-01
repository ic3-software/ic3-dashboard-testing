## ic3 Dashboard Testing

Contains dashboard-related tests for the icCube reporting application.

Cypress tests are in the folder _cypress/integration_

The [commmand.ts](cypress/support/commands.ts) file contains cypress functions and extensions that can be reused.

#### How to run on the Cypress test

1. Run `npm install` to install all required packages.
2. Add `./cypress.env.json` and set the cypress `baseUrl`, `ic3_user` and the `ic3_password` in the root. These are your
   login credentials.
3. Run `npm run cypress:open`.

_
