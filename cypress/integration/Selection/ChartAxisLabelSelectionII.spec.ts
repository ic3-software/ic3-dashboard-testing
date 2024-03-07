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

describe("Selection/Chart axis label selection II", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Selection/Chart axis label selection II");
        cy.waitForQueryCount(1);
    });

    it("ww0: Standard selection", () => {

        const widgetId = "ww0";
        const eventWidgetId = "ww1";

        assertEventValue(widgetId, eventWidgetId, null, null)

        selectChartLabel(widgetId, "2020");  // Clicking on 2020 axis label

        assertEventValue(widgetId, eventWidgetId, "2020", "[Time].[Time].[Year].&[2020-01-01]");

    });

});
