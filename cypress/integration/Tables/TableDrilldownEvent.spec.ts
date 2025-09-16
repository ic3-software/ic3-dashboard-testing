export {};

describe("Tables/Table drilldown and on row click", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table drilldown and on row click");
        cy.waitForQueryCount(1);
    });

    it("on row click works", () => {

        cy.assertEventValue("ww2", null);
        cy.clickTableCell("ww0", 0, 0);
        cy.waitForQueryCount(2);
        cy.assertEventValue("ww2", "Africa");

        cy.clickTableCell("ww0", 2, 0);
        cy.waitForQueryCount(3);
        cy.assertEventValue("ww2", "South Africa");

    });

    it("click africa drilldown icon", () => {

        // Should not fire event when clicking the drilldown icon.

        cy.assertEventValue("ww2", null);
        cy.clickTableCellDrilldown("ww0", 0, 0);
        cy.waitForQueryCount(2);
        cy.assertEventValue("ww2", null);

    });

});
