describe("Local State/Histogram chart", () => {

    const dashboard = "Local State/Histogram chart";
    const header = "Histogram {[Time].[Time].[Month].&[2022-04-01],[Time].[Time].[Month].&[2022-09-01]}";
    const wid = "ww13";

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);
        cy.clearAllLocalStorage();
    });

    it("Save/Restore State", () => {

        // First create the state
        cy.histogramClickColumn(wid, 1);

        // Assert the state
        cy.assertWidgetHeader(wid, header);

        // Then refresh page
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);

        // Assert state is kept
        cy.assertWidgetHeader(wid, header);

    });

});