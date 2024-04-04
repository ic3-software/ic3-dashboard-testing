describe("Local State/Donut chart", () => {

    const dashboard = "Local State/Donut chart";
    const header = "Donut [Product].[Product].[Category].&[1]";
    const wid = "ww12";

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);
        cy.clearAllLocalStorage();
    });

    it("Save/Restore State", () => {

        // First create the state
        cy.donutClickSlice(wid, 1);

        // Assert the state
        cy.assertWidgetHeader(wid, header);

        // Then refresh page
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);

        // Assert state is kept
        cy.assertWidgetHeader(wid, header);

    });

});