export {};

describe("Tables/Table Initial Selection", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table Initial Selection");
        cy.waitForQueryCount(2);
    });

    it("row count", () => {

        const table1 = "ww0";
        const table2 = "ww1";
        cy.assertTableRowCount(table1, 5);
        cy.assertTableRowCount(table2, 2);

    })

    it("table1 single selection and deselection", () => {

        const table = "ww0";
        const tableEvent = "ww3";
        cy.assertEventValue(tableEvent, "2020, 2022");
        cy.assertEventMdx(tableEvent, "{[Time].[Time].[Year].&[2020-01-01],[Time].[Time].[Year].&[2022-01-01]}");

    })

    it("table2 single selection and deselection", () => {

        const table = "ww1";
        const tableEvent = "ww4";
        cy.assertEventValue(tableEvent, "#Sales");
        cy.assertEventMdx(tableEvent, "[Measures].[#Sales]");

    })

});
