describe("Print/PrintTableScrollbar", () => {

    beforeEach(() => {
        cy.login();
    });

    it("No unnecessary vertical scrollbar", () => {

        cy.openPrintInBrowserTestReport("Print/PrintTableScrollbar");
        cy.waitForQueryCount(1);

        cy.getWidget("ww0").should('have.css', 'height').should(height => {
            expect(height).to.include('px');
            expect(parseInt(String(height), 10)).to.be.within(211, 213);  // Adres rounding issues.
        });

    });

});
