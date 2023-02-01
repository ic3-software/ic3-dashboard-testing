describe("Others/WidgetDataOnError", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/WidgetNoDataMessage");
        cy.waitForQueryCount(1);
    });

    it("ww0: Table", () => {

        const widgetId = "ww0";

        cy.getWidget(widgetId).get("[data-cy-type='data-cy-no-data']").should('have.length', 1);

        cy.getWidget(widgetId).get(".ic3WidgetBoxContentMessage-content").should('have.text', 'No data with title : This is the title');


    });


})