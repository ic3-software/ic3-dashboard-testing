export {};

describe("Tables/Table User Select Drilldown", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/table totals rendering");
        cy.waitForQueryCount(2);
    });

    it("table", () => {

        const table = "ww0";

        cy.assertTableCellBold(table, 0, 1)
        cy.assertTableCellBold(table, 1, 1)
        cy.assertTableCellBold(table, 2, 1)
        cy.assertTableCellBold(table, 3, 1)
        cy.assertTableCellBold(table, 4, 1)
        cy.assertTableCellBold(table, 3, 0)
        cy.assertTableCellBold(table, 3, 1)
        cy.assertTableCellBold(table, 3, 2)

        cy.assertTableHeaderBold(table, "Business")

    });

    it("pivot table", () => {

        const table = "ww1";

        cy.assertPivotTableCellBold(table, 0, 1)
        cy.assertPivotTableCellBold(table, 1, 1)
        cy.assertPivotTableCellBold(table, 2, 1)
        cy.assertPivotTableCellBold(table, 3, 1)
        cy.assertPivotTableCellBold(table, 4, 1)

        cy.assertPivotTableCellBold(table, 3, 0)
        cy.assertPivotTableCellBold(table, 3, 1)

        cy.assertPivotTableTopHeaderBold(table, 0, 1)
        cy.assertPivotTableLeftHeaderBold(table, 3, 0)

    });

});
