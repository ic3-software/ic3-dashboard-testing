describe("Local State/Geo map", () => {

    const dashboard = "Local State/Geo map";
    const header = "Geo Map [Geography].[Classification].[Country].&[FR]";
    const wid = "ww10";

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);
        cy.clearAllLocalStorage();
    });

    it("Save/Restore State", () => {

        // First create the state
        cy.geomapClickColorArea(wid, '#16194c', 1);

        // Assert the state
        cy.assertWidgetHeader(wid, header);

        // Then refresh page
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);

        // Assert state is kept
        cy.assertWidgetHeader(wid, header);

    });

});