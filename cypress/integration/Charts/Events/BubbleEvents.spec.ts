export {};

function clickBubble(widgetBoxId: string, nodeName: string): void {
    cy.getWidget(widgetBoxId)
        .find(".ic3WidgetBox-content")
        .find("svg")
        .find('g[fill="#ff0000"]')
        .first()
        .click();
}

describe("Charts/Events/Bubble Click Events", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Charts/Events/Bubble Click Events");
        cy.waitForQueryCount(1);
    });

    it("ww0: Sankey events in tree", () => {

        const widgetId = "ww0";
        const groupEventWidgetId = "ww1";
        const labelEventWidgetId = "ww2";

        cy.assertEventValue(groupEventWidgetId, "");
        cy.assertEventValue(labelEventWidgetId, "");

        clickBubble(widgetId, "Northern moonwort Ltd.");
        cy.assertEventValue(groupEventWidgetId, "Business");
        cy.assertEventValue(labelEventWidgetId, "Northern moonwort Ltd.");


    });

});
