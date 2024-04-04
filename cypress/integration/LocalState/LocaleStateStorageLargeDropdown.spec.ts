describe("Local State/Large dropdown", () => {

    const dashboard = "Local State/Large dropdown";
    const header = "Large Dropdown [Customer].[Customer].[Name].&[18]";
    const wid = "ww5";

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);
        cy.clearAllLocalStorage();
    });

    it("Save/Restore State", () => {

        // First create the state
        cy.selectDropdownFromInputLazy(wid, "Yellow birch Ltd.");

        // Assert the state
        cy.assertWidgetHeader(wid, header);

        // Then refresh page
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);

        // Assert state is kept
        cy.assertWidgetHeader(wid, header);

    });

});