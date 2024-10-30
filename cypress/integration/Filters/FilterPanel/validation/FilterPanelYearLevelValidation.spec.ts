export {};

describe("Filters/Filter Panel Year Validation", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/Validation/Year Level");
        cy.waitForQueryStatusForLargeDashboard();
        cy.waitForQueryCount(4);
    });

    it("event values correct", () => {

        const event1 = "ww5";
        const table1 = "ww20";
        cy.assertEventValue(event1, "{}");
        cy.assertWidgetNoData(table1);  // Shows NO DATA because filter is ill-defined.

        const event2 = "ww9";
        const table2 = "ww22";
        cy.assertEventValue(event2, "{}");
        cy.assertWidgetNoData(table2);  // Shows NO DATA because filter is ill-defined.

        const event3 = "ww1";
        const table3 = "ww2";
        cy.assertEventValue(event3, "{}");
        cy.assertWidgetNoData(table3);  // Shows NO DATA because filter is ill-defined.

        const event4 = "ww6";
        const table4 = "ww7";
        cy.assertEventValue(event4, "{}");
        cy.assertWidgetNoData(table4);  // Shows NO DATA because filter is ill-defined.

    });

});