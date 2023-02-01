export {};


describe("Selection/Selection Non Unique Names", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Selection/Selection Non Unique Names");
        cy.waitForQueryCount(1);
    });

    it("ww0: check interconnection", () => {

        const table1 = "ww0";
        const event1 = "ww1";

        cy.clickTableCell(table1, 0, 0);  // 2018
        cy.assertEventValue(event1, "AA-L2");
        cy.assertEventMdx(event1, "[Level1].[Level1].[Level2].&[1]");
        cy.assertTableSingleRowSelected(table1, 0, 8);

        cy.clickTableCell(table1, 3, 0);  // 2018
        cy.assertEventValue(event1, "BB-L2");
        cy.assertEventMdx(event1, "[Level1].[Level1].[Level2].&[12]");
        cy.assertTableSingleRowSelected(table1, 3, 8);

    });


});
