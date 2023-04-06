export {};

export function assertSelection(widgetId: string, eventWidgetId: string, treeMode: TreeMode, selection: string[], event: string | null, mdx?: string) {

    cy.assertTreeSelection(widgetId, treeMode, selection);

    cy.assertEventValue(eventWidgetId, event);

    if (mdx !== undefined) {

        cy.assertEventMdx(eventWidgetId, mdx);

    }

}


describe("Filters/Tree without Autocomplete Behavior EX", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Tree without Autocomplete Behavior EX", true, false);
        cy.waitForQueryCount(4);
    });

    // -----------------------------------------------------------------------------------------------------------------
    // See TreeWithoutAutocompleteBehavior.spec : split because of Chrome crash!
    // -----------------------------------------------------------------------------------------------------------------

    it("ww10: Empty Behavior - Do not allow empty", () => {

        const widgetId = "ww10";
        const eventWidgetId = "ww11";

        const treeMode = "control-icons";

        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa"], "Africa");

        cy.selectTree(widgetId, treeMode, "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Egypt"], "Egypt");

        cy.selectTree(widgetId, treeMode, "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa"], "Africa");

        cy.selectTree(widgetId, treeMode, "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Egypt"], "Egypt");

        // Clear selection from user menu: select Africa again
        cy.clickUserMenuClearSelection(widgetId);
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa"], "Africa");

    });

    it("ww12: Connected Checkboxes", () => {

        let queryCount = 4;

        const widgetId_top = "ww12";
        const widgetId_middle = "ww14";
        const widgetId_bottom = "ww18";
        const eventWidgetId = "ww13";

        const treeMode = "control-icons";

        assertSelection(widgetId_top, eventWidgetId, treeMode, [], "--");

        cy.getWidget(widgetId_middle, "data-cy-waiting");
        cy.getWidget(widgetId_bottom, "data-cy-waiting");
        cy.waitForQueryCount(queryCount);

        // click in top
        cy.selectTree(widgetId_top, treeMode, "Africa");
        cy.waitForQueryCount(++queryCount);

        assertSelection(widgetId_top, eventWidgetId, treeMode, ["Africa"], "Africa--");
        cy.getWidget(widgetId_bottom, "data-cy-waiting");

        // click in middle
        cy.selectTree(widgetId_middle, treeMode, "South Africa");
        cy.waitForQueryCount(++queryCount);

        // dunno if that makes sense... Africa bottom is being selected...

        assertSelection(widgetId_top, eventWidgetId, treeMode, ["Africa"], "Africa-South Africa-Africa");
        assertSelection(widgetId_middle, eventWidgetId, treeMode, ["South Africa"], "Africa-South Africa-Africa");
        assertSelection(widgetId_bottom, eventWidgetId, treeMode, ["Africa"], "Africa-South Africa-Africa");

    });

    it("ww15: Connected Checkboxes", () => {

        let queryCount = 4;

        const widgetId_top = "ww15";
        const widgetId_bottom = "ww16";
        const eventWidgetId = "ww17";

        const treeMode = "control-icons";

        assertSelection(widgetId_top, eventWidgetId, treeMode, [], null);
        assertSelection(widgetId_bottom, eventWidgetId, treeMode, [], null);

        cy.selectTree(widgetId_top, treeMode, "Cairo");
        cy.waitForQueryCount(queryCount);
        assertSelection(widgetId_top, eventWidgetId, treeMode, ["Cairo"], "Cairo");
        assertSelection(widgetId_bottom, eventWidgetId, treeMode, ["Cairo"], "Cairo");

        cy.selectTree(widgetId_bottom, treeMode, "Alexandria");
        cy.waitForQueryCount(queryCount);
        assertSelection(widgetId_top, eventWidgetId, treeMode, ["Cairo", "Alexandria"], ["Alexandria", "Cairo"].join(", "));
        assertSelection(widgetId_bottom, eventWidgetId, treeMode, ["Cairo", "Alexandria"], ["Alexandria", "Cairo"].join(", "));

    });

});
