export {};

describe("Filters/selectionChip", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/selectionChip");
        cy.waitForQueryStatusForLargeDashboard();
    });

    const syncedId = "ww0";
    const buttonsId = "ww4";

    it("synced widget shows selection chip of buttons selection", () => {

        cy.selectButton(buttonsId, "North America");

        cy.assertWidgetHeaderSelection(buttonsId, "North America selected");
        cy.assertWidgetHeaderSelection(syncedId, "North America selected");

    });

});
