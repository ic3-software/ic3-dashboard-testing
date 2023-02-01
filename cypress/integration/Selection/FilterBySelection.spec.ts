export {};

describe("Selection/Filter By and Selection", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Selection/Filter By and Selection");
        cy.waitForQueryCount(2);
    });

    it("ww0: Column with single selection", () => {

        const table0 = "ww0";
        const table1 = "ww1";
        const event0 = "ww2";
        const event1 = "ww3";

        cy.clickTableCell(table0, 0, 0);
        cy.assertEventValue(event0, "Africa");

        cy.clickTableCell(table1, 2, 0);
        cy.assertEventValue(event1, "Pretoria");
        cy.assertEventMdx(event1, "[Geography].[Region].[City].&[Pretoria]");
        cy.assertTableSingleRowSelected(table1, 2, 3);

        // Now click another Region in table0 -> table1 should be empty in selection
        cy.clickTableCell(table0, 1, 0);
        cy.assertEventValue(event0, "Asia & Pacific");
        cy.assertEventValue(event1, "Pretoria");
        cy.assertEventMdx(event1, "[Geography].[Region].[City].&[Pretoria]");
        for (let i = 0; i < 4; i++) {
            cy.assertTableRowNotSelected(table1, i);
        }

        // Now click on Africa again in table0 -> Pretoria should render selected
        cy.clickTableCell(table0, 0, 0);
        cy.assertEventValue(event0, "Africa");
        cy.assertTableSingleRowSelected(table1, 2, 3);


    });

});
