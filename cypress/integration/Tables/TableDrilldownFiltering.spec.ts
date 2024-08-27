export {};

describe("Tables/Table Drilldown Filtering", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table Drilldown Filtering");
        cy.waitForQueryCount(2);
    });

    it("Expanding / collapsing with filter", () => {

        // Collapse all continents
        cy.clickTableCell("ww0", 1, 0);
        cy.clickTableCell("ww0", 2, 0);
        cy.clickTableCell("ww0", 3, 0);
        cy.clickTableCell("ww0", 0, 1);

        cy.assertTableCellContent("ww0", 1, 0, "Africa");
        cy.assertTableCellContent("ww0", 2, 0, "Asia");
        cy.assertTableCellContent("ww0", 3, 0, "Europe");
        cy.assertTableCellContent("ww0", 4, 0, "North America");

        // Now perform selections to filter the table
        cy.assertTableCellContent("ww0", 0, 1, "€9,014,850");
        cy.selectButton("ww1", "Jan");
        cy.assertTableCellContent("ww0", 0, 1, "€398,500");
        cy.selectButton("ww1", "Feb");
        cy.assertTableCellContent("ww0", 0, 1, "€190,350");
        cy.selectButton("ww1", "Mar");
        cy.assertTableCellContent("ww0", 0, 1, "€794,100");

    })

});
