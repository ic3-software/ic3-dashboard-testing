function getButtonWithName(widgetId: string, name: string) {

    return cy.getWidget(widgetId)
        .find('[data-cy="ic-button"][data-name="' + name + '"]')
        ;

}

describe("VExpanding/WidgetVisibilityExpand", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("VExpanding/WidgetVisibilityExpand");
        cy.waitForQueryCount(2);
    });

    it("widgets rendered", () => {

        cy.getWidget("ww0");
        cy.getWidget("ww1");
        cy.getWidget("ww9");

    })

})