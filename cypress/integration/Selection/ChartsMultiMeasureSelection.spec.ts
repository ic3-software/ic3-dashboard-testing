export {};

function assertSelection(widgetId: string, eventWidgetId: string, eventValue: string, eventMdx: string, axisIdx?: number, groupIdx?: number) {

    // ensure not to have a hovering effect before asserting the bar colors
    cy.clickWidgetHeader(widgetId);

    if (axisIdx != null) {
        cy.assertSelectedSingleChartBarInGroup(widgetId, groupIdx ?? 0, axisIdx);
    }

    cy.assertEventValue(eventWidgetId, eventValue);
    cy.assertEventMdx(eventWidgetId, eventMdx);

}

function assertSelectionCombo(widgetId: string, eventWidgetId: string, eventValue: string, eventMdx: string, axisIdx?: number, groupIdx?: number, numLineGroups?: number) {
    if (groupIdx != null && numLineGroups != null) {
        assertSelection(widgetId, eventWidgetId, eventValue, eventMdx, axisIdx, groupIdx + numLineGroups);
    } else {
        assertSelection(widgetId, eventWidgetId, eventValue, eventMdx, axisIdx, undefined);
    }
}

function selectSingleChartBarInCombo(widgetBoxId: string, group: number, axis: number, numLineGroups: number) {
    cy.selectSingleChartBarInGroup(widgetBoxId, group + numLineGroups, axis);
}

describe("Selection/Charts Multi Measure Selection", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Selection/Chart Multi Measure");
        cy.waitForQueryCount(2);
    });

    it("ww6: line multi measure", () => {

        const widgetId = "ww6";
        const eventWidgetId = "ww7";

        assertSelection(widgetId, eventWidgetId, "", "");

        cy.selectSingleChartBarInGroup(widgetId, 0, 0);
        assertSelection(widgetId, eventWidgetId, "2018 Jan", "[Time].[Time].[Month].&[2018-01-01]", 0);

        cy.selectSingleChartBarInGroup(widgetId, 0, 1);
        assertSelection(widgetId, eventWidgetId, "2018 Feb", "[Time].[Time].[Month].&[2018-02-01]", 1);

        cy.selectSingleChartBarInGroup(widgetId, 0, 6);
        assertSelection(widgetId, eventWidgetId, "2018 Jul", "[Time].[Time].[Month].&[2018-07-01]", 6);

        cy.selectSingleChartBarInGroup(widgetId, 1, 6);
        assertSelection(widgetId, eventWidgetId, "", "");

        cy.selectSingleChartBarInGroup(widgetId, 0, 4);
        assertSelection(widgetId, eventWidgetId, "2018 May", "[Time].[Time].[Month].&[2018-05-01]", 4);

        cy.clickUserMenuClearSelection(widgetId);
        assertSelection(widgetId, eventWidgetId, "", "");

    });

    it("ww0: line grouped multi measure", () => {

        const widgetId = "ww0";
        const eventWidgetId = "ww2";

        assertSelection(widgetId, eventWidgetId, "", "");

        cy.selectSingleChartBarInGroup(widgetId, 3, 0);
        assertSelection(widgetId, eventWidgetId, "(2018 Jan, Global South)", "([Time].[Time].[Month].&[2018-01-01],[Geography].[Classification].[Hemisphere].&[GLOBAL SOUTH])", 0, 3);

        cy.selectSingleChartBarInGroup(widgetId, 3, 0);
        assertSelection(widgetId, eventWidgetId, "", "");

        cy.selectSingleChartBarInGroup(widgetId, 1, 3);
        assertSelection(widgetId, eventWidgetId, "(2018 Apr, Global North)", "([Time].[Time].[Month].&[2018-04-01],[Geography].[Classification].[Hemisphere].&[GLOBAL NORTH])", 3, 1);

        cy.clickUserMenuClearSelection(widgetId);
        assertSelection(widgetId, eventWidgetId, "", "");

    });


});
