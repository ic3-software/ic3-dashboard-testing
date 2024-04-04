describe("Local State/Range picker", () => {

    const dashboard = "Local State/Range picker";
    const header = "Range Picker DateTime(2024,3,29) DateTime(2024,4,4) ";
    const wid = "ww3";

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);
        cy.clearAllLocalStorage();
    });

    it("Save/Restore State", () => {

        // First create the state
        cy.datePickerChooseShortcut(wid, "Last 7 days");

        // Assert the state
        cy.assertWidgetHeader(wid, header);

        // Then refresh page
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);

        // Assert state is kept
        cy.assertWidgetHeader(wid, header);

    });

});