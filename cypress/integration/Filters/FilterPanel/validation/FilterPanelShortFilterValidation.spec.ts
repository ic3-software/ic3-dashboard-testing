export {};

describe("Filters/Filter Panel Short Filters Validation", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/Validation/Short Filters");
        cy.waitForQueryStatusForLargeDashboard();
        cy.waitForQueryCount(0);
    });

    it("event values correct", () => {

        cy.assertEventValue("ww1", "{{}}");
        cy.assertEventValue("ww3", "Filter([Character].[Character].[Character].members as b, b.currentMember.getProperty(\"numeric\",TYPED)==30)");
        cy.assertEventValue("ww5", "{{}}");
        cy.assertEventValue("ww7", "{{}}");

    });

});