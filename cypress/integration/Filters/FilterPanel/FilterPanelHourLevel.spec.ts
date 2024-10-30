export {};

describe("Filters/Filter Panel Hour Level", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/Filter Panel Hour Level");
        cy.waitForQueryStatusForLargeDashboard();
        cy.waitForQueryCount(9);
    });

    it("ww14", () => {
        // Is any of
        cy.assertEventValue("ww1", "{[Time].[Time].[Hour].&[2015-01-01T10:00:00.000],[Time].[Time].[Hour].&[2015-01-01T13:00:00.000]}");
        cy.assertTableRowCount("ww14", 2);
        cy.assertTableCellContent("ww14", 0, 0, "2015 Jan 1 10");
        cy.assertTableCellContent("ww14", 1, 0, "2015 Jan 1 13");
    });
    it("ww19", () => {
        // Is none of
        cy.assertEventValue("ww3", "Except([Time].[Time].[Hour], {[Time].[Time].[Hour].&[2015-01-01T10:00:00.000]}, ALL)");
        cy.assertTableRowCount("ww19", 5);
        cy.assertTableCellContent("ww19", 0, 0, "2015 Jan 1 11");
    });
    it("ww20", () => {
        // Equals
        cy.assertEventValue("ww5", "Filter([Time].[Time].[Hour].members as b,b.currentMember.key == datetime(2016,2,3,2,0,0))");
        cy.assertTableRowCount("ww20", 1);
        cy.assertTableCellContent("ww20", 0, 0, "2016 Feb 3 2");
    });
    it("ww21", () => {
        // Not Equals
        cy.assertEventValue("ww7", "Filter([Time].[Time].[Hour].members as b,b.currentMember.key != datetime(2015,1,1,12,0,0))");
        cy.assertTableRowCount("ww21", 5);
        cy.assertTableCellContent("ww21", 0, 0, "2015 Jan 1 10");
        cy.assertTableCellContent("ww21", 1, 0, "2015 Jan 1 11");
        cy.assertTableCellContent("ww21", 2, 0, "2015 Jan 1 13");
        cy.assertTableCellContent("ww21", 3, 0, "2015 Jan 1 14");
        cy.assertTableCellContent("ww21", 4, 0, "2015 Jan 1 15");
    });
    it("ww22", () => {
        // Between
        cy.assertEventValue("ww9", "Filter([Time].[Time].[Hour].members as b,b.currentMember.key >>= datetime(2016,1,1,12,0,0) AND b.currentMember.key <<= datetime(2016,1,1,13,0,0))");
        cy.assertTableRowCount("ww22", 2);
        cy.assertTableCellContent("ww22", 0, 0, "2016 Jan 1 12");
        cy.assertTableCellContent("ww22", 1, 0, "2016 Jan 1 13");
    });
    it("ww23", () => {
        // Greater or Equal
        cy.assertEventValue("ww11", "Filter([Time].[Time].[Hour].members as b,b.currentMember.key >>= datetime(2016,2,3,2,0,0))");
        cy.assertTableRowCount("ww23", 2);
        cy.assertTableCellContent("ww23", 0, 0, "2016 Feb 3 2");
        cy.assertTableCellContent("ww23", 1, 0, "2016 Feb 3 3");
    });
    it("ww24", () => {
        // Greater Than
        cy.assertEventValue("ww13", "Filter([Time].[Time].[Hour].members as b,b.currentMember.key >> datetime(2016,2,3,2,0,0))");
        cy.assertTableRowCount("ww24", 1);
        cy.assertTableCellContent("ww24", 0, 0, "2016 Feb 3 3");
    });
    it("ww25", () => {
        // Smaller or Equal
        cy.assertEventValue("ww16", "Filter([Time].[Time].[Hour].members as b,b.currentMember.key <<= datetime(2015,1,1,11,0,0))");
        cy.assertTableRowCount("ww25", 2);
        cy.assertTableCellContent("ww25", 0, 0, "2015 Jan 1 10");
        cy.assertTableCellContent("ww25", 1, 0, "2015 Jan 1 11");
    });
    it("ww26", () => {
        // Smaller Than
        cy.assertEventValue("ww18", "Filter([Time].[Time].[Hour].members as b,b.currentMember.key << datetime(2015,1,1,11,0,0))");
        cy.assertTableRowCount("ww26", 1);
        cy.assertTableCellContent("ww26", 0, 0, "2015 Jan 1 10");
    });

});