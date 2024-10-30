export {};

describe("Filters/Filter Panel Day Level", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/Filter Panel Day Level");
        cy.waitForQueryStatusForLargeDashboard();
        cy.waitForQueryCount(9);
    });

    it("ww14", () => {
        cy.assertEventValue("ww1", "{[Time].[Time].[Day].&[2015-01-01T00:00:00.000],[Time].[Time].[Day].&[2015-01-02T00:00:00.000]}");
        cy.assertTableRowCount("ww14", 2);
        cy.assertTableCellContent("ww14", 0, 0, "1 Jan 2015");
        cy.assertTableCellContent("ww14", 1, 0, "2 Jan 2015");
    });
    it("ww19", () => {
        cy.assertEventValue("ww3", "Except([Time].[Time].[Day], {[Time].[Time].[Day].&[2015-01-01T00:00:00.000], [Time].[Time].[All].[empty-date].[empty-date].[empty-date].[empty-date]}, ALL)");
        cy.assertTableRowCount("ww19", 1);
        cy.assertTableCellContent("ww19", 0, 0, "2 Jan 2015");
    });
    it("ww20", () => {
        cy.assertEventValue("ww5", "Filter([Time].[Time].[Day].members as b,b.currentMember.key == datetime(2015,1,3,0,0,0))");
        cy.assertTableRowCount("ww20", 1);
        cy.assertTableCellContent("ww20", 0, 0, "3 Jan 2015");
    });
    it("ww21", () => {
        cy.assertEventValue("ww7", "Filter([Time].[Time].[Day].members as b,b.currentMember.key != datetime(2015,1,1,0,0,0))");
        cy.assertTableRowCount("ww21", 399);
        cy.assertTableCellContent("ww21", 0, 0, "2 Jan 2015");
    });
    it("ww22", () => {
        cy.assertEventValue("ww9", "Filter([Time].[Time].[Day].members as b,b.currentMember.key >>= datetime(2015,1,3,0,0,0) AND b.currentMember.key <<= datetime(2015,1,4,0,0,0))");
        cy.assertTableRowCount("ww22", 2);
        cy.assertTableCellContent("ww22", 0, 0, "3 Jan 2015");
        cy.assertTableCellContent("ww22", 1, 0, "4 Jan 2015");
    });
    it("ww23", () => {
        cy.assertEventValue("ww11", "Filter([Time].[Time].[Day].members as b,b.currentMember.key >>= datetime(2016,2,2,0,0,0))");
        cy.assertTableRowCount("ww23", 2);
        cy.assertTableCellContent("ww23", 0, 0, "2 Feb 2016");
        cy.assertTableCellContent("ww23", 1, 0, "3 Feb 2016");
    });
    it("ww24", () => {
        cy.assertEventValue("ww13", "Filter([Time].[Time].[Day].members as b,b.currentMember.key >> datetime(2016,2,2,0,0,0))");
        cy.assertTableRowCount("ww24", 1);
        cy.assertTableCellContent("ww24", 0, 0, "3 Feb 2016");
    });
    it("ww25", () => {
        cy.assertEventValue("ww16", "Filter([Time].[Time].[Day].members as b,b.currentMember.key <<= datetime(2015,1,2,0,0,0))");
        cy.assertTableRowCount("ww25", 2);
        cy.assertTableCellContent("ww25", 0, 0, "1 Jan 2015");
        cy.assertTableCellContent("ww25", 1, 0, "2 Jan 2015");
    });
    it("ww26", () => {
        cy.assertEventValue("ww18", "Filter([Time].[Time].[Day].members as b,b.currentMember.key << datetime(2015,1,2,0,0,0))");
        cy.assertTableRowCount("ww26", 1);
        cy.assertTableCellContent("ww26", 0, 0, "1 Jan 2015");
    });

});