export {}


function assertChartYAxis(widgetId: string, labels: string[]) {

    cy.getWidget(widgetId).then($widget => {

        labels.forEach(label => {

            cy.wrap($widget).find(`g[aria-label='${label}']`)

        });

    })

}

function selectChartLabel(widgetId: string, child: string) {

    cy.getWidget(widgetId)
        .find(`svg g[aria-label="${child}"]`)
        .click({force: true})
    ;

}

function assertChartDrilldown(widgetId: string, eventWidgetId: string, yAxisLabels: string[], event: string | null, mdx: string | null) {

    assertChartYAxis(widgetId, yAxisLabels);

    cy.assertEventValue(eventWidgetId, event);

    if (mdx !== undefined) {

        cy.assertEventMdx(eventWidgetId, mdx);

    }

}


describe("Drilldown/Drilldowns chart axis label", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Drilldown/Drilldown chart axis label");
        cy.waitForQueryCount(1);
    });

    it("ww0: Standard/Children Drilldown", () => {

        let queryCount = 1;

        const widgetId = "ww0";
        const eventWidgetId = "ww1";

        assertChartDrilldown(widgetId, eventWidgetId, ["France", "United States", "South Africa", "Switzerland"], null, null)

        selectChartLabel(widgetId, "United States");  // Clicking on united states axis label
        cy.waitForQueryCount(++queryCount);

        assertChartDrilldown(widgetId, eventWidgetId, ["Los Angeles", "New York", "Washington"], "United States", "[Geography].[Classification].[Country].&[US]");

    });

});
