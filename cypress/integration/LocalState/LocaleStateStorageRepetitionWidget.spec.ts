describe("Local State/Repetition widget", () => {

    const dashboard = "Local State/Repetition widget";

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(3);
        cy.clearAllLocalStorage();
    });

    it("Save/Restore State", () => {

        // First create the state
        cy.selectButton("ww0~:Rep-ww1-R:0-C:0", "France");
        cy.selectButton("ww0~:Rep-ww1-R:1-C:0", "South Africa");

        // Assert the state
        cy.assertWidgetHeader("ww0~:Rep-ww1-R:0-C:0", "Buttons [Geography].[Geography].[Country].&[FR]");
        cy.assertWidgetHeader("ww0~:Rep-ww1-R:1-C:0", "Buttons [Geography].[Geography].[Country].&[ZA]");

        // Then refresh page
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(3);

        // Assert state is kept
        cy.assertWidgetHeader("ww0~:Rep-ww1-R:0-C:0", "Buttons [Geography].[Geography].[Country].&[FR]");
        cy.assertWidgetHeader("ww0~:Rep-ww1-R:1-C:0", "Buttons [Geography].[Geography].[Country].&[ZA]");

    });

});