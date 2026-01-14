export {};

describe("Filters/KeepSelectionWhenNotInData", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/KeepSelectionWhenNotInData");
        cy.waitForQueryStatusForLargeDashboard();
        cy.waitForQueryCount(3);
    });

    const filterPanelId = "ww0";
    const tableId = "ww1";
    const buttonsId = "ww4";
    const eventId = "ww3";

    it("table keeps selection when filtered out by filter panel", () => {

        cy.assertEventValue(eventId, null);
        cy.clickTableRow(tableId, 0);  // Click Africa
        cy.assertEventValue(eventId, "Africa");

        // Now filter with the filter panel for Asia
        cy.panelFilterSetSelection(filterPanelId, 0, ["Asia"]);

        // Check Africa is kept in selection of the table
        cy.assertEventValue(eventId, "Africa");
        cy.assertWidgetHeaderSelection(tableId, "Africa selected");

        // Now ctrl click Asia, should keep Africa selected.
        cy.clickTableCell(tableId, 0, 0, true);  // Click Asia
        cy.assertEventValue(eventId, "Africa, Asia");
        cy.assertWidgetHeaderSelection(tableId, "2 selected");

    });

    it("buttons keeps selection when filtered out by filter panel", () => {

        cy.assertEventValue(eventId, null);
        cy.selectButton(buttonsId, "Africa");  // Click Africa
        cy.assertEventValue(eventId, "Africa");

        // Now filter with the filter panel for Asia
        cy.panelFilterSetSelection(filterPanelId, 0, ["Asia"]);

        // Check Africa is kept in selection of the table
        cy.assertEventValue(eventId, "Africa");
        cy.assertWidgetHeaderSelection(buttonsId, "Africa selected");

        // Now ctrl click Asia, should keep Africa selected.
        cy.selectButton(buttonsId, "Asia", {ctrlKey: true});  // Click Asia
        cy.assertEventValue(eventId, "Africa, Asia");
        cy.assertWidgetHeaderSelection(buttonsId, "2 selected");

    });

});