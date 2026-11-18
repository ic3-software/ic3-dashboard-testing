export {};

describe("Tables/Pivot Table Column Height Drilldown", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Pivot Table Column Height Drilldown");
        cy.waitForQueryCount(2);
    });

    it("ww1: top header text is fully visible by default", () => {

        const widgetId = "ww1";

        cy.assertPivotTableTopHeader(widgetId, 0, 0, "All Products");
        cy.assertPivotTableTopHeader(widgetId, 0, 1, "License");
        cy.assertPivotTableTopHeader(widgetId, 0, 2, "Support");

        [-1, 0, 1, 2].forEach(col => cy.assertPivotTableTopHeaderFullyVisible(widgetId, 0, col));

    });

    it("ww0: last line of long top header text is fully visible", () => {

        const widgetId = "ww0";

        cy.assertPivotTableTopHeader(widgetId, 0, 3, " Alexandria1 toto Alexandria2 Alexandria3333333333 Alexandria4 Alexandria5 Alexandria66666666666666666 Alexandria7");
        cy.assertPivotTableTopHeader(widgetId, 0, 9, "Brussels toto Brussels Brussels hello");

        [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(col => cy.assertPivotTableTopHeaderFullyVisible(widgetId, 0, col));

    });

    it("ww0: top header text is fully visible after collapsing Africa", () => {

        const widgetId = "ww0";

        cy.assertPivotTableTopHeader(widgetId, 0, 1, "Africa");

        cy.drilldownPivotTableTopHeader(widgetId, 0, 1 /* Africa */);

        // Egypt and Alexandria... are collapsed
        cy.assertPivotTableTopHeader(widgetId, 0, 2, "Asia");
        cy.assertPivotTableTopHeader(widgetId, 0, 3, "Indonesia");
        cy.assertPivotTableTopHeader(widgetId, 0, 4, "Jakarta");
        cy.assertPivotTableTopHeader(widgetId, 0, 7, "Brussels toto Brussels Brussels hello");

        [-1, 0, 1, 2, 3, 4, 5, 6, 7].forEach(col => cy.assertPivotTableTopHeaderFullyVisible(widgetId, 0, col));

    });

});
