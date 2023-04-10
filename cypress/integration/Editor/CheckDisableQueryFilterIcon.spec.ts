export {};


describe("Editor/CheckDisableQueryFilterIcon", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Editor/Empty Report");
        cy.waitForQueryCount(0);
    });

    /*
    Width and height of the dashboard-div remains the same when zooming in and out. Only scale changes.
     */

    it("DisableFilterIcon", () => {

        // Table to be filtered
        cy.addWidgetAndOpenEditor("ic3.Table");
        cy.widgetEditorEnterMdxStatement("SELECT [Measures].members.head(3)  on 0, [Product].[Article].[Article] on 1 from [Sales]");
        cy.widgetEditorApplyAndClose();


        // A filter  (manual statement doesn't create the event for now)
        cy.addWidgetAndOpenEditor("ic3.FilterAutocomplete", 600);
        cy.widgetEditorEnterMdxStatement("SELECT [Time].[Time].[Year].allMembers ON 0 FROM [Sales] CELL PROPERTIES CELL_ORDINAL");
        cy.widgetEditorChangeTab("tab-interactions");
        cy.widgetEditorOpenOptionGroup("selection")
        cy.widgetEditorChangeTextOption("Publish-Selection", "year");

        cy.widgetEditorApplyAndClose();

        // No queryFilterIcon as no filter is applied
        cy.getWidget("ww0").find("[data-cy='queryFilterIcon']").should('not.exist')

        // Check the queryFilterIcon is visible after adding the event to the query
        cy.clickUserMenuAddEventToQueries("ww1");
        cy.selectDropdownFromInput("ww1", "2019");
        cy.getWidget("ww0").find("[data-cy='queryFilterIcon']").should('have.length', 1)

        // Make queryFilterIcon disabled in the editor
        cy.widgetEditorOpen("ww0");
        cy.widgetEditorChangeTab("tab-interactions");
        cy.widgetEditorOpenOptionGroup("widgetIcons")
        cy.widgetEditorChangeBoolean("disableQueryFilter");
        cy.widgetEditorApplyAndClose();
        cy.getWidget("ww0").find("[data-cy='queryFilterIcon']").should('not.exist')

        // Make queryFilterIcon enable in the editor
        cy.widgetEditorOpen("ww0");
        cy.widgetEditorChangeTab("tab-interactions");
        cy.widgetEditorOpenOptionGroup("widgetIcons")
        cy.widgetEditorChangeBoolean("disableQueryFilter");
        cy.widgetEditorApplyAndClose();
        cy.getWidget("ww0").find("[data-cy='queryFilterIcon']").should('have.length', 1)


    });

});
