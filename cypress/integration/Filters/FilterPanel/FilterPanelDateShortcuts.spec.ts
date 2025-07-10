export {};

describe("Filters/Filter Panel Date Shortcuts", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/Filter Panel Date Shortcuts");
        cy.waitForQueryStatusForLargeDashboard();
        cy.waitForQueryCount(0);
    });

    it("Filter Panel - date property - single", () => {
        cy.assertEventValue("ww1", "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"date\", TYPED) == datetime(2016,1,10,0,0,0))");
        cy.assertFilterPanelValue("ww0", "Last year")
    });

    it("Filter Panel - date property - range", () => {
        cy.assertEventValue("ww3", "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"date\", TYPED) >>= datetime(2016,12,1,0,0,0) AND b.currentMember.getProperty(\"date\", TYPED) <<= datetime(2016,12,31,0,0,0))");
        cy.assertFilterPanelValue("ww2", "Last month")
    });

    it("Enkel Filter Paneel", () => {
        cy.assertEventValue("ww5", "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"datetime\", TYPED) >>= datetime(2016,1,3,0,0,0) AND b.currentMember.getProperty(\"datetime\", TYPED) <<= datetime(2016,2,3,0,0,0))");
        cy.assertFilterPanelBetween("ww4", "Last month", "Current date")
    });

    it("Filter Panel - datetime property - single", () => {
        cy.assertEventValue("ww7", "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"datetime\", TYPED) >>= datetime(2016,1,27,0,0,0))");
        cy.assertFilterPanelValue("ww6", "Last week")
    });

    it("Filter Panel - datetime property - range", () => {
        cy.assertEventValue("ww9", "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"datetime\", TYPED) >>= datetime(2016,1,3,0,0,0) AND b.currentMember.getProperty(\"datetime\", TYPED) <<= datetime(2016,2,2,0,0,0))");
        cy.assertFilterPanelBetween("ww8", "Last month", "Previous date")
    });

});