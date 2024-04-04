describe("Local State/Bar chart", () => {

    const dashboard = "Local State/Bar chart";
    const header = "Bar [Customer].[Customer].[Name].&[52]";
    const wid = "ww11";

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);
        cy.clearAllLocalStorage();
    });

    it("Save/Restore State", () => {

        // First create the state
        cy.selectSingleChartBarInGroup(wid, 0, 1);

        // Assert the state
        cy.assertWidgetHeader(wid, header);

        // Then refresh page
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);

        // Assert state is kept
        cy.assertWidgetHeader(wid, header);

    });

});