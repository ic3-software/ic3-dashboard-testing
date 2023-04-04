export {};

describe("Filters/Filter Panel String Property", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/Filter Panel String Property");
        cy.waitForQueryStatusForLargeDashboard();
        cy.waitForQueryCount(18);
    });

    it("even values correct", () => {
        cy.assertEventValue("ww1", "Filter([Character].[Character].[Character].members as b, b.currentMember.getProperty(\"character\",TYPED)==\"bar\")");
        cy.assertTableRowCount("ww14", 1);
        cy.assertTableCellContent("ww14", 0, 0, "bar");

        cy.assertEventValue("ww3", "Filter([Character].[Character].[Character].members as b, b.currentMember.getProperty(\"character\",TYPED)!=\"bar\")");
        cy.assertTableRowCount("ww19", 2);
        cy.assertTableCellContent("ww19", 0, 0, "foo");
        cy.assertTableCellContent("ww19", 1, 0, "empty-character");

        cy.assertEventValue("ww16", "{}");
        cy.assertWidgetNoData("ww17");

        cy.assertEventValue("ww25", "[Character].[Character].[Character]");
        cy.assertTableRowCount("ww26", 3);
        cy.assertTableCellContent("ww26", 0, 0, "foo");
        cy.assertTableCellContent("ww26", 1, 0, "bar");
        cy.assertTableCellContent("ww26", 2, 0, "empty-character");

        cy.assertEventValue("ww5", "Filter([Character].[Character].[Character].members as b, PatternMatchesContains(\"fo\", b.currentMember.getProperty(\"character\"), CASE_INSENSITIVE))");
        cy.assertTableRowCount("ww20", 1);
        cy.assertTableCellContent("ww20", 0, 0, "foo");

        cy.assertEventValue("ww7", "Filter([Character].[Character].[Character].members as b, NOT PatternMatchesContains(\"fo\", b.currentMember.getProperty(\"character\"), CASE_INSENSITIVE))");
        cy.assertTableRowCount("ww21", 2);
        cy.assertTableCellContent("ww21", 0, 0, "bar");
        cy.assertTableCellContent("ww21", 1, 0, "empty-character");

        cy.assertEventValue("ww9", "Filter([Character].[Character].[Character].members as b, PatternMatchesStartsWith(\"fo\", b.currentMember.getProperty(\"character\"), CASE_INSENSITIVE))");
        cy.assertTableRowCount("ww22", 1);
        cy.assertTableCellContent("ww22", 0, 0, "foo");

        cy.assertEventValue("ww11", "Filter([Character].[Character].[Character].members as b, PatternMatchesEndsWith(\"ar\", b.currentMember.getProperty(\"character\"), CASE_INSENSITIVE))");
        cy.assertTableRowCount("ww23", 1);
        cy.assertTableCellContent("ww23", 0, 0, "bar");

        cy.assertEventValue("ww13", `Filter([Character].[Character].[Character].members as b, PatternMatches(".+a.+", b.currentMember.getProperty("character")))`);
        cy.assertTableRowCount("ww24", 1);
        cy.assertTableCellContent("ww24", 0, 0, "bar");
    });

});