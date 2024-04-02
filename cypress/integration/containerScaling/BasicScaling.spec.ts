
describe("ContainerScaling/basic", () => {

    beforeEach(() => {

        // Loading the schema
        cy.loadSchema("[Cypress] Container Scaling");

        // Login
        cy.login();

        // Open report
        cy.openViewerTestReport("ContainerScaling/basic");
        cy.waitForQueryCount(3);

    });

    it("unloading schema - basic", () => {

        // Enable scaling
        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                reporting['context']['options']['containerScaleUp'] = {
                    retryCountMax: 6,
                    retryDelayMS: 500
                };
            });

        // Assert data on report open
        cy.assertTableCellContent("ww0", 0, 1, "€148,250");

        // Now unload the schema
        cy.unloadSchema("[Cypress] Container Scaling");

        // Assert widget content remains there until user does something
        cy.assertTableCellContent("ww0", 0, 1, "€148,250");

        // Assert large loading screen after clicking button to filter.
        cy.selectButton("ww2", "2019");
        cy.get("body").find(".ic3-scale-up-overlay").should("exist");

        // Re-load the schema
        cy.loadSchema("[Cypress] Container Scaling");

        // Assert data comes back, filtered this time.
        cy.assertTableCellContent("ww0", 0, 1, "€30,500");

    });

    it("unloading schema - continues to error", () => {

        // Enable scaling
        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                reporting['context']['options']['containerScaleUp'] = {
                    retryCountMax: 1,
                    retryDelayMS: 500
                };
            });

        // Assert data on report open
        cy.assertTableCellContent("ww0", 0, 1, "€148,250");

        // Now unload the schema
        cy.unloadSchema("[Cypress] Container Scaling");

        // Assert large loading screen after clicking button to filter.
        cy.selectButton("ww2", "2019");
        cy.get("body").find(".ic3-scale-up-overlay").should("exist");

        // Assert we get error that schema is unloaded.
        cy.getWidget("ww0").find(".ic3WidgetBoxContentMessage-root").should("contain",
            "The widget could not be rendered because the schema [[Cypress] Container Scaling");
        cy.getWidget("ww1").find(".ic3WidgetBoxContentMessage-root").should("contain",
            "The widget could not be rendered because the schema [[Cypress] Container Scaling");

        // Assert interacting with the buttons starts retry mechanism
        cy.selectButton("ww2", "2020");
        cy.get("body").find(".ic3-scale-up-overlay").should("exist");

        // Now load the schema.
        cy.loadSchema("[Cypress] Container Scaling");

        // Interacting with the button makes the dashboard come back.
        cy.selectButton("ww2", "2019");
        cy.assertTableCellContent("ww0", 0, 1, "€30,500");

    });

});
