import {assertTableColumnWidth, reorderTableColumn, resizeTableColumnWidth} from "./TableUtils";

/**
 * The table (ww0) query depends on the event published by the buttons (ww2). Changing the selection re-runs
 * the table query: the user's column state (resizing, ordering) must survive that query update.
 */
describe("Tables/Table state kept on query update", () => {

    const dashboard = "shared:/Bugs/table dashboard columns query update";
    const widgetId = "ww0";

    // Initial (saved) width of the 'Name' column: 656px minus the header padding (jQuery width).
    const nameWidth = 635;

    function clickNorthAmerica() {
        cy.selectButton("ww2", "North America", {force: true});
        cy.assertButtonSelected("ww2", "North America");
        cy.waitForQueryCount(4);
    }

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(3);
    });

    it("Resized column keeps its width when the query changes", () => {

        assertTableColumnWidth(cy, widgetId, "Name", nameWidth);

        resizeTableColumnWidth(cy, widgetId, "Name", 50);
        assertTableColumnWidth(cy, widgetId, "Name", nameWidth + 50);
        cy.wait(500);  // Wait for debounce

        clickNorthAmerica();

        assertTableColumnWidth(cy, widgetId, "Name", nameWidth + 50);

    });

    it("Reordered column keeps its position when the query changes", () => {

        cy.assertTableColumnTitle(widgetId, 0, "Amount_color");
        cy.assertTableColumnTitle(widgetId, 4, "Name");

        reorderTableColumn(cy, widgetId, "Name", "Amount_color");
        cy.assertTableColumnTitle(widgetId, 0, "Name");
        cy.assertTableColumnTitle(widgetId, 1, "Amount_color");
        cy.wait(500);  // Wait for debounce

        clickNorthAmerica();

        cy.assertTableColumnTitle(widgetId, 0, "Name");
        cy.assertTableColumnTitle(widgetId, 1, "Amount_color");

    });

});
