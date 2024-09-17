export {};

describe("Drilldown/User Select", () => {

    const table1 = "ww0";
    const table2 = "ww1";

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Drilldown/User Select");
        cy.waitForQueryCount(2);
    });

    it("row count", () => {
        cy.assertTableRowCount(table1, 1);
        cy.assertPivotTableRowCount(table2, 1)
    });

    it("table1 user select", () => {

        cy.clickTableCell(table1, 0, 0);
        cy.get("div[data-cy='drilldown-menu']").should("exist");
        cy.clickOutside();
        cy.clickTableCell(table1, 0, 0);
        cy.clickDrilldownMenu(table1, ["Product", 5, 2]);
        cy.assertTableCellContent(table1, 0, 0, "All Regions");
        cy.assertTableCellContent(table1, 1, 0, "Personal");
        cy.assertTableCellContent(table1, 2, 0, "Server");
        cy.assertTableCellContent(table1, 3, 0, "Gold");
        cy.assertTableCellContent(table1, 4, 0, "Platinum");
        cy.assertTableCellContent(table1, 5, 0, "Silver");

    });

    it("table1 user select", () => {

        cy.drilldownPivotTableLeftHeader(table2, 0, 0);
        cy.get("div[data-cy='drilldown-menu']").should("exist");
        cy.clickOutside();
        cy.drilldownPivotTableLeftHeader(table2, 0, 0);
        cy.clickDrilldownMenu(table2, ["Product", 5, 2]);
        cy.assertPivotTableLeftHeader(table2, 0, 0, "All Regions");
        cy.assertPivotTableLeftHeader(table2, 1, 0, "Personal");
        cy.assertPivotTableLeftHeader(table2, 2, 0, "Server");
        cy.assertPivotTableLeftHeader(table2, 3, 0, "Gold");
        cy.assertPivotTableLeftHeader(table2, 4, 0, "Platinum");
        cy.assertPivotTableLeftHeader(table2, 5, 0, "Silver");

    });

});
