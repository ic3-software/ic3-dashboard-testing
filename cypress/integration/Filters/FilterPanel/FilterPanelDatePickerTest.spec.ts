export {};

describe("Filters/FilterPanelDatePickerTest", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/FilterPanelDatePickerTest");
        cy.waitForQueryCount(0);
    });

    it("Test between picker", () => {
        cy.getWidget("ww0").find("div[data-cy=value-selector-text]").click();
        cy.get(".MuiDateRangeCalendar-root");  // Kalender should open.
    })

});
