export {};

describe("Editor/Changing non-query option", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Editor/Changing non-query option");
        cy.waitForQueryCount(1);
    });

    it("Add widget", () => {

        /*
        The query (mdx and native) should not re-run when changing a non-query option for the widget. Test with the
        widget title.
         */

        ["ww0", "ww1"].forEach(widgetId => {
            cy.widgetEditorOpen(widgetId);
            cy.widgetEditorChangeTab("tab-chart");
            cy.widgetEditorChangeTextOption("header-$-title", "new-title");
            cy.widgetEditorApply();
            cy.assertWidgetRenderStatus(widgetId, "RENDERED");
            cy.widgetEditorClose();
        });

    });

});
