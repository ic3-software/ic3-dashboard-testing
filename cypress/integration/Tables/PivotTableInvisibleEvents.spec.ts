export {};

describe("Tables/PivotTableInvisibleEvents", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/PivotTableInvisibleEvents", true, false);
        cy.waitForQueryCount(2);
    });

    it("event fires", () => {

        cy.assertEventValue("ww1", "my table inside the dashboard area 3354150");
        cy.assertEventValue("ww3", "my table outside the dashboard area 1901");

    });

});
