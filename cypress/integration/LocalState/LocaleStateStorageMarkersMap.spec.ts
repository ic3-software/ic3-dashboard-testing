describe("Local State/Markers map", () => {

    const dashboard = "Local State/Markers map";
    const header = "Markers Map (Google) [Geography].[Geography].[Country].&[ES]";
    const wid = "ww14";

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);
        cy.clearAllLocalStorage();
    });

    it("Save/Restore State", () => {

        // Find the pin element by color
        cy.getWidget(wid).get("gmp-pin[background='#ed591a']")
            .click({force: true}) // Clicks in the center of the widget → ES.

        // Assert the state
        cy.assertWidgetHeader(wid, header);

        // Then refresh page
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);

        // Assert state is kept
        cy.assertWidgetHeader(wid, header);

    });

});