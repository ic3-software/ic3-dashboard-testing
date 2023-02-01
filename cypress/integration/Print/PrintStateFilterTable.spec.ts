export {};

describe("Print/Print State Filter Table", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Print/Print State Filter Table");
        cy.waitForQueryCount(2);
    });

    it("ww0: Countries", () => {

        cy.selectButton("ww0", "Australia");
        cy.clickTableRow("ww2", 1);

        cy.assertButtonSelected("ww0", "Australia");
        cy.assertTableRowCount("ww2", 2);
        cy.assertTableSingleRowSelected("ww2", 1, 2);
        cy.assertEventValue("ww3", "Australia");
        cy.assertEventValue("ww4", "Sydney");

        cy.log("### window.reload ###")
        cy.selectButton("ww1", "print-in-browser");

        cy.waitForQueryStatus();
        cy.waitForPrintStatus();
        cy.waitForQueryCount(0);

        cy.assertButtonSelected("ww0", "Australia");
        cy.assertTableRowCount("ww2", 2);
        cy.assertTableSingleRowSelected("ww2", 1, 2);
        cy.assertEventValue("ww3", "Australia");
        cy.assertEventValue("ww4", "Sydney");

    });

});
