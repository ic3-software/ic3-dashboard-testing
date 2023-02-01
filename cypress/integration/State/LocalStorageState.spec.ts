describe("Others/Table State", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("State/Table State");
        cy.waitForQueryCount(3);
    });

    it("Save/Restore State", () => {

        const queryCount = 3;

        const table1 = "ww0";
        const table2 = "ww1";

        cy.assertTableDomColCount(table1, 6);
        cy.assertTableDomColCount(table2, 6);

        cy.sortTable(table1, 2);
        cy.clickTableColumnMenuIcon(table1, 4, "Pin to left");
        cy.clickTableColumnMenuIcon(table1, 5, "Hide");
        cy.sortTable(table2, 2);
        cy.clickTableColumnMenuIcon(table2, 4, "Pin to left");
        cy.clickTableColumnMenuIcon(table2, 5, "Hide");

        cy.assertTableValue(table1, 0, 1, 'Middle east');
        cy.assertTableValue(table2, 0, 1, 'Middle east');
        cy.assertTableDomColCount(table1, 5);
        cy.assertTableDomColCount(table2, 5);

        cy.waitForQueryCount(queryCount);

        cy.reload();
        cy.waitForQueryCount(queryCount);

        cy.assertTableValue(table1, 0, 1, 'Middle east');
        cy.assertTableValue(table2, 0, 0, 'Africa');
        cy.assertTableDomColCount(table1, 5);
        cy.assertTableDomColCount(table2, 6);


    });

})
