export {};

function clickGantt(widgetBoxId: string, nodeName: string): void {
    cy.getWidget(widgetBoxId)
        .find(".ic3WidgetBox-content")
        .find("svg")
        .find('tspan')
        .contains(nodeName)
        .first()
        .click();
}

describe("Charts/Events/Gantt Click Events", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Charts/Events/gantt click events");
        cy.waitForQueryCount(1);
    });

    it("ww0: Gantt events", () => {

        const widgetId = "ww0";
        const selectionEventWidgetId = "ww1";
        const axisEventWidgetId = "ww2";
        const groupEventWidgetId = "ww3";

        cy.assertEventValue(selectionEventWidgetId, "");
        cy.assertEventValue(axisEventWidgetId, "");
        cy.assertEventValue(groupEventWidgetId, "");

        clickGantt(widgetId, "2020");
        cy.assertEventValue(selectionEventWidgetId, "(2020, Business), (2020, Consumer)");
        cy.assertEventValue(axisEventWidgetId, "2020");
        cy.assertEventValue(groupEventWidgetId, "Business");


    });

});
