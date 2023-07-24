export {};

describe("Tables/Pivot Table Sorting Multiple Hierarchies", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Pivot Table Sorting Multiple Hierarchies");
        cy.waitForQueryCount(2);
    });

    it("merged cells", () => {

        const widgetId = "ww1"

        cy.assertPivotTableRowCount(widgetId, 5 * 2);
        cy.assertPivotTableLeftHeader(widgetId, 4, 0, "2018 Jan");
        cy.assertPivotTableLeftHeader(widgetId, 4, 1, "Personal");

        cy.sortPivotTable(widgetId, -1);

        cy.assertPivotTableRowCount(widgetId, 5 * 2);
        cy.assertPivotTableLeftHeader(widgetId, 4, 0, "2018 Feb");
        cy.assertPivotTableLeftHeader(widgetId, 4, 1, "Personal");

    })

    it("2 columns in the left header", () => {

        const widgetId = "ww0"

        cy.assertPivotTableRowCount(widgetId, 5 * 2);
        cy.assertPivotTableLeftHeader(widgetId, 4, 0, "2018 Jan");
        cy.assertPivotTableLeftHeader(widgetId, 4, 1, "Personal");

        cy.sortPivotTable(widgetId, -2);
        cy.sortPivotTable(widgetId, -2);

        cy.assertPivotTableRowCount(widgetId, 5 * 2);
        cy.assertPivotTableLeftHeader(widgetId, 4, 0, "2018 Jan");
        cy.assertPivotTableLeftHeader(widgetId, 4, 1, "Server");

        cy.sortPivotTable(widgetId, -1);

        cy.assertPivotTableRowCount(widgetId, 5 * 2);
        cy.assertPivotTableLeftHeader(widgetId, 4, 0, "2018 Feb");
        cy.assertPivotTableLeftHeader(widgetId, 4, 1, "Server");


    })

});
