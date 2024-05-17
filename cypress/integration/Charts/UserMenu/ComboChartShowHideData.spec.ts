describe("Charts/UserMenu/Combo Chart Show Hide Data", () => {

    Cypress.on('window:before:load', (win) => {
        cy.spy(win.console, 'error');
    });

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Charts/UserMenu/Combo Chart Show Hide Data");
        cy.waitForQueryCount(1);
    });

    it("ww0:Combo", () => {

        const widgetId = "ww1";
        // Show
        cy.clickUserMenu(widgetId, "showData");

        cy.assertShowDataTableCellContent(widgetId, 0, 0, "Africa");
        cy.assertShowDataTableCellContent(widgetId, 0, 1, "355");
        cy.assertShowDataTableCellContent(widgetId, 0, 2, "€833,200");

        // Hide
        cy.clickUserMenu(widgetId, "showData");

    });

    afterEach(() => {
        cy.window().then((win) => {
            expect(win.console.error).to.have.callCount(0);
        });
    });

})