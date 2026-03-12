describe("Print/PrintTableHeaderWrapping", () => {

    beforeEach(() => {
        cy.login();
    });

    it("PrintTableHeaderWrapping", () => {

        cy.openPrintInBrowserTestReport("Print/PrintTableHeaderWrapping");
        cy.waitForQueryCount(2);

        cy.getTableHeader("ww0", "Type")
            .should('have.css', 'height').should(height => {
            expect(height).to.include('px');
            expect(parseInt(String(height), 10)).to.be.within(50, 55);
        });

        cy.getTableHeader("ww1", "Type")
            .should('have.css', 'height').should(height => {
            expect(height).to.include('px');
            expect(parseInt(String(height), 10)).to.be.within(60, 65);
        });

    });

});
