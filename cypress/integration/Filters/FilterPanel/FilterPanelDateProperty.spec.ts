export {};

describe("Filters/Filter Panel Date Property", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/Filter Panel Date Property");
        cy.waitForQueryStatusForLargeDashboard();
        cy.waitForQueryCount(9);
    });

    it("event values correct ww14", () => {
        cy.assertTableRowCount("ww14", 2);
        cy.assertEventValue("ww1", "Filter([Character].[Character].[Character].members as b, b.currentMember.getProperty(\"date\",TYPED)==datetime(2017,1,10,0,0,0) or ISEMPTY(b.currentMember.getProperty(\"date\",TYPED)))");
        cy.assertTableCellContent("ww14", 0, 2, "2017-01-10");
        cy.assertTableCellContent("ww14", 1, 2, "");
    });
    it("event values correct ww19", () => {
        cy.assertTableRowCount("ww19", 2);
        cy.assertEventValue("ww3", "Filter([Character].[Character].[Character].members as b, NOT ISEMPTY(b.currentMember.getProperty(\"date\",TYPED)))");
        cy.assertTableCellContent("ww19", 0, 2, "2015-01-01");
        cy.assertTableCellContent("ww19", 1, 2, "2017-01-10");
    });
    it("event values correct ww17", () => {
        cy.assertWidgetNoData("ww17");
        cy.assertEventValue("ww16", "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"date\", TYPED) == datetime(2016,1,1,0,0,0))");
    });
    it("event values correct ww26", () => {
        cy.assertTableRowCount("ww26", 2);
        cy.assertEventValue("ww25", "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"date\", TYPED) != datetime(2017,1,10,0,0,0))");
        cy.assertTableCellContent("ww26", 0, 2, "2015-01-01");
        cy.assertTableCellContent("ww26", 1, 2, "");

    });
    it("event values correct ww20", () => {
        cy.assertTableRowCount("ww20", 1);
        cy.assertEventValue("ww5", "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"date\", TYPED) >>= datetime(2017,1,4,0,0,0) AND b.currentMember.getProperty(\"date\", TYPED) <<= datetime(2017,1,10,0,0,0))");
        cy.assertTableCellContent("ww20", 0, 2, "2017-01-10");

    });
    it("event values correct ww21", () => {
        cy.assertEventValue("ww7", "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"date\", TYPED) >>= datetime(2017,1,10,0,0,0))");
        cy.assertTableCellContent("ww21", 0, 2, "2017-01-10");

    });
    it("event values correct ww22", () => {
        cy.assertTableRowCount("ww22", 1);
        cy.assertEventValue("ww9", "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"date\", TYPED) >> datetime(2015,1,1,0,0,0))");
        cy.assertTableCellContent("ww22", 0, 2, "2017-01-10");

    });
    it("event values correct ww23", () => {
        cy.assertTableRowCount("ww23", 1);
        cy.assertEventValue("ww11", "Filter([Character].[Character].[Character].members as b, ISEMPTY(b.currentMember.getProperty(\"date\", TYPED)))");
        cy.assertTableCellContent("ww23", 0, 0, "empty-character");
        cy.assertTableCellContent("ww23", 0, 2, "");

    });
    it("event values correct ww24", () => {
        cy.assertTableRowCount("ww24", 2);
        cy.assertEventValue("ww13", `Filter([Character].[Character].[Character].members as b, NOT ISEMPTY(b.currentMember.getProperty("date", TYPED)))`);
        cy.assertTableCellContent("ww24", 0, 2, "2015-01-01");
        cy.assertTableCellContent("ww24", 1, 2, "2017-01-10");
    });

});