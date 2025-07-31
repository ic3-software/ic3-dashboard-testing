describe("Print/PrintGridLayoutEmptyPage.spec.ts", () => {

    beforeEach(() => {
        cy.login();
    });

    it("Assert grid layout correct number of pages", () => {

        cy.openPrintInBrowserTestReport("Print/PrintGridLayoutEmptyPage", undefined, undefined, "portrait");
        cy.assertPageCount(1);

    });

});
