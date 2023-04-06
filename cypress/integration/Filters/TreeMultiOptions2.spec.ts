export {};

function assertSelection(widgetId: string, eventWidgetId: string, treeMode: TreeMode, selection: string[], event: string | null, mdx?: string) {

    cy.assertTreeSelection(widgetId, treeMode, selection);

    cy.assertEventValue(eventWidgetId, event);

    if (mdx !== undefined) {

        cy.assertEventMdx(eventWidgetId, mdx);

    }

}

describe("Filters/Tree Multi Options 2", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Tree Multi Options 2");
        cy.waitForQueryCount(1);
    });

    it("ww2: CI - Fire All Selected", () => {

        const widgetId = "ww2";
        const eventWidgetId = "ww3";

        const treeMode = "control-icons";

        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

        cy.selectTree(widgetId, "control-icons", "Alexandria");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Alexandria"], "Alexandria");

        cy.selectTree(widgetId, "control-icons", "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Egypt", "Alexandria"], ["Egypt", "Alexandria"].join(", "));

        cy.selectTree(widgetId, treeMode, "Africa");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa", "Egypt", "Alexandria"], ["Africa", "Egypt", "Alexandria"].join(", "));

        cy.selectTree(widgetId, "control-icons", "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa", "Alexandria"], ["Africa", "Alexandria"].join(", "));

        cy.selectTree(widgetId, "control-icons", "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa", "Egypt", "Alexandria"], ["Africa", "Egypt", "Alexandria"].join(", "));

        cy.selectTree(widgetId, "control-icons", "Durban");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa", "Egypt", "Alexandria", "Durban"], ["Africa", "Egypt", "Alexandria", "Durban"].join(", "));

        cy.selectTree(widgetId, "control-icons", "South Africa");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa", "Egypt", "Alexandria", "South Africa", "Durban"],
            ["Africa", "Egypt", "Alexandria", "South Africa", "Durban"].join(", "));

        // clear selection

        cy.clickUserMenuClearSelection(widgetId);
        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

    });

});
