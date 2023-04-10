export {};


describe("Editor/ChangeComboVariant", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Editor/Empty Report");
        cy.waitForQueryCount(0);
    });

    /*
    Width and height of the dashboard-div remains the same when zooming in and out. Only scale changes.
     */

    it("Add Combo & check variants", () => {

        //
        // Combo
        //
        cy.addWidgetAndOpenEditor("ic3.FilterAutocomplete");

        cy.widgetEditorEnterMdxStatement("SELECT\n" +
            "   [Time].[Time].[Year].allMembers ON 0\n" +
            "FROM [Sales]\n" +
            "CELL PROPERTIES CELL_ORDINAL");

        cy.get('button[data-cy="runQuery"]').click();

        cy.widgetEditorChangeTab("tab-interactions");
        cy.widgetEditorOpenOptionGroup("selection")
        cy.widgetEditorChangeOption("selectionMode", "Multiple Selection");
        cy.widgetEditorChangeOption("initSelectionUserDefined", "Select the first item");
        cy.widgetEditorApplyAndClose();

        // it's a chip
        cy.getWidget("ww0").find(".MuiChip-root.MuiChip-filled").should('have.length', 1);
        cy.selectDropdownFromInput("ww0", "2019");
        cy.getWidget("ww0").find(".MuiChip-root.MuiChip-filled").should('have.length', 2);

        // Change variant
        cy.widgetEditorOpen("ww0")
        cy.widgetEditorChangeTab("tab-chart");
        cy.widgetEditorChangeOption("options-chartOptions.variant", "Grouped Text");
        cy.widgetEditorApplyAndClose();

        cy.getWidget("ww0").find(".MuiChip-root.MuiChip-filled").should('not.exist');
        cy.getWidget("ww0").find(".ic3ListCounter-Label").should('have.length', 2);

        // Change variant back
        cy.widgetEditorOpen("ww0")
        cy.widgetEditorChangeTab("tab-chart");
        cy.widgetEditorChangeOption("options-chartOptions.variant", "Filled");
        cy.widgetEditorApplyAndClose();

        cy.getWidget("ww0").find(".MuiChip-root.MuiChip-filled").should('have.length', 2);


    });

});
