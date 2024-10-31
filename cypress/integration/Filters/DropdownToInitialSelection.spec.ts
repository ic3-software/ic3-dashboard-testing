describe("Filters/Dropdown to initial selection", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Filters/Dropdown initial selection", true, false);
        cy.waitForQueryCount(2);
    });

    it("ww0: Single", () => {

        cy.assertDropdownSingleSelection("ww0", null);
        cy.selectDropdownFromInputLazy("ww0", "Yellow birch Ltd.");
        cy.clickUserMenu("ww0", "SetAutocompleteLazyInitialSelection");
        cy.refreshDashboard();
        cy.assertDropdownSingleSelection("ww0", "Yellow birch Ltd.");

    });

    it("ww1: Multi", () => {

        cy.assertDropdownSingleSelection("ww1", null);
        cy.selectDropdownFromInputLazy("ww1", "Yellow birch Ltd.");
        cy.clickUserMenu("ww1", "SetAutocompleteLazyInitialSelection");
        cy.refreshDashboard();
        cy.assertDropdownMultiSelection("ww1", ["Yellow birch Ltd."]);

    });

});