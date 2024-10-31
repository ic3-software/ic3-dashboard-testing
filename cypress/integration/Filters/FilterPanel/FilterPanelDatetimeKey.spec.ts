export {};

describe("Filters/Filter Panel Datetime Key", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/Filter Panel Datetime Key");
        cy.waitForQueryStatusForLargeDashboard();
        cy.waitForQueryCount(9);
    });

    it("Is any of", () => {
        // Is any of
        const eventId = "ww1";
        const tableId = "ww2";
        cy.assertEventValue(eventId, "{[Character].[datetime key].[datetime key].&[2015-01-01T10:00:00.000],[Character].[datetime key].[All].[empty-character]}");
        cy.assertTableRowCount(tableId, 2);
        cy.assertTableCellContent(tableId, 0, 0, "2015-01-01T10:00:00.000");
        cy.assertTableCellContent(tableId, 1, 0, "empty-character");
    });
    it("Is none of", () => {
        // Is none of
        const eventId = "ww5";
        const tableId = "ww6";
        cy.assertEventValue(eventId, "Except([Character].[datetime key].[datetime key], {[Character].[datetime key].[datetime key].&[2015-01-01T10:00:00.000],[Character].[datetime key].[All].[empty-character]}, ALL)");
        cy.assertTableRowCount(tableId, 1);
        cy.assertTableCellContent(tableId, 0, 0, "2016-02-03T02:00:20.000");
    });
    it("Equals", () => {
        // Equals
        const eventId = "ww8";
        const tableId = "ww9";
        cy.assertEventValue(eventId, "Filter([Character].[datetime key].[datetime key].members as b,b.currentMember.key == datetime(2015,1,1,10,0,0))");
        cy.assertTableRowCount(tableId, 1);
        cy.assertTableCellContent(tableId, 0, 0, "2015-01-01T10:00:00.000");
    });
    it("Not equals", () => {
        // Not equals
        const eventId = "ww11";
        const tableId = "ww12";
        cy.assertEventValue(eventId, "Filter([Character].[datetime key].[datetime key].members as b,b.currentMember.key != datetime(2015,1,1,10,0,0))");
        cy.assertTableRowCount(tableId, 2);
        cy.assertTableCellContent(tableId, 0, 0, "2016-02-03T02:00:20.000");
        cy.assertTableCellContent(tableId, 1, 0, "empty-character");
    });
    it("Between", () => {
        // Between
        const eventId = "ww14";
        const tableId = "ww15";
        cy.assertEventValue(eventId, "Filter([Character].[datetime key].[datetime key].members as b,b.currentMember.key >>= datetime(2016,2,2,2,0,20) AND b.currentMember.key <<= datetime(2016,2,3,2,0,20))");
        cy.assertTableRowCount(tableId, 1);
        cy.assertTableCellContent(tableId, 0, 0, "2016-02-03T02:00:20.000");
    });
    it("Greater or equal", () => {
        // Greater or equal
        const eventId = "ww17";
        const tableId = "ww18";
        cy.assertEventValue(eventId, "Filter([Character].[datetime key].[datetime key].members as b,b.currentMember.key >>= datetime(2015,1,1,10,0,0))");
        cy.assertTableRowCount(tableId, 2);
        cy.assertTableCellContent(tableId, 0, 0, "2015-01-01T10:00:00.000");
        cy.assertTableCellContent(tableId, 1, 0, "2016-02-03T02:00:20.000");
    });
    it("Greater than", () => {
        // Greater than
        const eventId = "ww20";
        const tableId = "ww21";
        cy.assertEventValue(eventId, "Filter([Character].[datetime key].[datetime key].members as b,b.currentMember.key >> datetime(2015,1,1,10,0,0))");
        cy.assertTableRowCount(tableId, 1);
        cy.assertTableCellContent(tableId, 0, 0, "2016-02-03T02:00:20.000");
    });
    it("Smaller or equal", () => {
        // Smaller or equal
        const eventId = "ww23";
        const tableId = "ww24";
        cy.assertEventValue(eventId, "Filter([Character].[datetime key].[datetime key].members as b,b.currentMember.key <<= datetime(2016,2,3,2,0,20))");
        cy.assertTableRowCount(tableId, 2);
        cy.assertTableCellContent(tableId, 0, 0, "2015-01-01T10:00:00.000");
        cy.assertTableCellContent(tableId, 1, 0, "2016-02-03T02:00:20.000");
    });
    it("Smaller than", () => {
        // Smaller than
        const eventId = "ww26";
        const tableId = "ww27";
        cy.assertEventValue(eventId, "Filter([Character].[datetime key].[datetime key].members as b,b.currentMember.key << datetime(2016,2,3,2,0,20))");
        cy.assertTableRowCount(tableId, 1);
        cy.assertTableCellContent(tableId, 0, 0, "2015-01-01T10:00:00.000");
    });

});