export {};

describe("Filters/Filter Panel Double Key", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/Filter Panel Double Key");
        cy.waitForQueryStatusForLargeDashboard();
        cy.waitForQueryCount(9);
    });

    it("Is any of", () => {
        // Is any of
        const eventId = "ww1";
        const tableId = "ww2";
        cy.assertEventValue(eventId, "{[Character].[double key].[double key].&[1.0],[Character].[double key].[All].[empty-character]}");
        cy.assertTableRowCount(tableId, 2);
        cy.assertTableCellContent(tableId, 0, 0, "1.0");
        cy.assertTableCellContent(tableId, 1, 0, "empty-character");
    });
    it("Is none of", () => {
        // Is none of
        const eventId = "ww5";
        const tableId = "ww6";
        cy.assertEventValue(eventId, "Except([Character].[double key].[double key], {[Character].[double key].[double key].&[1.0], [Character].[double key].[All].[empty-character]}, ALL)");
        cy.assertTableRowCount(tableId, 2);
        cy.assertTableCellContent(tableId, 0, 0, "2.0");
        cy.assertTableCellContent(tableId, 1, 0, "3.0");
    });
    it("Equals", () => {
        // Equals
        const eventId = "ww8";
        const tableId = "ww9";
        cy.assertEventValue(eventId, "Filter([Character].[double key].[double key].members as b,b.currentMember.key == 2)");
        cy.assertTableRowCount(tableId, 1);
        cy.assertTableCellContent(tableId, 0, 0, "2.0");
    });
    it("Not equals", () => {
        // Not equals
        const eventId = "ww11";
        const tableId = "ww12";
        cy.assertEventValue(eventId, "Filter([Character].[double key].[double key].members as b,b.currentMember.key != 2)");
        cy.assertTableRowCount(tableId, 3);
        cy.assertTableCellContent(tableId, 0, 0, "1.0");
        cy.assertTableCellContent(tableId, 1, 0, "3.0");
        cy.assertTableCellContent(tableId, 2, 0, "empty-character");
    });
    it("Between", () => {
        // Between
        const eventId = "ww14";
        const tableId = "ww15";
        cy.assertEventValue(eventId, "Filter([Character].[double key].[double key].members as b,b.currentMember.key >>= 1 AND b.currentMember.key <<= 2)");
        cy.assertTableRowCount(tableId, 2);
        cy.assertTableCellContent(tableId, 0, 0, "1.0");
        cy.assertTableCellContent(tableId, 1, 0, "2.0");
    });
    it("Greater or equal", () => {
        // Greater or equal
        const eventId = "ww17";
        const tableId = "ww18";
        cy.assertEventValue(eventId, "Filter([Character].[double key].[double key].members as b,b.currentMember.key >>= 2)");
        cy.assertTableRowCount(tableId, 2);
        cy.assertTableCellContent(tableId, 0, 0, "2.0");
        cy.assertTableCellContent(tableId, 1, 0, "3.0");
    });
    it("Greater than", () => {
        // Greater than
        const eventId = "ww20";
        const tableId = "ww21";
        cy.assertEventValue(eventId, "Filter([Character].[double key].[double key].members as b,b.currentMember.key >> 2)");
        cy.assertTableRowCount(tableId, 1);
        cy.assertTableCellContent(tableId, 0, 0, "3.0");
    });
    it("Smaller or equal", () => {
        // Smaller or equal
        const eventId = "ww23";
        const tableId = "ww24";
        cy.assertEventValue(eventId, "Filter([Character].[double key].[double key].members as b,b.currentMember.key <<= 2)");
        cy.assertTableRowCount(tableId, 2);
        cy.assertTableCellContent(tableId, 0, 0, "1.0");
        cy.assertTableCellContent(tableId, 1, 0, "2.0");
    });
    it("Smaller than", () => {
        // Smaller than
        const eventId = "ww26";
        const tableId = "ww27";
        cy.assertEventValue(eventId, "Filter([Character].[double key].[double key].members as b,b.currentMember.key << 2)");
        cy.assertTableRowCount(tableId, 1);
        cy.assertTableCellContent(tableId, 0, 0, "1.0");
    });

});