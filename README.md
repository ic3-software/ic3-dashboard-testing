## ic3 Dashboard Testing

Contains dashboard-related tests for the icCube reporting application.

Cypress tests are in the folder _cypress/integration_

The [commmand.ts](cypress/support/commands.ts) file contains cypress functions and extensions that can be reused.

#### How to run on the Cypress test

1. Run `npm install` to install all required packages.
2. Add `./cypress.env.json` and set the cypress variables :
``` 
   {
      "baseUrl": "https://",
      "ic3_user": "",
      "ic3_password": ""
      
      // used by Sorry Cypress to run in parallel
      
      "sc_cloudServiceUrl": "http://0.0.0.0:1234",
      "sc_projectId": "",
      "sc_recordKey": ""
      
   }
```

3. Run `npm run cypress:open`.

#### How to run on the Cypress test in parallel

1) You need at least a SorryCypress Director running. You can either run one locally using dockers

   - docker run -p 1234:1234 agoldis/sorry-cypress-director (or in a dedicated server)
   - get an account from https://www.cypress.io/ or https://currents.dev/

2) Setup at least *sc_cloudServiceUrl* variable

3) Start running the test in parallel *node pRunner*

   - It's starting with 75% of the available cores
   - After the parallel runs the system we retest the failing tests (if less than 10 failing) in a single process
   - Eventually only the failing tests are shown

_
