// Still in developemnt.
describe("ContainerScaling/basic-application", () => {

    it("unloading schema - basic", () => {

        /**
         * Setup here is to first load everything normally, then set the container scaling options. After that the
         * test can begin.
         */

        // Unload schema
        cy.loadSchema("[Cypress] Container Scaling");

        // Login
        cy.login();

        // Open report
        cy.openAppTestReport("schema_not_auth", false, false);
        cy.waitForQueryCount(2);

        // Now unload to trigger the error
        cy.unloadSchema("[Cypress] Container Scaling");

        // Enable scaling
        cy.window().its('cypressReporting')
            .then((reporting: any) => {

                reporting['context']['options']['containerScaleUp'] = {
                    retryCountMax: 1,
                    retryDelayMS: 500
                };

                reporting.openReportApp({
                    path: 'shared:/Cypress - schema_not_auth',
                });

                // Assert large loading screen
                cy.get("body").find(".ic3-scale-up-overlay").should("exist");

                // Now load the schema → dashboard should open.
                cy.loadSchema("[Cypress] Container Scaling");
                cy.waitForQueryCount(4);

            });

    });

    it("unloading schema - error screen after the retries", () => {

        /**
         * Setup here is to first load everything normally, then set the container scaling options. After that the
         * test can begin.
         */

        // Unload schema
        cy.loadSchema("[Cypress] Container Scaling");

        // Login
        cy.login();

        // Open report
        cy.openAppTestReport("schema_not_auth", false, false);
        cy.waitForQueryCount(2);

        // Now unload to trigger the error
        cy.unloadSchema("[Cypress] Container Scaling");

        // Enable scaling
        cy.window().its('cypressReporting')
            .then((reporting: any) => {

                reporting['context']['options']['containerScaleUp'] = {
                    retryCountMax: 1,
                    retryDelayMS: 100
                };

                reporting.openReportApp({
                    path: 'shared:/Cypress - schema_not_auth',
                });

                // Assert large loading screen
                cy.get("body").find(".ic3-scale-up-overlay").should("exist");

                // Expect error screen
                cy.get('[data-cy-type="data-cy-schema-not-authorized"]')
                    .should('have.length', 1)
                ;

            });

    });

});
