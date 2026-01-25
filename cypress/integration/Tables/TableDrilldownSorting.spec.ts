export {};

describe("Tables/TableDrilldownSorting", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/TableDrilldownSorting");
        cy.waitForQueryCount(2);
    });

    it("Sort then drilldown keeps sort", () => {

        cy.sortTable("ww0", 1);

        // Collapse all continents
        cy.clickTableCell("ww0", 3, 0);  // Europe drilldown

        cy.assertTableColumnsEqual("ww0", "ww1", 16, 2);

    })

});
