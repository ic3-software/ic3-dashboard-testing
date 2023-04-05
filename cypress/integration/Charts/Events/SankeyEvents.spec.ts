export {};

function clickSankeyNode(widgetBoxId: string, nodeName: string): void {
    cy.getWidget(widgetBoxId)
        .find(".ic3WidgetBox-content")
        .find("svg")
        .find('tspan')
        .contains(nodeName)
        .first()
        .click();
}

function clickFirstSankeyFlow(widgetBoxId: string, fill: string, idx: number): void {
    cy.getWidget(widgetBoxId)
        .find(".ic3WidgetBox-content")
        .find("svg")
        .find('g[fill="' + fill + '"][stroke-opacity=0]')
        .eq(idx + 1)
        .find('path')
        .eq(0)
        .click();
}


describe("Charts/Events/Sankey Click Events", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Charts/Events/Sankey Click Events");
        cy.waitForQueryCount(3);
    });

    it("ww0: Sankey events in tree", () => {

        const widgetId = "ww0";
        const nodeEventWidgetId = "ww1";
        const flowEventWidgetId = "ww6";

        cy.assertEventValue(nodeEventWidgetId, "");
        cy.assertEventMdx(nodeEventWidgetId, "");
        cy.assertEventValue(flowEventWidgetId, "");
        cy.assertEventMdx(flowEventWidgetId, "");

        clickSankeyNode(widgetId, "icCube");
        cy.assertEventValue(nodeEventWidgetId, "icCube");
        cy.assertEventMdx(nodeEventWidgetId, "[Product].[Product].[Company].&[1]");

        // Click flow Support -> Gold
        clickFirstSankeyFlow(widgetId, "#a05195", 0);
        cy.assertEventValue(flowEventWidgetId, "Support, Gold");
        cy.assertEventMdx(flowEventWidgetId, "{[Product].[Product].[Category].&[2],[Product].[Product].[Article].&[4]}");


    });

    it("ww2: Sankey events in 3 cols", () => {

        const widgetId = "ww2";
        const nodeEventWidgetId = "ww3";
        const flowEventWidgetId = "ww7";

        cy.assertEventValue(nodeEventWidgetId, "");
        cy.assertEventMdx(nodeEventWidgetId, "");
        cy.assertEventValue(flowEventWidgetId, "");
        cy.assertEventMdx(flowEventWidgetId, "");

        clickSankeyNode(widgetId, "Global North");
        cy.assertEventValue(nodeEventWidgetId, "Global North");
        cy.assertEventMdx(nodeEventWidgetId, "[Geography].[Classification].[Hemisphere].&[Global North]");

        // Click Global North -> Business
        clickFirstSankeyFlow(widgetId, "#e07a5f", 0);
        cy.assertEventValue(flowEventWidgetId, "Global North, Business");
        cy.assertEventMdx(flowEventWidgetId, "([Geography].[Classification].[Hemisphere].&[Global North],[Customer].[Customer].[Type].&[Business])");

    });

    it("ww4: Sankey events 2 cols loop", () => {

        const widgetId = "ww4";
        const nodeEventWidgetId = "ww5";
        const flowEventWidgetId = "ww8";

        cy.assertEventValue(nodeEventWidgetId, "");
        cy.assertEventMdx(nodeEventWidgetId, "");
        cy.assertEventValue(flowEventWidgetId, "");
        cy.assertEventMdx(flowEventWidgetId, "");

        clickSankeyNode(widgetId, "Platinum");
        cy.assertEventValue(nodeEventWidgetId, "Platinum");
        cy.assertEventMdx(nodeEventWidgetId, "[Product].[Article].[Article].&[5]");

        // Click Personal -> Gold
        clickFirstSankeyFlow(widgetId, "#ff7c43", 1);
        cy.assertEventValue(flowEventWidgetId, "Personal, Gold");
        cy.assertEventMdx(flowEventWidgetId, "([Product].[Article].[Article].&[1],[Product].[Article].[Article].&[4])");

    });

});
