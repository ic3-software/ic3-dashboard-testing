describe("Local State/Simple dropdown", () => {

    const dashboard = "Local State/Simple dropdown";
    const header = "Simple Dropdown [Customer].[Customer].[Type].&[CONSUMER]";
    const wid = "ww6";

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);
        cy.clearAllLocalStorage();
    });

    it("Save/Restore State", () => {

        // First create the state
        cy.selectDropdownFromInput("ww6", "Consumer");

        // Assert the state
        cy.assertWidgetHeader(wid, header);

        // Then refresh page
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);

        // Assert state is kept
        cy.assertWidgetHeader(wid, header);

    });

});