export {};

describe("Print/Print Redux stateForPrint", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Print/Print Redux stateForPrint");
        cy.waitForQueryCount(3);
    });

    it("ww0: Countries", () => {

        cy.selectDropdownFromInput("ww0", "Daisy Ltd.");
        cy.selectDropdownFromInputLazy("ww1", "Daisy Ltd.");
        cy.selectDropdownFromInputLazy("ww2", "Daisy Ltd.");

        cy.log("### window.reload ###")

        cy.selectButton("ww3", "print-in-browser");
        cy.waitForQueryStatus();
        cy.waitForPrintStatus();
        cy.waitForQueryCount(0);

        cy.assertDropdownSingleSelection("ww0", "Daisy Ltd.");
        cy.assertDropdownMultiSelection("ww1", ["Daisy Ltd."]);
        cy.assertDropdownSingleSelection("ww2", "Daisy Ltd.");

    });

});
