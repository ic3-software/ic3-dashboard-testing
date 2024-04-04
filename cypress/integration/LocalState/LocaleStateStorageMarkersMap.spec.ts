describe("Local State/Markers map", () => {

    const dashboard = "Local State/Markers map";
    const header = "Markers Map (Google) [Geography].[Geography].[Country].&[ZA]";
    const wid = "ww14";

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);
        cy.clearAllLocalStorage();
    });

    it("Save/Restore State", () => {

        // First create the state
        cy.getWidget(wid)
            .click({}) // Clicks in the center of the widget → ZA.

        // Assert the state
        cy.assertWidgetHeader(wid, header);

        // Then refresh page
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);

        // Assert state is kept
        cy.assertWidgetHeader(wid, header);

    });

});