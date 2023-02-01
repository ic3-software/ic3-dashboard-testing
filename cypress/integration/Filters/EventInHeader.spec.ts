export {};


describe("Filters/Event in header", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Event in header", true, false);
        cy.waitForQueryCount(1);
    });

    it("ww1: Correct header value when filter is empty", () => {

        const widgetId = "ww0";
        const buttonsWidgetId = "ww1";
        const tableWidget = "ww2";  // Table widget has slower query -> should show loading spinner.

        cy.assertWidgetHeader(buttonsWidgetId, "Buttons - no selection buttons");
        cy.assertWidgetHeader(tableWidget, "Table - no selection table");

        cy.selectPivotTableLeftHeader(widgetId, 0, 0);
        cy.assertWidgetQueryLoading(tableWidget);
        cy.assertWidgetHeader(buttonsWidgetId, "Buttons - Business");
        cy.assertWidgetHeader(tableWidget, "Table - Business");

        cy.selectPivotTableLeftHeader(widgetId, 0, 0);  // Unselect
        cy.assertWidgetHeader(buttonsWidgetId, "Buttons - no selection buttons");
        cy.assertWidgetHeader(tableWidget, "Table - no selection table");

        cy.selectPivotTableLeftHeader(widgetId, 1, 0);
        cy.assertWidgetQueryLoading(tableWidget);
        cy.assertWidgetHeader(buttonsWidgetId, "Buttons - Consumer");
        cy.assertWidgetHeader(tableWidget, "Table - Consumer");

        cy.selectPivotTableLeftHeader(widgetId, 1, 0);  // Unselect
        cy.assertWidgetHeader(buttonsWidgetId, "Buttons - no selection buttons");
        cy.assertWidgetHeader(tableWidget, "Table - no selection table");

    });

});
