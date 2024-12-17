describe("Print/Print CSV Dropdown", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Print/Print CSV Dropdown");
        cy.waitForQueryCount(1);
    });

    it("Print In Browser", () => {

        // Assert dropdowns are there
        cy.selectDropdownFromInput("ww0", "Choix 2");
        cy.selectDropdownFromInput("ww2", "Gold");

        cy.log("### window.reload ###")
        cy.selectButton("ww1", "print-in-browser");

        cy.waitForQueryStatus();
        cy.waitForPrintStatus();
        cy.waitForQueryCount(0);

        // Assert dropdowns are there
        cy.assertDropdownSingleSelection("ww0", "Choix 2");
        cy.assertDropdownSingleSelection("ww2", "Gold");

    });

})
