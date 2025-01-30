
describe("Filters/Autocomplete empty not allowed", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Autocomplete empty not allowed", true, false);
        cy.waitForQueryCount(2);
    });

    it("ww0: Simple", () => {
        const widgetId = "ww0";
        cy.assertDropdownSingleSelection(widgetId, "Business");
        cy.getWidget(widgetId)
            .find("input")
            .clear();
        cy.assertDropdownSingleSelection(widgetId, null);
    });

    it("ww1: Lazy", () => {
        const widgetId = "ww1";
        cy.assertDropdownSingleSelection(widgetId, "Business");
        cy.getWidget(widgetId)
            .find("input")
            .clear();
        cy.assertDropdownSingleSelection(widgetId, null);
    });

});
