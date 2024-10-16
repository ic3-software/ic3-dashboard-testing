describe("Local State/Checkboxes", () => {

    const dashboard = "Local State/Checkboxes";
    const header = "Checkboxes [Geography].[Classification].[Hemisphere].&[GLOBAL SOUTH]";
    const wid = "ww1";

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);
        cy.clearAllLocalStorage();
    });

    it("Save/Restore State", () => {

        // First create the state
        cy.selectCheckbox("ww1", "Global South");

        // Assert the state
        cy.assertWidgetHeader(wid, header);

        // Then refresh page
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);

        // Assert state is kept
        cy.assertWidgetHeader(wid, header);

    });

});