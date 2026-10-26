export {};

describe("Drilldown/Drilldowns PivotTables NON EMPTY", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Drilldown/Drilldowns PivotTables NON EMPTY");
        cy.waitForQueryCount(3);
    });

    it("ww1: OK", () => {

        let queryCount = 3;

        const widgetId = "ww1";

        cy.assertPivotTableTopHeader(widgetId, 0, 0, "Business");
        cy.assertPivotTableTopHeader(widgetId, 0, 1, "Consumer");

        cy.drilldownPivotTableTopHeader(widgetId, 0, 0 /* Business */);
        cy.waitForQueryCount(++queryCount);

        cy.assertPivotTableTopHeader(widgetId, 0, 0, "Business");
        cy.assertPivotTableTopHeader(widgetId, 0, 1, "Thistle Corp.");

    })

    it("ww0: KO", () => {

        let queryCount = 3;

        const widgetId = "ww0";

        cy.assertPivotTableTopHeader(widgetId, 0, 0, "Business");
        cy.assertPivotTableTopHeader(widgetId, 0, 1, "Consumer");

        cy.drilldownPivotTableTopHeader(widgetId, 0, 0 /* Business */);
        cy.waitForQueryCount(++queryCount);

        cy.assertPivotTableTopHeader(widgetId, 0, 0, "Business");
        cy.assertPivotTableTopHeader(widgetId, 0, 1, "Thistle Corp.");

    })

    // M-25 : a failed pivot drilldown merge must keep the current result (not wipe it).
    // Report change needed : add ww2 Pivot Table, Drilldown MDX Expression "{$member.children.item(1)}", MDX
    // SELECT {[Time].[Time].[Year].&[2021-01-01]} ON 0, NON EMPTY [Geography].[Geography].[Continent].members ON 1 FROM [Sales] WHERE [Measures].[#Sales]
    // (2021 Q2 has no Oceania row => the column merge fails) (and beforeEach waitForQueryCount(2) => 3).
    it("ww2: failed column merge keeps the current result", () => {

        const widgetId = "ww2";

        cy.assertPivotTableRowCount(widgetId, 1);
        cy.assertPivotTableColCount(widgetId, 7);
        cy.assertPivotTableTopHeader(widgetId, 0, 0, "Africa");

        cy.drilldownPivotTableLeftHeader(widgetId, 0, 0 /* 2021 */);
        cy.waitForQueryCount(4);

        cy.assertPivotTableRowCount(widgetId, 2);
        cy.assertPivotTableColCount(widgetId, 7);
        cy.assertPivotTableTopHeader(widgetId, 0, 0, "Africa");
        cy.assertPivotTableTopHeader(widgetId, 0, 5, "South America");

    });

});
