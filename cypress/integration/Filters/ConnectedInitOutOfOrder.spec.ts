export {};

describe("Filters/Connected Init OutOfOrder", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Connected Init OutOfOrder", true, false);
        cy.waitForQueryCount(2);
    });

    it("ww15: Connected Checkboxes", () => {

        /*
        Test if two widgets that have the selection connected work if one of them is waiting for the query.
        In this test, ww15 is waiting for ww16 to trigger the 'no empty behaviour' that selects Africa.
         */

        const widgetId_top = "ww15";
        const widgetId_bottom = "ww16";

        cy.getWidget(widgetId_top, "data-cy-waiting")
        cy.assertButtonSelected(widgetId_bottom, "Africa")

        cy.selectButton("ww0", "2021")

        cy.assertButtonSelected(widgetId_top, "Africa")
        cy.assertButtonSelected(widgetId_bottom, "Africa")
    });

});
