export {};

export function assertSelection(widgetId: string, eventWidgetId: string, treeMode: TreeMode, selection: string[], event: string | null, mdx?: string) {

    cy.assertTreeSelection(widgetId, treeMode, selection);

    cy.assertEventValue(eventWidgetId, event);

    if (mdx !== undefined) {

        cy.assertEventMdx(eventWidgetId, mdx);

    }

}


describe("Filters/Tree without Autocomplete Behavior", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Tree without Autocomplete Behavior");
        cy.waitForQueryCount(6);
    });

    // -----------------------------------------------------------------------------------------------------------------
    // See Tree Multi Options (Tree Single Options) for a more in depth behavior tree logic testing.
    //      can keep this test a bit more simple and check initial selection and connected
    // -----------------------------------------------------------------------------------------------------------------

    // -----------------------------------------------------------------------------------------------------------------
    // See TreeWithoutAutocompleteBehaviorEX.spec : split because of Chrome crash!
    // -----------------------------------------------------------------------------------------------------------------

    it("ww0: Checkbox - Single", () => {

        const widgetId = "ww0";
        const eventWidgetId = "ww1";

        const treeMode = "control-icons";

        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

        cy.selectTree(widgetId, treeMode, "Africa");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa"], "Africa");

        cy.selectTree(widgetId, treeMode, "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Egypt"], "Egypt");

        cy.selectTree(widgetId, treeMode, "Egypt");
        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

        cy.selectTree(widgetId, treeMode, "Alexandria");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Alexandria"], "Alexandria");

        cy.clickUserMenuClearSelection(widgetId);
        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

    });

    it("ww2: Checkbox Multiple", () => {

        const widgetId = "ww2";
        const eventWidgetId = "ww3";

        const treeMode = "control-icons";

        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

        const selections = ["Alexandria", "Cairo"];

        selections.forEach((label) => {
            cy.selectTree(widgetId, treeMode, label);
        });

        assertSelection(widgetId, eventWidgetId, treeMode, selections, selections.join(", "));

        cy.clickUserMenuClearSelection(widgetId);
        assertSelection(widgetId, eventWidgetId, treeMode, [], null);

    });

    it("ww4: Checkbox - Initial Selection", () => {

        const widgetId = "ww4";
        const eventWidgetId = "ww5";

        const treeMode = "control-icons";

        assertSelection(widgetId, eventWidgetId, treeMode, ["South Africa"], "South Africa");

    });

    it("ww19: Multi: Empty Behavior - Select all", () => {

        const widgetId = "ww19";
        const eventWidgetId = "ww20";

        const treeMode = "control-icons";

        const selections = ["Oceania", "Australia", "Canberra", "Sydney"];

        assertSelection(widgetId, eventWidgetId, treeMode, selections, "Oceania");

        cy.selectTree(widgetId, treeMode, "Oceania");
        cy.selectTree(widgetId, treeMode, "Australia");
        cy.selectTree(widgetId, treeMode, "Canberra");
        cy.selectTree(widgetId, treeMode, "Sydney");
        assertSelection(widgetId, eventWidgetId, treeMode, selections, "Oceania");

    });

    it("ww19: Multi: Empty Behavior - Select all [clear selection]", () => {

        const widgetId = "ww19";
        const eventWidgetId = "ww20";

        const treeMode = "control-icons";

        const selections = ["Oceania", "Australia", "Canberra", "Sydney"];

        assertSelection(widgetId, eventWidgetId, treeMode, selections, "Oceania");

        cy.selectTree(widgetId, treeMode, "Oceania");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Australia", "Canberra", "Sydney"], "Australia");

        // Clear selection from user menu: select all items again
        cy.clickUserMenuClearSelection(widgetId);
        assertSelection(widgetId, eventWidgetId, treeMode, selections, "Oceania");

    });

    it("ww8: Empty Behavior - Default Member", () => {

        const widgetId = "ww8";
        const eventWidgetId = "ww9";

        const treeMode = "control-icons";

        assertSelection(widgetId, eventWidgetId, treeMode, [], "All Regions");

        cy.selectTree(widgetId, treeMode, "Africa");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa"], "Africa");

        cy.selectTree(widgetId, treeMode, "Africa");
        assertSelection(widgetId, eventWidgetId, treeMode, [], "All Regions");

        cy.selectTree(widgetId, treeMode, "Africa");
        assertSelection(widgetId, eventWidgetId, treeMode, ["Africa"], "Africa");

        // Clear selection from user menu: select All Regions again
        cy.clickUserMenuClearSelection(widgetId);
        assertSelection(widgetId, eventWidgetId, treeMode, [], "All Regions");
    });

});
