export {};


describe("Editor/AddEventToQueriesKPI", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Editor/add event to queries kpi");
        cy.waitForQueryCount(3);
    });

    /*
    Width and height of the dashboard-div remains the same when zooming in and out. Only scale changes.
     */

    it("Test add event to queries", () => {

        cy.clickUserMenuAddEventToQueries("ww0");

       cy.widgetEditorOpen("ww1");
        cy.widgetEditorChangeTab("tab-query");
       cy.widgetEditorQueryBuilderAssertNode("QueryEditorMdxBuilder.AxisFilter", "year");
       cy.widgetEditorApplyAndClose();

        cy.widgetEditorOpen("ww2");
        cy.widgetEditorChangeTab("tab-query");
        cy.widgetEditorQueryBuilderAssertNode("QueryEditorMdxBuilder.AxisFilter", "year");
        cy.widgetEditorApplyAndClose();

    });

});
