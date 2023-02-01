export {};

describe("Drilldown/Drilldowns PivotTables NON EMPTY", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Drilldown/Drilldowns PivotTables NON EMPTY");
        cy.waitForQueryCount(2);
    });

    it("ww1: OK", () => {

        let queryCount = 2;

        const widgetId = "ww1";

        cy.assertPivotTableTopHeader(widgetId, 0, 0, "Business");
        cy.assertPivotTableTopHeader(widgetId, 0, 1, "Consumer");

        cy.drilldownPivotTableTopHeader(widgetId, 0, 0 /* Business */);
        cy.waitForQueryCount(++queryCount);

        cy.assertPivotTableTopHeader(widgetId, 0, 0, "Business");
        cy.assertPivotTableTopHeader(widgetId, 0, 1, "Thistle Corp.");

    })

    it("ww0: KO", () => {

        let queryCount = 2;

        const widgetId = "ww0";

        cy.assertPivotTableTopHeader(widgetId, 0, 0, "Business");
        cy.assertPivotTableTopHeader(widgetId, 0, 1, "Consumer");

        cy.drilldownPivotTableTopHeader(widgetId, 0, 0 /* Business */);
        cy.waitForQueryCount(++queryCount);

        cy.assertPivotTableTopHeader(widgetId, 0, 0, "Business");
        cy.assertPivotTableTopHeader(widgetId, 0, 1, "Thistle Corp.");

    })

});
