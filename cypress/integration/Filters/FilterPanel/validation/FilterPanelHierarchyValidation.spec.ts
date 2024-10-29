export {};

describe("Filters/Filter Panel Hierarchy Validation", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/Validation/Hierarchical");
        cy.waitForQueryStatusForLargeDashboard();
        cy.waitForQueryCount(0);
    });

    it("event values correct", () => {

        const event1 = "ww2";
        cy.assertEventValue(event1, "{{},[parent child].[pc].[Level$3].&[5]}");

    });

});