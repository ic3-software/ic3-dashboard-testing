import {assertTableColumnWidth, resizeTableColumnWidth} from "../Tables/TableUtils";

describe("Local State/Table", () => {

    const dashboard = "Local State/Table";
    const header = "Table [Geography].[Geography].[Continent].&[AS]";
    const wid = "ww0";

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);
        cy.clearAllLocalStorage();
    });

    it("Save/Restore SelectionState", () => {

        // First create the state
        cy.clickTableCell(wid, 1, 0);

        // Assert the state
        cy.assertWidgetHeader(wid, header);

        // Then refresh page
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);

        // Assert state is kept
        cy.assertWidgetHeader(wid, header);

    });

    it("Save/Restore Table header options", () => {

        cy.assertTableCellContent(wid, 5, 1, "51")
        cy.sortTable(wid, 1);
        cy.assertTableCellContent(wid, 0, 1, "51")

        resizeTableColumnWidth(cy, wid, "Continent", 55);
        assertTableColumnWidth(cy, wid, "Continent", 300 + 35);  //why 35 ?

        // Then refresh page
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);
        cy.assertTableCellContent(wid, 0, 1, "51");
        assertTableColumnWidth(cy, wid, "Continent", 300 + 35);


    });

});