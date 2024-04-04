describe("Local State/Single panel filter", () => {

    const dashboard = "Local State/Single panel filter";
    const header = "Single Panel Filter {[Geography].[Region].[Region].&[Middle east]}";
    const wid = "ww7";

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(0);
        cy.clearAllLocalStorage();
    });

    it("Save/Restore State", () => {

        // First create the state
        cy.singlePanelFilterSetSelection(wid, ['Middle east']);

        // Assert the state
        cy.assertWidgetHeader(wid, header);

        // Then refresh page
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(0);

        // Assert state is kept
        cy.assertWidgetHeader(wid, header);

    });

});