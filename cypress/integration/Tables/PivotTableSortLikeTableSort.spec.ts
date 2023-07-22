export {};

describe("Tables/Pivot Table Sort (like Table Sort)", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Pivot Table Sort  (like Table Sort)");
        cy.waitForQueryCount(11);
    });

    it("ww1", () => {

        const widgetId = "ww1";

        // Cannot sort left header yet ---------------------------------------------------------------------------------
        // Sorted /Article
        cy.sortPivotTable(widgetId, -1);
        cy.assertPivotTableColumnsEqual(widgetId, "ww3", 5, 2);

        // Sorted /#Sales
        cy.sortPivotTable(widgetId, 0);
        cy.assertPivotTableColumnsEqual(widgetId, "ww4", 5, 2);
    })

    it("ww2: 2 Axis", () => {

        const widgetId = "ww2";

        // Cannot sort left header yet ---------------------------------------------------------------------------------
        // Sorted /Article
        cy.sortPivotTable(widgetId, -1);
        cy.assertPivotTableColumnsEqual(widgetId, "ww5", 5, 3);

        // Sorted /Business
        cy.sortPivotTable(widgetId, 0);
        cy.assertPivotTableColumnsEqual(widgetId, "ww7", 5, 3);

        // Sorted /Consumer
        cy.sortPivotTable(widgetId, 1);
        cy.assertPivotTableColumnsEqual(widgetId, "ww8", 5, 3);
    })

    it("ww0: 3 Axis", () => {

        const widgetId = "ww0";

        // Cannot sort left header yet ---------------------------------------------------------------------------------
        // Sorted /Article
        cy.sortPivotTable(widgetId, -1);
        cy.assertPivotTableColumnsEqual(widgetId, "ww6", 5, 3);

        // Sorted /Business
        cy.sortPivotTable(widgetId, 0);
        cy.assertPivotTableColumnsEqual(widgetId, "ww9", 5, 3);

        // Sorted /Consumer
        cy.sortPivotTable(widgetId, 1);
        cy.assertPivotTableColumnsEqual(widgetId, "ww10", 5, 3);
    })

});
