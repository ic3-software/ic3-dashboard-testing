export {};

describe("Tables/Table Column Visible", () => {


    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table Column Visible");
        cy.waitForQueryCount(2);

    })

    it("table", () => {

        cy.assertTableColCount("ww0", 5);
        cy.assertTableColCount("ww1", 5);

        cy.assertTableColumnTitle("ww0", 0, "Region");
        cy.assertTableColumnTitle("ww0", 1, "2019");
        cy.assertTableColumnTitle("ww0", 2, "2020");

        cy.assertTableColumnTitle("ww1", 0, "Region");
        cy.assertTableColumnTitle("ww1", 1, "2018");
        cy.assertTableColumnTitle("ww1", 2, "2020");

    });

});
