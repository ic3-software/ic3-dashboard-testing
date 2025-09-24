describe("Print/PrintGridHeaderFooter.spec.ts", () => {

    beforeEach(() => {
        cy.login();
    });

    it("Assert grid correct widget position for header", () => {

        cy.openPrintInBrowserTestReport("Print/Grid layout header", undefined, undefined, "portrait");
        cy.assertPageCount(3);

        cy.getWidget("ww9").should('have.css', 'top', '0px');

    });

});
