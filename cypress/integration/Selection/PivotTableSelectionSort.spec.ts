export {};

describe("Selection/PivotTableSelectionSort", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Selection/Pivot Table Selection Sort");
        cy.waitForQueryCount(1);
    });

    it("selection & sorting", () => {

        {
            // Row Selection
            const widgetId = "ww0";
            const eventWidgetId = "ww3";

            cy.assertEventValue(eventWidgetId, null);

            cy.selectPivotTableTopHeader(widgetId, 0, 0);  // Click amount to sort

            cy.assertEventValue(eventWidgetId, null);  // Should not trigger selection

        }
    })

});
