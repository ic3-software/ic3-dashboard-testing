export {};

describe("Tables/Table Only Rows Mdx", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table Only Rows Mdx");
        cy.waitForQueryCount(1);
    });

    it("base", () => {

        cy.assertTableRowCount("ww0", 5)

    })


});
