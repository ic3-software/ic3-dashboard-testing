export {};

function assertSelection(widgetId: string, eventWidgetId: string, treeMode: TreeMode, selection: string[], event: string | null, mdx?: string) {

    cy.assertTreeSelection(widgetId, treeMode, selection);

    cy.assertEventValue(eventWidgetId, event);

    if (mdx !== undefined) {

        cy.assertEventMdx(eventWidgetId, mdx);

    }

}

describe("Filters/Tree Multi Options", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Tree Multi Options");
        cy.waitForQueryCount(2);
    });

    it("ww4: CI - Cascade Selection - Fire Compacted", () => {

        const widgetId = "ww4";
        const eventWidgetId = "ww5";

        const treeMode = "control-icons";

        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

        cy.selectTree(widgetId, "control-icons", "Alexandria");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Alexandria"], "Alexandria");

        cy.selectTree(widgetId, "control-icons", "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Egypt", "Alexandria", "Cairo"], "Egypt");

        cy.selectTree(widgetId, treeMode, "Africa");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa", "Egypt", "Alexandria", "Cairo", "South Africa", "Durban", "Johannesburg", "Pretoria"], "Africa");

        cy.selectTree(widgetId, "control-icons", "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, ["South Africa", "Durban", "Johannesburg", "Pretoria"], "South Africa");

        cy.selectTree(widgetId, "control-icons", "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa", "Egypt", "Alexandria", "Cairo", "South Africa", "Durban", "Johannesburg", "Pretoria"], "Africa");

        cy.selectTree(widgetId, "control-icons", "Durban");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Egypt", "Alexandria", "Cairo", "Johannesburg", "Pretoria"], ["Egypt", "Johannesburg", "Pretoria"].join(","));

        cy.selectTree(widgetId, "control-icons", "South Africa");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa", "Egypt", "Alexandria", "Cairo", "South Africa", "Durban", "Johannesburg", "Pretoria"], "Africa");

        // clear selection

        cy.clickUserMenuClearSelection(widgetId);
        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

    });

    it("ww6: CI - Cascade Selection - Fire All Selected", () => {

        const widgetId = "ww6";
        const eventWidgetId = "ww7";

        const treeMode = "control-icons";

        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

        cy.selectTree(widgetId, "control-icons", "Alexandria");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Alexandria"], "Alexandria");

        cy.selectTree(widgetId, "control-icons", "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Egypt", "Alexandria", "Cairo"], ["Egypt", "Alexandria", "Cairo"].join(","));

        cy.selectTree(widgetId, treeMode, "Africa");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa", "Egypt", "Alexandria", "Cairo", "South Africa", "Durban", "Johannesburg", "Pretoria"],
            ["Africa", "Egypt", "Alexandria", "Cairo", "South Africa", "Durban", "Johannesburg", "Pretoria",].join(","));

        cy.selectTree(widgetId, "control-icons", "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, ["South Africa", "Durban", "Johannesburg", "Pretoria"],
            ["South Africa", "Durban", "Johannesburg", "Pretoria"].join(","));

        cy.selectTree(widgetId, "control-icons", "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa", "Egypt", "Alexandria", "Cairo", "South Africa", "Durban", "Johannesburg", "Pretoria"],
            ["Africa", "Egypt", "Alexandria", "Cairo", "South Africa", "Durban", "Johannesburg", "Pretoria"].join(","));

        cy.selectTree(widgetId, "control-icons", "Durban");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Egypt", "Alexandria", "Cairo", "Johannesburg", "Pretoria"],
            ["Egypt", "Alexandria", "Cairo", "Johannesburg", "Pretoria"].join(","));

        cy.selectTree(widgetId, "control-icons", "South Africa");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa", "Egypt", "Alexandria", "Cairo", "South Africa", "Durban", "Johannesburg", "Pretoria"],
            ["Africa", "Egypt", "Alexandria", "Cairo", "South Africa", "Durban", "Johannesburg", "Pretoria"].join(","));

        // clear selection

        cy.clickUserMenuClearSelection(widgetId);
        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

    });

});
