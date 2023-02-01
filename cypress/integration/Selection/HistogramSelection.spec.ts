export {};

function assertSelection(widgetId: string, eventWidgetId: string, eventValue: string, eventMdx: string, childIdx?: number) {

    // ensure not to have a hovering effect before asserting the bar colors
    cy.clickWidgetHeader(widgetId);

    if (childIdx != null)
        cy.assertSelectedSingleChartBarInGroup(widgetId, 0, childIdx);

    cy.assertEventValue(eventWidgetId, eventValue);
    cy.assertEventMdx(eventWidgetId, eventMdx);

}

interface Item {
    year: number;
    product?: number;
}


describe("Selection/Histogram Selection", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Selection/Histogram Selection");
        cy.waitForQueryCount(2);
    });

    it("ww5: Column with multiple selection", () => {

        const widgetId = "ww5";
        const eventWidgetId = "ww3";

        assertSelection(widgetId, eventWidgetId, "", "");

        cy.selectSingleChartBarInGroup(widgetId, 0, 0);
        assertSelection(widgetId, eventWidgetId, "Ankara,London,Tehran", "{[Geography].[Region].[City].&[Ankara],[Geography].[Region].[City].&[London],[Geography].[Region].[City].&[Tehran]}");

        cy.selectSingleChartBarInGroup(widgetId, 0, 2);
        assertSelection(widgetId, eventWidgetId, "Durban,Sydney,Islamabad,Brasília", "{[Geography].[Region].[City].&[Durban],[Geography].[Region].[City].&[Sydney],[Geography].[Region].[City].&[Islamabad],[Geography].[Region].[City].&[Brasília]}");

        cy.selectSingleChartBarInGroup(widgetId, 0, 2);
        assertSelection(widgetId, eventWidgetId, "", "");

        cy.keyCtrl(() => {
            cy.selectSingleChartBarInGroup(widgetId, 0, 8);
            cy.selectSingleChartBarInGroup(widgetId, 0, 9);
        });
        assertSelection(widgetId, eventWidgetId, "Marseille,Rotterdam,Madrid", "{[Geography].[Region].[City].&[Marseille],[Geography].[Region].[City].&[Rotterdam],[Geography].[Region].[City].&[Madrid]}");

    });

    it("ww2: Column with single selection granularity", () => {

        const widgetId = "ww1";
        const eventWidgetId = "ww4";

        assertSelection(widgetId, eventWidgetId, "", "");

        cy.selectSingleChartBarInGroup(widgetId, 1, 2);
        assertSelection(widgetId, eventWidgetId, "Business", "[Customer].[Customer].[Type].&[Business]");

        cy.selectSingleChartBarInGroup(widgetId, 1, 3);
        assertSelection(widgetId, eventWidgetId, "", "");

        cy.selectSingleChartBarInGroup(widgetId, 0, 0);
        assertSelection(widgetId, eventWidgetId, "Consumer", "[Customer].[Customer].[Type].&[Consumer]");

    });

});
