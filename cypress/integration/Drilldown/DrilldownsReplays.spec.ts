export {};

describe("Drilldown/Drilldowns Replays", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Drilldown/Drilldowns Replays");
        cy.waitForQueryCount(3);
    });

    it("ww0: Pivot Table", () => {

        const widgetId = "ww0"
        const expectedWidgetId = "ww2"

        cy.assertPivotTableRowCount(widgetId, 6);
        cy.assertPivotTableRowCount(expectedWidgetId, 20);

        let queryCount = 3;

        cy.log("drilldown Europe")
        cy.drilldownPivotTableLeftHeader(widgetId, 2, 0);
        cy.waitForQueryCount(++queryCount);
        cy.wait(250);

        cy.log("drilldown Belgium")
        cy.drilldownPivotTableLeftHeader(widgetId, 3, 0);
        cy.waitForQueryCount(++queryCount);
        cy.wait(250);

        cy.log("drilldown France")
        cy.drilldownPivotTableLeftHeader(widgetId, 5, 0);
        cy.waitForQueryCount(++queryCount);
        cy.wait(250);

        cy.log("select 2020 => replay drilldown")
        cy.selectButton("ww1", "2020");

        queryCount += 4;
        cy.waitForQueryCount(queryCount);
        cy.wait(250);

        cy.assertPivotTableColumnsEqual(widgetId, expectedWidgetId, 20, 2);
    })

});
