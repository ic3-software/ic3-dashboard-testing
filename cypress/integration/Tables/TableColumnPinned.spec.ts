export {};

describe("Tables/Table Column Pinned", () => {


    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table Column Pinned");
        cy.waitForQueryCount(1);

    })

    it("table", () => {

        cy.assertTableColumnTitle("ww1", 0, "Count");
        cy.assertTableColumnTitle("ww1", 1, "Year");
        cy.assertTableColumnTitle("ww1", 2, "Amount");

    });

});
