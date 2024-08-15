export {};

describe("Tables/Table Sort Tree", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table Sort Tree");
        cy.waitForQueryCount(4);
    });

    it("ww1", () => {

        const widgetId = "ww1";

        // Sorted /Amount ASC
        cy.sortTable(widgetId, 1);
        cy.assertTableColumnsEqual(widgetId, "ww0", 9, 2);

        // Sorted /Amount DESC
        cy.sortTable(widgetId, 1);
        cy.assertTableColumnsEqual(widgetId, "ww3", 9, 2);

        // Sorted /Amount NOT SORTED
        cy.sortTable(widgetId, 1);
        cy.assertTableColumnsEqual(widgetId, "ww2", 9, 2);
    });

    it("ww1 - with one node collapsed", () => {

        const widgetId = "ww1";

        // Collapse support node in all tables
        cy.clickTableCell(widgetId, 5, 0);
        cy.clickTableCell("ww0", 2, 0);
        cy.clickTableCell("ww3", 5, 0);
        cy.clickTableCell("ww2", 5, 0);

        // Sorted /Amount ASC
        cy.sortTable(widgetId, 1);
        cy.assertTableColumnsEqual(widgetId, "ww0", 6, 2);

        // Sorted /Amount DESC
        cy.sortTable(widgetId, 1);
        cy.assertTableColumnsEqual(widgetId, "ww3", 6, 2);

        // Sorted /Amount NOT SORTED
        cy.sortTable(widgetId, 1);
        cy.assertTableColumnsEqual(widgetId, "ww2", 6, 2);
    });

});
