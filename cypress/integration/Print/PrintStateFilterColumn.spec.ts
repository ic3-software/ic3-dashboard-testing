export {};

describe("Print/Print State Filter Column", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Print/Print State Filter Column");
        cy.waitForQueryCount(2);
    });

    it("ww0: Countries", () => {

        cy.selectButton("ww0", "Australia");
        cy.columnClickColumn("ww2", 2);
        cy.clickOutside() /* prevent hover color effect */;

        cy.assertButtonSelected("ww0", "Australia");
        cy.columnAssertColumnCount("ww2", 2);
        cy.columnAssertSingleColumnSelected("ww2", 2, 2);
        cy.assertEventValue("ww3", "Australia");
        cy.assertEventValue("ww4", "Sydney");

        cy.log("### window.reload ###")
        cy.selectButton("ww1", "print-in-browser");

        cy.waitForQueryStatus();
        cy.waitForPrintStatus();
        cy.waitForQueryCount(0);

        cy.assertButtonSelected("ww0", "Australia");
        cy.columnAssertColumnCount("ww2", 2);
        cy.columnAssertSingleColumnSelected("ww2", 2, 2);
        cy.assertEventValue("ww3", "Australia");
        cy.assertEventValue("ww4", "Sydney");

    });

});
