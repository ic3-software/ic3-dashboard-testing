export {};

describe("Print/Print State Filter Histogram", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Print/Print State Filter Histogram");
        cy.waitForQueryCount(2);
    });

    it("ww0: Countries", () => {

        cy.selectButton("ww0", "Australia");
        cy.waitForQueryCount(3);
        cy.histogramClickColumn("ww2", 1);
        cy.clickOutside() /* prevent hover color effect */;

        cy.assertButtonSelected("ww0", "Australia");
        cy.histogramAssertColumnCount("ww2", 10 /* generated */);
        cy.histogramAssertSingleColumnSelected("ww2", 1, 10 /* generated */);
        cy.assertEventValue("ww3", "Australia");
        cy.assertEventValue("ww4", "Sydney");

        cy.log("### window.reload ###")
        cy.selectButton("ww1", "print-in-browser");

        cy.waitForQueryStatus();
        cy.waitForPrintStatus();
        cy.waitForQueryCount(0);

        cy.assertButtonSelected("ww0", "Australia");
        cy.histogramAssertColumnCount("ww2", 10 /* generated */);
        cy.histogramAssertSingleColumnSelected("ww2", 1, 10 /* generated */);
        cy.assertEventValue("ww3", "Australia");
        cy.assertEventValue("ww4", "Sydney");

    });

});
