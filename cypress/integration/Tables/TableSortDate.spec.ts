export {};

describe("Tables/Table Date Sorting", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table Date Sorting");
        cy.waitForQueryCount(3);
    });

    it("ww0", () => {

        const widgetId = "ww0";

        // Sorted Month ASC
        cy.sortTable(widgetId, 0);
        cy.assertTableColumnsEqual(widgetId, "ww1", 6, 2);

        // Sorted Month DESC
        cy.sortTable(widgetId, 0);
        cy.assertTableColumnsEqual(widgetId, "ww2", 6, 2);
    })

});
