export {};

describe("Filters/Filter Panel Datetime Property", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/Filter Panel Datetime Property");
        cy.waitForQueryStatusForLargeDashboard();
        cy.waitForQueryCount(9);
    });

    it("event values correct", () => {
        // Is any of
        cy.assertEventValue("ww1", "Filter([Character].[Character].[Character].members as b, b.currentMember.getProperty(\"datetime\",TYPED)==datetime(2016,2,3,2,0,20) or ISEMPTY(b.currentMember.getProperty(\"datetime\",TYPED)))");
        cy.assertTableRowCount("ww14", 2);
        cy.assertTableCellContent("ww14", 0, 1, "2016-02-03T02:00:20.000");
        cy.assertTableCellContent("ww14", 1, 1, "");
    });
    it("event values correct", () => {
        // Is none of
        cy.assertEventValue("ww3", "Filter([Character].[Character].[Character].members as b, b.currentMember.getProperty(\"datetime\",TYPED)!=datetime(2015,1,1,10,0,0))");
        cy.assertTableRowCount("ww19", 2);
        cy.assertTableCellContent("ww19", 0, 1, "2016-02-03T02:00:20.000");
        cy.assertTableCellContent("ww19", 1, 1, "");
    });
    it("event values correct", () => {
        // Equals
        cy.assertEventValue("ww16", "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"datetime\", TYPED) == datetime(2016,2,3,2,0,20))");
        cy.assertTableRowCount("ww17", 1);
        cy.assertTableCellContent("ww17", 0, 1, "2016-02-03T02:00:20.000");
    });
    it("event values correct", () => {
        // Not equals
        cy.assertEventValue("ww25", "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"datetime\", TYPED) != datetime(2016,2,3,2,0,20))");
        cy.assertTableRowCount("ww26", 2);
        cy.assertTableCellContent("ww26", 0, 1, "2015-01-01T10:00:00.000");
        cy.assertTableCellContent("ww26", 1, 1, "");
    });
    it("event values correct", () => {
        // Between
        cy.assertEventValue("ww5", "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"datetime\", TYPED) >>= datetime(2016,2,2,12,0,0) AND b.currentMember.getProperty(\"datetime\", TYPED) <<= datetime(2016,2,3,2,0,20))");
        cy.assertTableRowCount("ww20", 1);
        cy.assertTableCellContent("ww20", 0, 1, "2016-02-03T02:00:20.000");
    });
    it("event values correct", () => {
        // Greater or equal
        cy.assertEventValue("ww7", "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"datetime\", TYPED) >>= datetime(2016,2,3,2,0,20))");
        cy.assertTableRowCount("ww21", 1);
        cy.assertTableCellContent("ww21", 0, 1, "2016-02-03T02:00:20.000");
    });
    it("event values correct", () => {
        // Greater than
        cy.assertEventValue("ww9", "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"datetime\", TYPED) >> datetime(2016,2,3,2,0,20))");
        cy.assertWidgetNoData("ww22");
    });
    it("event values correct", () => {
        // Empty
        cy.assertEventValue("ww11", "Filter([Character].[Character].[Character].members as b, ISEMPTY(b.currentMember.getProperty(\"datetime\", TYPED)))");
        cy.assertTableRowCount("ww23", 1);
        cy.assertTableCellContent("ww23", 0, 0, "empty-character");
    });
    it("event values correct", () => {
        // Not empty
        cy.assertEventValue("ww13", `Filter([Character].[Character].[Character].members as b, NOT ISEMPTY(b.currentMember.getProperty("datetime", TYPED)))`);
        cy.assertTableRowCount("ww24", 2);
        cy.assertTableCellContent("ww24", 0, 1, "2015-01-01T10:00:00.000");
        cy.assertTableCellContent("ww24", 1, 1, "2016-02-03T02:00:20.000");
    });

});