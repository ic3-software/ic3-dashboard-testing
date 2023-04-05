export {};

describe("Selection/PivotTableSelection", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Selection/Pivot Table Selection I - 2");
        cy.waitForQueryCount(3);
    });

    it("Selection per continent", () => {

        const widgetId = "ww0";
        const eventWidgetId = "ww1";

        cy.selectPivotTableLeftHeader(widgetId, 5, 0);
        cy.assertEventValue(eventWidgetId, "Europe");
        cy.assertPivotTableNoCellSelected(widgetId);  // Only left header selected

        // unselect
        cy.selectPivotTableCell(widgetId, 5, 3);  // Col should not matter here.
        cy.assertEventValue(eventWidgetId, "");
        cy.assertPivotTableNoCellSelected(widgetId);

    });

    it("Year selection", () => {

        // Column Selection
        const widgetId = "ww2";
        const eventWidgetId = "ww3";

        cy.selectPivotTableTopHeader(widgetId, 0, 1);
        cy.assertEventValue(eventWidgetId, "2022");

        // unselect
        cy.selectPivotTableCell(widgetId, 3, 1);
        cy.assertEventValue(eventWidgetId, "");
        cy.assertPivotTableNoCellSelected(widgetId);

    });

    it("Measure & Type", () => {
        // Cell Selection
        const widgetId = "ww4";
        const eventWidgetId = "ww5";

        cy.selectPivotTableCell(widgetId, 1, 1);
        cy.assertEventValue(eventWidgetId, "(% World, Business)");

        cy.selectPivotTableCell(widgetId, 2, 2);
        cy.assertEventValue(eventWidgetId, "(Value, Consumer)");

        cy.selectPivotTableCell(widgetId, 2, 2);
        cy.assertEventValue(eventWidgetId, "");
        cy.assertPivotTableNoCellSelected(widgetId);

    });

});
