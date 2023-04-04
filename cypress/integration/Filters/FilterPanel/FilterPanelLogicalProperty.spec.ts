export {};

describe("Filters/Filter Panel Logical Property", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/Filter Panel Logical Property");
        cy.waitForQueryCount(8);
    });

    it("even values correct", () => {
        cy.assertEventValue("ww1", "Filter([Character].[Character].[Character].members as b, ISEMPTY(b.currentMember.getProperty(\"logical\",TYPED)) or b.currentMember.getProperty(\"logical\",TYPED)==true)");
        cy.assertTableRowCount("ww14", 2);
        cy.assertTableCellContent("ww14", 0, 0, "foo");
        cy.assertTableCellContent("ww14", 1, 0, "empty-character");
        cy.assertTableCellContent("ww14", 0, 2, "true");
        cy.assertTableCellContent("ww14", 1, 2, "");

        cy.assertEventValue("ww3", "Filter([Character].[Character].[Character].members as b, b.currentMember.getProperty(\"logical\",TYPED)!=false)");
        cy.assertTableRowCount("ww19", 2);
        cy.assertTableCellContent("ww19", 0, 0, "foo");
        cy.assertTableCellContent("ww19", 1, 0, "empty-character");
        cy.assertTableCellContent("ww19", 0, 2, "true");
        cy.assertTableCellContent("ww19", 1, 2, "");

        cy.assertEventValue("ww16", "Filter([Character].[Character].[Character].members as b, ISEMPTY(b.currentMember.getProperty(\"logical\", TYPED)))");
        cy.assertTableCellContent("ww17", 0, 0, "empty-character");

        cy.assertEventValue("ww25", "Filter([Character].[Character].[Character].members as b, NOT ISEMPTY(b.currentMember.getProperty(\"logical\", TYPED)))");
        cy.assertTableRowCount("ww26", 2);
        cy.assertTableCellContent("ww26", 0, 0, "foo");
        cy.assertTableCellContent("ww26", 1, 0, "bar");
        cy.assertTableCellContent("ww26", 0, 2, "true");
        cy.assertTableCellContent("ww26", 1, 2, "false");
    });

});