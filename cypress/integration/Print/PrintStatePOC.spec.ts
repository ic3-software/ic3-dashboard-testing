export {};

describe("Print/PrintStatePOC", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Print/Print State POC");
        cy.waitForQueryCount(1);
    });

    it("ww0: Buttons", () => {

        cy.selectButton("ww0", "Europe");

        cy.assertButtonSelected("ww0", "Europe");

        cy.log("### window.reload ###")
        cy.selectButton("ww1", "print-in-browser");

        cy.waitForQueryStatus();
        cy.waitForPrintStatus();
        cy.waitForQueryCount(0);

        cy.assertButtonSelected("ww0", "Europe");

    });

});
