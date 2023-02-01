export {};

function clickSankeyNode(widgetBoxId: string, nodeName: string, holdCtrl: boolean): void {
    cy.getWidget(widgetBoxId)
        .find(".ic3WidgetBox-content")
        .find("svg")
        .find('tspan')
        .contains(nodeName)
        .first()
        .click({ctrlKey: holdCtrl})
        // looks like the click is not properly fired otherwise (always failing w/ electron wo/ any wait)
        .wait(250)
    ;
}


describe("Selection/Sankey Selection", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Selection/Sankey selection");
        cy.waitForQueryCount(3);
    });

    it("ww0: Sankey selection in tree", () => {

        const widgetId = "ww0";
        const eventWidgetId = "ww1";

        cy.assertEventValue(eventWidgetId, "");
        cy.assertEventMdx(eventWidgetId, "");

        clickSankeyNode(widgetId, "icCube", false);
        cy.assertEventValue(eventWidgetId, "icCube");
        cy.assertEventMdx(eventWidgetId, "[Product].[Product].[Company].&[1]");

        clickSankeyNode(widgetId, "Server", false);
        cy.assertEventValue(eventWidgetId, "Server");
        cy.assertEventMdx(eventWidgetId, "[Product].[Product].[Article].&[2]");

        clickSankeyNode(widgetId, "Server", false);
        cy.assertEventValue(eventWidgetId, "");
        cy.assertEventMdx(eventWidgetId, "");

        clickSankeyNode(widgetId, "Silver", false);
        clickSankeyNode(widgetId, "License", true);
        cy.assertEventValue(eventWidgetId, "Silver,License");
        cy.assertEventMdx(eventWidgetId, "([Product].[Product].[Article].&[3],[Product].[Product].[Category].&[1])");

    });

    it("ww2: Sankey selection in 3 cols", () => {

        const widgetId = "ww2";
        const eventWidgetId = "ww3";

        cy.assertEventValue(eventWidgetId, "");
        cy.assertEventMdx(eventWidgetId, "");

        clickSankeyNode(widgetId, "Global North", false);
        cy.assertEventValue(eventWidgetId, "Global North");
        cy.assertEventMdx(eventWidgetId, "[Geography].[Classification].[Hemisphere].&[Global North]");

        clickSankeyNode(widgetId, "Consumer", false);
        cy.assertEventValue(eventWidgetId, "Consumer");
        cy.assertEventMdx(eventWidgetId, "[Customer].[Customer].[Type].&[Consumer]");

        clickSankeyNode(widgetId, "Consumer", false);
        cy.assertEventValue(eventWidgetId, "");
        cy.assertEventMdx(eventWidgetId, "");

        clickSankeyNode(widgetId, "Server", false);
        clickSankeyNode(widgetId, "Global South", true);
        cy.assertEventValue(eventWidgetId, "Server,Global South");
        cy.assertEventMdx(eventWidgetId, "([Product].[Article].[Article].&[2],[Geography].[Classification].[Hemisphere].&[Global South])");

    });

    it("ww4: Sankey selection 2 cols loop", () => {

        const widgetId = "ww4";
        const eventWidgetId = "ww5";

        cy.assertEventValue(eventWidgetId, "");
        cy.assertEventMdx(eventWidgetId, "");

        clickSankeyNode(widgetId, "Personal", false);
        cy.assertEventValue(eventWidgetId, "Personal");
        cy.assertEventMdx(eventWidgetId, "[Product].[Article].[Article].&[1]");

        clickSankeyNode(widgetId, "Silver", false);
        cy.assertEventValue(eventWidgetId, "Silver");
        cy.assertEventMdx(eventWidgetId, "[Product].[Article].[Article].&[3]");

        clickSankeyNode(widgetId, "Silver", false);
        cy.assertEventValue(eventWidgetId, "");
        cy.assertEventMdx(eventWidgetId, "");

        clickSankeyNode(widgetId, "Gold", false);
        clickSankeyNode(widgetId, "Platinum", true);
        cy.assertEventValue(eventWidgetId, "Gold,Platinum");
        cy.assertEventMdx(eventWidgetId, "([Product].[Article].[Article].&[4],[Product].[Article].[Article].&[5])");

    });

});
