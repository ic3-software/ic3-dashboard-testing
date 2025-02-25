export {};

describe("Tables/Table Sort Hierarchy", () => {

    function load() {
        cy.openViewerTestReport("Tables/Table Sort Hierarchy");
        cy.waitForQueryCount(4);
    }

    beforeEach(() => {
        cy.login();
        load();
    });

    it("sort Geography DESC", () => {

        const widgetId = "ww0";
        const widgetIdSorted = "ww3";

        cy.clickUserMenu(widgetId, "clearState");
        cy.sortTable(widgetId, 1);
        cy.sortTable(widgetId, 1);  // click twice to sort desc
        cy.assertTableColumnEqual(widgetId, widgetIdSorted, 10, 1);

        // Refresh. Table coming from state remains sorted.
        load();
        cy.assertTableColumnEqual(widgetId, widgetIdSorted, 10, 1);
    });

    it("sort #customers ASC", () => {

        const widgetId = "ww0";
        const widgetIdSorted = "ww1";

        cy.clickUserMenu(widgetId, "clearState");
        cy.sortTable(widgetId, 2);
        cy.assertTableColumnEqual(widgetId, widgetIdSorted, 10, 2);

        // Refresh. Table coming from state remains sorted.
        load();
        cy.assertTableColumnEqual(widgetId, widgetIdSorted, 10, 2);
    });

    it("sort Amount DESC", () => {

        const widgetId = "ww0";
        const widgetIdSorted = "ww2";

        cy.clickUserMenu(widgetId, "clearState");
        cy.sortTable(widgetId, 4);
        cy.sortTable(widgetId, 4);  // click twice to sort desc
        cy.assertTableColumnEqual(widgetId, widgetIdSorted, 10, 4);

        // Refresh. Table coming from state remains sorted.
        load();
        cy.assertTableColumnEqual(widgetId, widgetIdSorted, 10, 4);
    });

});
