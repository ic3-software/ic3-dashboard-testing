describe("Local State/Large dropdown", () => {

    const dashboard = "Local State/Large dropdown";
    const header = "Large Dropdown [Time].[Time].[Day].&[2022-01-01]";
    const wid = "ww5";

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);
        cy.clearAllLocalStorage();
    });

    it("Save/Restore State", () => {

        // First create the state
        cy.selectDropdownFromInputLazy(wid, "1 Jan 2022");

        // Assert the state
        cy.assertWidgetHeader(wid, header);

        // Then refresh page
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(2);

        // Assert state is kept
        cy.assertWidgetHeader(wid, header);

    });

});