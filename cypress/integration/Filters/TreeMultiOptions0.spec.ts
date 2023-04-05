export {};

function assertSelection(widgetId: string, eventWidgetId: string, treeMode: TreeMode, selection: string[], event: string | null, mdx?: string) {

    cy.assertTreeSelection(widgetId, treeMode, selection);

    cy.assertEventValue(eventWidgetId, event);

    if (mdx !== undefined) {

        cy.assertEventMdx(eventWidgetId, mdx);

    }

}

describe("Filters/Tree Multi Options 0", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Tree Multi Options 0");
        cy.waitForQueryCount(1);
    });

    it("ww0: CI - Fire Compacted", () => {

        const widgetId = "ww0";
        const eventWidgetId = "ww1";

        const treeMode = "control-icons";

        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

        cy.selectTree(widgetId, "control-icons", "Alexandria");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Alexandria"], "Alexandria");

        cy.selectTree(widgetId, "control-icons", "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Egypt", "Alexandria"], "Egypt");

        cy.selectTree(widgetId, treeMode, "Africa");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa", "Egypt", "Alexandria"], "Africa");

        cy.selectTree(widgetId, "control-icons", "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa", "Alexandria"], ["Africa", "Alexandria"].join(", "));

        cy.selectTree(widgetId, "control-icons", "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa", "Egypt", "Alexandria"], "Africa");

        cy.selectTree(widgetId, "control-icons", "Durban");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa", "Egypt", "Alexandria", "Durban"], ["Africa", "Durban"].join(", "));

        cy.selectTree(widgetId, "control-icons", "South Africa");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa", "Egypt", "Alexandria", "South Africa", "Durban"], ["Africa"].join(", "));

        // clear selection

        cy.clickUserMenuClearSelection(widgetId);
        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

    });

    it("ww0: CI - Fire Compacted: CTRL", () => {

        const widgetId = "ww0";
        const eventWidgetId = "ww1";

        const treeMode = "control-icons";

        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

        const selection = ["Durban", "Johannesburg", "Pretoria"];

        cy.keyCtrl(() => {
            selection.forEach(label => cy.selectTree(widgetId, "control-icons", label));
        });

        assertSelection(widgetId, eventWidgetId, treeMode, selection, selection.join(", "));

        // clear selection

        cy.clickUserMenuClearSelection(widgetId);
        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

    });

    it("ww0: CI - Fire Compacted: SHIFT", () => {

        const widgetId = "ww0";
        const eventWidgetId = "ww1";

        const treeMode = "control-icons";

        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

        const selection = ["Durban", "Johannesburg", "Pretoria"];

        cy.selectTree(widgetId, "control-icons", "Durban");
        cy.keyShift(() => {
            cy.selectTree(widgetId, "control-icons", "Pretoria");
        });

        assertSelection(widgetId, eventWidgetId, treeMode, selection, selection.join(", "));

        // clear selection

        cy.clickUserMenuClearSelection(widgetId);
        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

    });

});
