export {};

describe("Drilldown/Drilldowns PivotTables", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Drilldown/Drilldowns PivotTables");
        cy.waitForQueryCount(3);
    });

    it("ww1: Standard/Children Drilldown", () => {

        let queryCount = 3;

        const widgetId = "ww1";
        const eventWidgetId = "ww5";

        cy.assertPivotTableLeftHeader(widgetId, 0, 0, "2018");
        cy.assertPivotTableLeftHeader(widgetId, 1, 0, "2019");

        // drilldown 2018
        cy.log("drilldown: 2018")
        cy.drilldownPivotTableLeftHeader(widgetId, 0, 0 /* 2018 */);
        cy.waitForQueryCount(++queryCount);
        cy.assertPivotTableLeftHeader(widgetId, 0, 0, "2018");
        cy.assertPivotTableLeftHeader(widgetId, 1, 0, "2018 Q1");

        // drilldown 2018 Q1
        cy.log("drilldown: 2018 Q1")
        cy.drilldownPivotTableLeftHeader(widgetId, 1, 0 /* 2018 Q1 */);
        cy.waitForQueryCount(++queryCount);
        cy.assertPivotTableLeftHeader(widgetId, 0, 0, "2018");
        cy.assertPivotTableLeftHeader(widgetId, 1, 0, "2018 Q1");
        cy.assertPivotTableLeftHeader(widgetId, 2, 0, "2018 Jan");

        // collapse 2018
        cy.log("collapse: 2018")
        cy.drilldownPivotTableLeftHeader(widgetId, 0, 0 /* 2018 */);
        cy.waitForQueryCount(queryCount);
        cy.assertPivotTableLeftHeader(widgetId, 0, 0, "2018");
        cy.assertPivotTableLeftHeader(widgetId, 1, 0, "2019");

        // expand 2018
        cy.log("expand: 2018")
        cy.drilldownPivotTableLeftHeader(widgetId, 0, 0 /* 2018 */);
        cy.waitForQueryCount(queryCount);
        cy.assertPivotTableLeftHeader(widgetId, 0, 0, "2018");
        cy.assertPivotTableLeftHeader(widgetId, 1, 0, "2018 Q1");
        cy.assertPivotTableLeftHeader(widgetId, 2, 0, "2018 Jan");
    })

    it("ww4: User Defined Drilldown", () => {

        let queryCount = 3;

        const widgetId = "ww4";
        const eventWidgetId = "ww11";

        cy.assertPivotTableLeftHeader(widgetId, 0, 0, "2018");
        cy.assertPivotTableLeftHeader(widgetId, 1, 0, "2019");

        // drilldown 2018
        cy.log("drilldown: 2018")
        cy.drilldownPivotTableLeftHeader(widgetId, 0, 0 /* 2018 */);
        cy.waitForQueryCount(++queryCount);
        cy.assertPivotTableLeftHeader(widgetId, 0, 0, "2018");
        cy.assertPivotTableLeftHeader(widgetId, 1, 0, "Server");

        // drilldown Server
        cy.log("drilldown: Server")
        cy.drilldownPivotTableLeftHeader(widgetId, 1, 0 /* Server */);
        cy.waitForQueryCount(++queryCount);
        cy.assertPivotTableLeftHeader(widgetId, 0, 0, "2018");
        cy.assertPivotTableLeftHeader(widgetId, 1, 0, "Server");
        cy.assertPivotTableLeftHeader(widgetId, 2, 0, "Europe");

        // ensure all filterby are fine
        cy.assertPivotTableCell(widgetId, 2, 0, "€251,000");

        // collapse 2018
        cy.log("collapse: 2018")
        cy.drilldownPivotTableLeftHeader(widgetId, 0, 0 /* 2018 */);
        cy.waitForQueryCount(queryCount);
        cy.assertPivotTableLeftHeader(widgetId, 0, 0, "2018");
        cy.assertPivotTableLeftHeader(widgetId, 1, 0, "2019");

        // expand 2018
        cy.log("expand: 2018")
        cy.drilldownPivotTableLeftHeader(widgetId, 0, 0 /* 2018 */);
        cy.waitForQueryCount(queryCount);
        cy.assertPivotTableLeftHeader(widgetId, 0, 0, "2018");
        cy.assertPivotTableLeftHeader(widgetId, 1, 0, "Server");
        cy.assertPivotTableLeftHeader(widgetId, 2, 0, "Europe");
    })

    it("ww7: User Select Drilldown", () => {

        let queryCount = 3;

        const widgetId = "ww7";
        const eventWidgetId = "ww14";

        cy.assertPivotTableLeftHeader(widgetId, 0, 0, "2018");
        cy.assertPivotTableLeftHeader(widgetId, 1, 0, "2019");

        cy.log("drilldown: 2018")
        cy.drilldownPivotTableLeftHeader(widgetId, 0, 0);
        cy.clickDrilldownMenu(widgetId, [1, 3, 2] /* Article / Article / Members */);
        cy.waitForQueryCount(++queryCount);
        cy.assertPivotTableLeftHeader(widgetId, 0, 0, "2018");
        cy.assertPivotTableLeftHeader(widgetId, 1, 0, "Personal");

        cy.log("back")
        cy.clickDrilldownBack(widgetId);
        cy.waitForQueryCount(++queryCount);
        cy.assertPivotTableLeftHeader(widgetId, 0, 0, "2018");
        cy.assertPivotTableLeftHeader(widgetId, 1, 0, "2019");

        cy.log("drilldown: 2018")
        cy.drilldownPivotTableLeftHeader(widgetId, 0, 0);
        cy.clickDrilldownMenu(widgetId, ["Geography", "Continent", "Members"]);
        cy.waitForQueryCount(++queryCount);
        cy.assertPivotTableLeftHeader(widgetId, 0, 0, "2018");
        cy.assertPivotTableLeftHeader(widgetId, 1, 0, "Africa");
    })

});
