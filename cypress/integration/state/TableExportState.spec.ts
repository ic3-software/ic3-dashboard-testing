describe("State/Table export state", () => {

    Cypress.on('window:before:load', (win) => {
        cy.stub(win.console, 'error').as('consoleError')
    });

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("State/Table export state");
        cy.waitForQueryCount(1);
    });

    it("ww0: Table state quick navigation regression test", () => {
        // Navigating away from a table that saves state should work
        cy.get('[data-testid="DashboardIcon"]').click();
        cy.getTableHeader("ww0", "Name").click();  // Sort on Name
        cy.get('[data-testid="CreateIcon"]').click();

        // Assert no errors
        cy.get('@consoleError').should('not.have.been.called')
    });

});
