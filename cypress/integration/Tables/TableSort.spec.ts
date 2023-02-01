export {};

describe("Tables/Table Sort", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table Sort");
        cy.waitForQueryCount(11);
    });

    it("ww1", () => {

        const widgetId = "ww1";

        // Sorted /Article
        cy.sortTable(widgetId, 0);
        cy.assertTableColumnsEqual(widgetId, "ww3", 5, 2);

        // Sorted /#Sales
        cy.sortTable(widgetId, 1);
        cy.assertTableColumnsEqual(widgetId, "ww4", 5, 2);
    })

    it("ww2: 2 Axis", () => {

        const widgetId = "ww2";

        // Sorted /Article
        cy.sortTable(widgetId, 0);
        cy.assertTableColumnsEqual(widgetId, "ww5", 5, 3);

        // Sorted /Business
        cy.sortTable(widgetId, 1);
        cy.assertTableColumnsEqual(widgetId, "ww7", 5, 3);

        // Sorted /Consumer
        cy.sortTable(widgetId, 2);
        cy.assertTableColumnsEqual(widgetId, "ww8", 5, 3);
    })

    it("ww0: 3 Axis", () => {

        const widgetId = "ww0";

        // Sorted /Article
        cy.sortTable(widgetId, 0);
        cy.assertTableColumnsEqual(widgetId, "ww6", 5, 3);

        // Sorted /Business
        cy.sortTable(widgetId, 1);
        cy.assertTableColumnsEqual(widgetId, "ww9", 5, 3);

        // Sorted /Consumer
        cy.sortTable(widgetId, 2);
        cy.assertTableColumnsEqual(widgetId, "ww10", 5, 3);
    })

});
