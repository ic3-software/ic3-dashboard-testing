describe("Local State/Check Locale", () => {

    const dashboard = "Local State/Date picker";
    const header = "Date Picker 2024-04-02";
    const wid = "ww2";

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);
        cy.clearAllLocalStorage();
    });

    it("Save/Restore State", () => {

        cy.setBrowserTimeZone("Europe/Amsterdam");

        // First create the state
        cy.selectDatePickerFromInput(wid, "2 Apr 2024");
        cy.getWidgetHeader(wid).click();

        // Assert the state
        cy.assertWidgetHeader(wid, header);
        cy.selectButton("ww1", "Refresh");
        cy.getWidget("ww0").contains("European")

        cy.setBrowserTimeZone("America/Los_Angeles");
        cy.selectButton("ww1", "Refresh");
        cy.getWidget("ww0").contains("Pacific");

        // Then refresh page
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);

        // Assert state is kept
        cy.assertWidgetHeader(wid, header);
        cy.selectButton("ww1", "Refresh");
        cy.getWidget("ww0").contains("Pacific")

    });

});