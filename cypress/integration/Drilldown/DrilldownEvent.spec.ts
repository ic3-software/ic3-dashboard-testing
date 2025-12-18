export {};

describe("Drilldown/drilldownEvent", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Drilldown/drilldownEvent");
        cy.waitForQueryCount(1);
    });

    it("TABLE: drill path & back button works with event", () => {

        const table = "ww0";
        const event = "ww1";

        cy.assertEventValue(event, null);

        cy.clickTableRow(table, 0);  // Click 2018
        cy.assertEventValue(event, "([Time].[Time].[Year].&[2018-01-01])");

        cy.clickTableRow(table, 1);  // Click 2018 Q2
        cy.assertEventValue(event, "([Time].[Time].[Year].&[2018-01-01],[Time].[Time].[Quarter].&[2018-04-01])");

        cy.clickTableRow(table, 1);  // Click 2018 May
        cy.assertEventValue(event, "([Time].[Time].[Year].&[2018-01-01],[Time].[Time].[Quarter].&[2018-04-01],[Time].[Time].[Month].&[2018-05-01])");

        cy.clickTableRow(table, 0);  // Click 2018 Apr
        cy.assertEventValue(event, "([Time].[Time].[Year].&[2018-01-01],[Time].[Time].[Quarter].&[2018-04-01],[Time].[Time].[Month].&[2018-04-01])");

        cy.clickTableRow(table, 2);  // Click 2018 Jun
        cy.assertEventValue(event, "([Time].[Time].[Year].&[2018-01-01],[Time].[Time].[Quarter].&[2018-04-01],[Time].[Time].[Month].&[2018-06-01])");

        cy.clickTableRow(table, 1);  // Click 2018 May
        cy.assertEventValue(event, "([Time].[Time].[Year].&[2018-01-01],[Time].[Time].[Quarter].&[2018-04-01],[Time].[Time].[Month].&[2018-05-01])");

        cy.clickDrilldownBack(table);
        cy.assertEventValue(event, "([Time].[Time].[Year].&[2018-01-01])");

        cy.clickDrilldownBack(table);
        cy.assertEventValue(event, null);

    });

});
