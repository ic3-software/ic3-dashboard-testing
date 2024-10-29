export {};

describe("Filters/Filter Panel Single Filter Validation", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/Validation/Single Filter Panel");
        cy.waitForQueryStatusForLargeDashboard();
        cy.waitForQueryCount(1);
    });

    it("event values correct", () => {

        const event1 = "ww1";
        const table1 = "ww2";
        cy.assertEventValue(event1, "{{}}");
        cy.assertWidgetNoData(table1);

    });

});