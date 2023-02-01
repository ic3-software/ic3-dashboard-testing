describe("Gadgets/MissingGadgetTemplate", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Gadgets/Missing Gadget Template", true, false);
        cy.waitForQueryCount(0);
    });

    it("ww0: error msg", () => {

        /*
        have a report with a missing gadget (open json report and insert a gadget template that does not exist).
        Shows the correct message.
         */

        cy.getWidget('wg0-0').find(".ic3WidgetBoxContentMessage-content").contains(
            "The gadget is not available: (shared:/Cypress/MISSING GADGET TEST SDG3432DS)."
        );
        cy.getWidget('wg0-1').find(".ic3WidgetBoxContentMessage-content").contains(
            "The gadget is not available: (shared:/Cypress/MISSING GADGET TEST SDG3432DS)."
        );
        cy.getWidget('wg1-0').find(".ic3WidgetBoxContentMessage-content").contains(
            "The gadget is not available: (shared:/Cypress/MISSING GADGET TEST FLJLQ435AS)."
        );
        cy.getWidget('wg1-1').find(".ic3WidgetBoxContentMessage-content").contains(
            "The gadget is not available: (shared:/Cypress/MISSING GADGET TEST FLJLQ435AS)."
        );

    });

});
