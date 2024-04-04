describe("Local State/Slider", () => {

    const dashboard = "Local State/Slider";
    const header = "Slider [Purchase Date].[Purchase Date].[Year].&[2020-01-01]";
    const wid = "ww8";

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);
        cy.clearAllLocalStorage();
    });

    it("Save/Restore State", () => {

        // First create the state
        cy.selectSlider(wid, '2020');

        // Assert the state
        cy.assertWidgetHeader(wid, header);

        // Then refresh page
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);

        // Assert state is kept
        cy.assertWidgetHeader(wid, header);

    });

});