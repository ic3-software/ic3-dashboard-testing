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
        // Bar svg elements are before the line elements, no need for numLineGroups
        assertSelection(widgetId, eventWidgetId, eventValue, eventMdx, axisIdx, groupIdx);
    } else {
        assertSelection(widgetId, eventWidgetId, eventValue, eventMdx, axisIdx, undefined);
    }
}

function selectSingleChartBarInCombo(widgetBoxId: string, group: number, axis: number, numLineGroups: number) {
    // Bar svg elements are before the line elements, no need for numLineGroups
    cy.selectSingleChartBarInGroup(widgetBoxId, group, axis);
}

describe("Selection/Charts Multi Measure Selection 2", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Selection/Chart Multi Measure 2");
        cy.waitForQueryCount(2);
    });

    it("ww1: combo multi measure", () => {

        const widgetId = "ww1";
        const eventWidgetId = "ww3";

        assertSelection(widgetId, eventWidgetId, "", "");

        selectSingleChartBarInCombo(widgetId, 1, 0, 3);
        assertSelectionCombo(widgetId, eventWidgetId, "2018 Q1", "[Time].[Time].[Quarter].&[2018-01-01]", 0, 1, 3);

        selectSingleChartBarInCombo(widgetId, 0, 1, 3);
        assertSelectionCombo(widgetId, eventWidgetId, "2018 Q2", "[Time].[Time].[Quarter].&[2018-04-01]", 1, 0, 3);

        selectSingleChartBarInCombo(widgetId, 1, 1, 3);
        assertSelectionCombo(widgetId, eventWidgetId, "", "");

        selectSingleChartBarInCombo(widgetId, 0, 4, 3);
        assertSelectionCombo(widgetId, eventWidgetId, "2019 Q1", "[Time].[Time].[Quarter].&[2019-01-01]", 4, 0, 3);

        cy.clickUserMenuClearSelection(widgetId);
        assertSelectionCombo(widgetId, eventWidgetId, "", "");

    });

    it("ww4: combo grouped-multi measure", () => {

        const widgetId = "ww4";
        const eventWidgetId = "ww5";

        assertSelection(widgetId, eventWidgetId, "", "");

        selectSingleChartBarInCombo(widgetId, 1, 0, 6);
        assertSelectionCombo(widgetId, eventWidgetId, "(2018 Q1, Global North)", "([Time].[Time].[Quarter].&[2018-01-01],[Geography].[Classification].[Hemisphere].&[Global North])",
            0, 1, 6);

        selectSingleChartBarInCombo(widgetId, 2, 0, 6);
        assertSelectionCombo(widgetId, eventWidgetId, "(2018 Q1, Global South)", "([Time].[Time].[Quarter].&[2018-01-01],[Geography].[Classification].[Hemisphere].&[Global South])",
            0, 2, 6);

        cy.clickUserMenuClearSelection(widgetId);
        assertSelectionCombo(widgetId, eventWidgetId, "", "");

    });


});
