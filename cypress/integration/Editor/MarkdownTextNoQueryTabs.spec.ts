export {};


describe("Editor/MarkdownTextNoQueryTabs", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Editor/Empty Report");
        cy.waitForQueryCount(0);
    });

    /*
    The ic3.MarkdownText widget has no query (withoutQuery) : its editor has neither the query nor the transformations tab.
     */

    it("No query and transformations tabs", () => {

        cy.addWidgetAndOpenEditor("ic3.MarkdownText");

        // The editor is actually opened (otherwise the 'not.exist' checks below are meaningless)
        cy.widgetEditorChangeTab("tab-chart");

        cy.widgetEditorTabNotExists("tab-query");
        cy.widgetEditorTabNotExists("tab-transformations");

        cy.widgetEditorClose();

        // Same tabs for a widget with a query : they do exist (i.e., the data-cy above are still valid)
        cy.addWidgetAndOpenEditor("ic3.Table", 600);

        cy.widgetEditorChangeTab("tab-query");
        cy.widgetEditorChangeTab("tab-transformations");

        cy.widgetEditorClose();

    });

});
