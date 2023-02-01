export {};

function assertSelection(widgetId: string, eventWidgetId: string, treeMode: TreeMode, selection: string[], event: string | null, mdx?: string) {

    cy.assertTreeSelection(widgetId, treeMode, selection);

    cy.assertEventValue(eventWidgetId, event);

    if (mdx !== undefined) {

        cy.assertEventMdx(eventWidgetId, mdx);

    }

}

describe("Filters/Tree Single Options", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Tree Single Options");
        cy.waitForQueryCount(4);
    });

    it("ww0: CI - Fire Compacted", () => {

        const widgetId = "ww0";
        const eventWidgetId = "ww1";

        const treeMode = "control-icons";

        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

        // -------------------------------------------------------------------------------------------------------------
        // Cascade Selection & Fire Event Mode do not apply with Single Selection
        // -------------------------------------------------------------------------------------------------------------

        cy.selectTree(widgetId, "control-icons", "Alexandria");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Alexandria"], "Alexandria");

        cy.selectTree(widgetId, "control-icons", "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Egypt"], "Egypt");

        cy.selectTree(widgetId, treeMode, "Africa");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa"], "Africa");

        cy.selectTree(widgetId, "control-icons", "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Egypt"], ["Egypt"].join(","));

        cy.selectTree(widgetId, "control-icons", "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

        cy.selectTree(widgetId, "control-icons", "Durban");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Durban"], ["Durban"].join(","));

        cy.selectTree(widgetId, "control-icons", "South Africa");
        assertSelection(widgetId, eventWidgetId, treeMode, ["South Africa"], ["South Africa"].join(","));

        // clear selection

        cy.clickUserMenuClearSelection(widgetId);
        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

    });

    it("ww2: CI - Fire All Selected", () => {

        const widgetId = "ww2";
        const eventWidgetId = "ww3";

        const treeMode = "control-icons";

        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

        // -------------------------------------------------------------------------------------------------------------
        // Cascade Selection & Fire Event Mode do not apply with Single Selection
        // -------------------------------------------------------------------------------------------------------------

        cy.selectTree(widgetId, "control-icons", "Alexandria");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Alexandria"], "Alexandria");

        cy.selectTree(widgetId, "control-icons", "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Egypt"], ["Egypt"].join(","));

        cy.selectTree(widgetId, treeMode, "Africa");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa"], ["Africa"].join(","));

        cy.selectTree(widgetId, "control-icons", "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Egypt"], ["Egypt"].join(","));

        cy.selectTree(widgetId, "control-icons", "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

        cy.selectTree(widgetId, "control-icons", "Durban");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Durban"], ["Durban"].join(","));

        cy.selectTree(widgetId, "control-icons", "South Africa");
        assertSelection(widgetId, eventWidgetId, treeMode, ["South Africa"], ["South Africa"].join(","));

        // clear selection

        cy.clickUserMenuClearSelection(widgetId);
        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

    });

    it("ww4: CI - Cascade Selection - Fire Compacted", () => {

        const widgetId = "ww4";
        const eventWidgetId = "ww5";

        const treeMode = "control-icons";

        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

        // -------------------------------------------------------------------------------------------------------------
        // Cascade Selection & Fire Event Mode do not apply with Single Selection
        // -------------------------------------------------------------------------------------------------------------

        cy.selectTree(widgetId, "control-icons", "Alexandria");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Alexandria"], "Alexandria");

        cy.selectTree(widgetId, "control-icons", "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Egypt"], ["Egypt"].join(","));

        cy.selectTree(widgetId, treeMode, "Africa");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa"], ["Africa"].join(","));

        cy.selectTree(widgetId, "control-icons", "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Egypt"], ["Egypt"].join(","));

        cy.selectTree(widgetId, "control-icons", "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

        cy.selectTree(widgetId, "control-icons", "Durban");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Durban"], ["Durban"].join(","));

        cy.selectTree(widgetId, "control-icons", "South Africa");
        assertSelection(widgetId, eventWidgetId, treeMode, ["South Africa"], ["South Africa"].join(","));

        // clear selection

        cy.clickUserMenuClearSelection(widgetId);
        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

    });

    it("ww6: CI - Cascade Selection - Fire All Selected", () => {

        const widgetId = "ww6";
        const eventWidgetId = "ww7";

        const treeMode = "control-icons";

        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

        // -------------------------------------------------------------------------------------------------------------
        // Cascade Selection & Fire Event Mode do not apply with Single Selection
        // -------------------------------------------------------------------------------------------------------------

        cy.selectTree(widgetId, "control-icons", "Alexandria");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Alexandria"], "Alexandria");

        cy.selectTree(widgetId, "control-icons", "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Egypt"], ["Egypt"].join(","));

        cy.selectTree(widgetId, treeMode, "Africa");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa"], ["Africa"].join(","));

        cy.selectTree(widgetId, "control-icons", "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Egypt"], ["Egypt"].join(","));

        cy.selectTree(widgetId, "control-icons", "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

        cy.selectTree(widgetId, "control-icons", "Durban");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Durban"], ["Durban"].join(","));

        cy.selectTree(widgetId, "control-icons", "South Africa");
        assertSelection(widgetId, eventWidgetId, treeMode, ["South Africa"], ["South Africa"].join(","));

        // clear selection

        cy.clickUserMenuClearSelection(widgetId);
        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

    });

});
