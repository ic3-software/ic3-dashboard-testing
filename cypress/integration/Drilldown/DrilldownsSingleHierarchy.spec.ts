export {};

function assertLeftHeader(widgetId: string, labels: string[]) {

    labels.forEach((label, index) => {
        cy.assertPivotTableLeftHeader(widgetId, index, 0, label);
        cy.assertPivotTableCell(widgetId, index, 0, label) /* G: measure w/ label as well */;
    })
}

describe("Drilldown/Drilldowns Single Hierarchy", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Drilldown/Drilldowns SingleHierarchy");
        cy.waitForQueryCount(1);
    });

    it("ww1: Standard/Children Drilldown", () => {

        let queryCount = 1;

        const widgetId = "ww1";

        cy.assertPivotTableRowCount(widgetId, 3);
        assertLeftHeader(widgetId, ["Africa", "Asia", "Europe"]);

        cy.log("drilldown: Europe");
        cy.drilldownPivotTableLeftHeader(widgetId, 2, 0 /* Europe */);
        cy.waitForQueryCount(++queryCount);
        cy.assertPivotTableRowCount(widgetId, 13);

        assertLeftHeader(widgetId, [
            "Africa", "Asia", "Europe",
            "Belgium", "France", "Germany", "Italy", "Netherlands", "Poland", "Russia", "Spain", "Switzerland", "United Kingdom"
        ]);

        cy.drilldownPivotTableLeftHeader(widgetId, 2, 0 /* Europe: +++ collapse +++ */);
        cy.waitForQueryCount(queryCount);

        cy.log("drilldown: Africa");
        cy.drilldownPivotTableLeftHeader(widgetId, 0, 0 /* Africa: +++ before Europe +++ */);
        cy.waitForQueryCount(++queryCount);
        cy.assertPivotTableRowCount(widgetId, 5);

        assertLeftHeader(widgetId, [
            "Africa",
            "Egypt", "South Africa",
            "Asia", "Europe",
        ]);
    })

});
