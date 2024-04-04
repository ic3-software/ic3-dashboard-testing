describe("Local State/Pivot table", () => {

    const dashboard = "Local State/Pivot table";
    const header = "Pivot Table [Time].[Time].[Year].&[2019-01-01]";
    const wid = "ww0";

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);
        cy.clearAllLocalStorage();
    });

    it("Save/Restore State", () => {

        // First create the state
        cy.selectPivotTableCell(wid, 1, 0);

        // Assert the state
        cy.assertWidgetHeader(wid, header);

        // Then refresh page
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);

        // Assert state is kept
        cy.assertWidgetHeader(wid, header);

    });

});