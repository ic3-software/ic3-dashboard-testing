export {};

function assertLeftHeader(widgetId: string, col: number, labels: string[]) {

    // col: 0 => year      and T cell column
    // col: 1 => continent and G cell column

    // labels.forEach((label, row) => {
    //     cy.assertPivotTableLeftHeader(widgetId, row, col, label);
    //     cy.assertPivotTableCell(widgetId, row, col, label);
    // })

    cy.assertPivotTableLeftHeader(widgetId, -1, col, labels);
    cy.assertPivotTableCell(widgetId, -1, col, labels);

}

describe("Drilldown/Drilldowns MultiHierarchy", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Drilldown/Drilldowns MultiHierarchy");
        cy.waitForQueryCount(1);
    });

    it("ww1: Standard/Children Drilldown : Year(Hidden)", () => {

        const widgetId = "ww1";

        cy.reload() /* moving the test around */;
        let queryCount = 1;

        cy.assertPivotTableRowCount(widgetId, 4);
        assertLeftHeader(widgetId, 0, ["2018", "2018", "2019", "2019"]);
        assertLeftHeader(widgetId, 1, ["Africa", "Asia", "Africa", "Asia"]);

        cy.log("drilldown: 2019");
        cy.drilldownPivotTableLeftHeader(widgetId, 1, 0 /* 2018: hidden */);
        cy.waitForQueryCount(queryCount);
        cy.assertPivotTableRowCount(widgetId, 4);
        assertLeftHeader(widgetId, 0, ["2018", "2018", "2019", "2019"]);
        assertLeftHeader(widgetId, 1, ["Africa", "Asia", "Africa", "Asia"]);


    })

    it("ww1: Standard/Children Drilldown : Year", () => {

        const widgetId = "ww1";

        cy.reload() /* moving the test around */;
        let queryCount = 1;

        cy.assertPivotTableRowCount(widgetId, 4);
        assertLeftHeader(widgetId, 0, ["2018", "2018", "2019", "2019"]);
        assertLeftHeader(widgetId, 1, ["Africa", "Asia", "Africa", "Asia"]);

        cy.log("drilldown: 2019");
        cy.drilldownPivotTableLeftHeader(widgetId, 2, 0 /* 2019 */);
        cy.waitForQueryCount(++queryCount);
        cy.assertPivotTableRowCount(widgetId, 12);

        assertLeftHeader(widgetId, 0, ["2018", "2018", "2019", "2019", "2019 Q1", "2019 Q1", "2019 Q2", "2019 Q2", "2019 Q3", "2019 Q3", "2019 Q4", "2019 Q4"]);
        assertLeftHeader(widgetId, 1, ["Africa", "Asia", "Africa", "Asia", "Africa", "Asia", "Africa", "Asia", "Africa", "Asia", "Africa", "Asia",]);

        cy.log("drilldown: 2019 Q2/Africa");
        cy.drilldownPivotTableLeftHeader(widgetId, 6, 1 /* 2019 Q2/Africa */);
        cy.waitForQueryCount(++queryCount);
        cy.assertPivotTableRowCount(widgetId, 14);

        assertLeftHeader(widgetId, 0, ["2018", "2018", "2019", "2019", "2019 Q1", "2019 Q1", "2019 Q2", "2019 Q2", "2019 Q2", "2019 Q2", "2019 Q3", "2019 Q3", "2019 Q4", "2019 Q4"]);
        assertLeftHeader(widgetId, 1, ["Africa", "Asia", "Africa", "Asia", "Africa", "Asia", "Africa", "Egypt", "South Africa", "Asia", "Africa", "Asia", "Africa", "Asia",]);

        cy.log("collapse: 2019");
        cy.drilldownPivotTableLeftHeader(widgetId, 2, 0 /* 2019 Q2/Africa */);
        cy.waitForQueryCount(queryCount);
        cy.assertPivotTableRowCount(widgetId, 4);

        assertLeftHeader(widgetId, 0, ["2018", "2018", "2019", "2019"]);
        assertLeftHeader(widgetId, 1, ["Africa", "Asia", "Africa", "Asia"]);

    })

    it("ww1: Standard/Children Drilldown : Continent", () => {

        const widgetId = "ww1";

        cy.reload() /* moving the test around */;
        let queryCount = 1;

        cy.assertPivotTableRowCount(widgetId, 4);
        assertLeftHeader(widgetId, 0, ["2018", "2018", "2019", "2019"]);
        assertLeftHeader(widgetId, 1, ["Africa", "Asia", "Africa", "Asia"]);

        cy.log("drilldown: 2018/Africa");
        cy.drilldownPivotTableLeftHeader(widgetId, 0, 1 /* 2018/Africa */);
        cy.waitForQueryCount(++queryCount);
        cy.assertPivotTableRowCount(widgetId, 6);

        assertLeftHeader(widgetId, 0, ["2018", "2018", "2018", "2018", "2019", "2019"]);
        assertLeftHeader(widgetId, 1, ["Africa", "Egypt", "South Africa", "Asia", "Africa", "Asia"]);

        cy.drilldownPivotTableLeftHeader(widgetId, 0, 1 /* 2018/Africa: +++ collapse +++ */);
        cy.waitForQueryCount(queryCount);

        cy.log("drilldown: 2019/Africa");
        cy.drilldownPivotTableLeftHeader(widgetId, 2, 1 /* 2019/Africa */);
        cy.waitForQueryCount(++queryCount);
        cy.assertPivotTableRowCount(widgetId, 6);

        assertLeftHeader(widgetId, 0, ["2018", "2018", "2019", "2019", "2019", "2019"]);
        assertLeftHeader(widgetId, 1, ["Africa", "Asia", "Africa", "Egypt", "South Africa", "Asia"]);

    })

});
