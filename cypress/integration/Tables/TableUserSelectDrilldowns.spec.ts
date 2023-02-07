export {};

describe("Tables/Table User Select Drilldown", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table user select drilldown");
        cy.waitForQueryCount(4);
    });

    it("user select drilldown - with filter", () => {

        const table = "ww0";
        cy.clickTableRow(table, 1);
        cy.clickDrilldownMenu(table, ["Product", 5, 2]);
        cy.assertTableColumnsEqual(table, "ww1", 5, 2)

    });

    it("user select drilldown - without filter", () => {

        const table = "ww2";
        cy.clickTableRow(table, 1);
        cy.clickDrilldownMenu(table, ["Product", 5, 2]);
        cy.assertTableColumnsEqual(table, "ww3", 5, 2)

    });

});
