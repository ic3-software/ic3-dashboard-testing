describe("Local State/Filter panel", () => {

    const dashboard = "Local State/Filter panel";
    const header = "Filter Panel {[Geography].[Geography].[Continent].&[EU]}";
    const wid = "ww4";

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(0);
        cy.clearAllLocalStorage();
    });

    it("Save/Restore State", () => {

        // First create the state
        cy.panelFilterAdd(wid, "Continent");
        cy.panelFilterSetSelection(wid, 0, ['Europe']);

        // Assert the state
        cy.assertWidgetHeader(wid, header);

        // Then refresh page
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(0);

        // Assert state is kept
        cy.assertWidgetHeader(wid, header);

    });

});