describe("Print/PrintStatusReadyCase", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Print/PrintStatusReadyCase", undefined, false);
        cy.waitForQueryCount(5);
    });

    it("All widgets ready to print", () => {
        cy.waitForPrintStatus();
    });

});
