export {};

function drilldownPivotTableLeftHeaderByCaption(widgetId: string, caption: string) {

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content .ic3-pt-left-header div[data-vc='0']")
        .filter(`:contains('${caption}')`)
        .first()
        .find("svg")
        .click()
    ;

}

function assertBreadcrumb(widgetId: string, captions: string[]) {

    // +1 : "All"
    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-headerDrilldown [data-ic3-drilldown]")
        .should("have.length", captions.length + 1)
    ;

    captions.forEach((caption, idx) => {
        cy.getWidget(widgetId)
            .find(`.ic3WidgetBox-headerDrilldown [data-ic3-drilldown='${captions.length - idx}']`)
            .should("have.text", caption)
        ;
    });

}

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

    // M-24 : the breadcrumb "back" must go to the right level once REPLAY entries sit between drilldowns.
    it("ww0: breadcrumb back with a replay in between", () => {

        const widgetId = "ww0";

        cy.log("drilldown Europe");
        drilldownPivotTableLeftHeaderByCaption(widgetId, "Europe");
        cy.waitForQueryCount(4);
        cy.wait(250);

        cy.log("select 2020 => replay drilldown");
        cy.selectButton("ww1", "2020");
        cy.waitForQueryStatus();
        cy.wait(250);

        cy.log("drilldown Belgium");
        drilldownPivotTableLeftHeaderByCaption(widgetId, "Belgium");
        cy.waitForQueryStatus();
        cy.wait(250);

        cy.log("drilldown France");
        drilldownPivotTableLeftHeaderByCaption(widgetId, "France");
        cy.waitForQueryStatus();
        cy.wait(250);

        assertBreadcrumb(widgetId, ["Europe", "Belgium", "France"]);

        cy.log("breadcrumb: back to Belgium");
        cy.clickDrilldownLevel(widgetId, 2 /* Belgium */);
        cy.waitForQueryStatus();
        cy.wait(250);

        assertBreadcrumb(widgetId, ["Europe", "Belgium"]);

    });

});
