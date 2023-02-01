export {}


function selectChartLabel(widgetId: string, child: string) {

    cy.getWidget(widgetId)
        .find(`svg g[aria-label="${child}"]`)
        .click({force: true})
    ;

}

function assertEventValue(widgetId: string, eventWidgetId: string, event: string | null, mdx: string | null) {

    cy.assertEventValue(eventWidgetId, event);

    if (mdx !== undefined) {

        cy.assertEventMdx(eventWidgetId, mdx);

    }

}


describe("Selection/Chart axis label selection", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Selection/Chart axis label selection");
        cy.waitForQueryCount(1);
    });

    let queryCount = 1;

    it("ww0: Standard selection", () => {

        const widgetId = "ww0";
        const eventWidgetId = "ww1";

        assertEventValue(widgetId, eventWidgetId, null, null)

        selectChartLabel(widgetId, "United States");  // Clicking on united states axis label

        assertEventValue(widgetId, eventWidgetId, "(United States,Business),(United States,Consumer)", "{([Geography].[Classification].[Country].&[US],[Customer].[Customer].[Type].&[Business]),([Geography].[Classification].[Country].&[US],[Customer].[Customer].[Type].&[Consumer])}");

    });

});
