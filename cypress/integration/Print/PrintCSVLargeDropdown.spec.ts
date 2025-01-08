describe("Print/Print CSV Tree Autocomplete", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Print/Print CSV Tree Autocomplete");
        cy.waitForQueryCount(0);
    });

    it("Print In Browser", () => {

        cy.selectButton("ww0", "print-in-browser");

        cy.waitForQueryStatus();
        cy.waitForPrintStatus();
        cy.waitForQueryCount(0);

        // Assert dropdowns are there
        cy.assertDropdownSingleSelection("ww3", "Choix 1");

    });

})
