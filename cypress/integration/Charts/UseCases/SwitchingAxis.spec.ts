export {};

describe("Charts/UseCases/Change axis", () => {

    Cypress.on('window:before:load', (win) => {
        cy.stub(win.console, 'error').as('consoleError')
    });

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Charts/UseCases/Change axis");
        cy.waitForQueryCount(1);
    });

    it("ww0: Sankey events in tree", () => {

        const dropdownId = "ww1";
        cy.selectDropdownFromInput(dropdownId, "last 4 weeks");
        cy.wait(100)
        cy.clearDropdown(dropdownId);
        cy.wait(100)

        cy.get('@consoleError').should('not.have.been.called')
    });

});
