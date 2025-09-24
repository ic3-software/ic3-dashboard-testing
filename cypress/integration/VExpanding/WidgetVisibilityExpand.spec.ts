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