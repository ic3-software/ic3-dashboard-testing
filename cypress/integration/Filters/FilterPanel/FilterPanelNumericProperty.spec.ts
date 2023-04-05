export {};

describe("Filters/Filter Panel Numeric Property", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/Filter Panel Numeric Property");
        cy.waitForQueryStatusForLargeDashboard();
        cy.waitForQueryCount(22);
    });

    it("event values correct", () => {

        // is any of
        cy.assertEventValue("ww28", 'Filter([Character].[Character].[Character].members as b, b.currentMember.getProperty("numeric",TYPED)==-10 or ISEMPTY(b.currentMember.getProperty("numeric",TYPED)))');
        cy.assertTableRowCount("ww29", 2);
        cy.assertTableCellContent("ww29", 0, 0, "bar");
        cy.assertTableCellContent("ww29", 0, 1, "-10");
        cy.assertTableCellContent("ww29", 1, 0, "empty-character");
        cy.assertTableCellContent("ww29", 1, 1, "");

        // is none of
        cy.assertEventValue("ww31", "Filter([Character].[Character].[Character].members as b, b.currentMember.getProperty(\"numeric\",TYPED)!=-10 and NOT ISEMPTY(b.currentMember.getProperty(\"numeric\",TYPED)))");
        cy.assertTableRowCount("ww32", 1);
        cy.assertTableCellContent("ww32", 0, 0, "foo");
        cy.assertTableCellContent("ww32", 0, 1, "10");

        cy.assertEventValue("ww1", "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"numeric\", TYPED) == -10)");
        cy.assertTableRowCount("ww14", 1);
        cy.assertTableCellContent("ww14", 0, 0, "bar");
        cy.assertTableCellContent("ww14", 0, 1, "-10");

        cy.assertEventValue("ww3", "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"numeric\", TYPED) != -10)");
        cy.assertTableRowCount("ww19", 2);
        cy.assertTableCellContent("ww19", 0, 0, "foo");
        cy.assertTableCellContent("ww19", 0, 1, "10");
        cy.assertTableCellContent("ww19", 1, 0, "empty-character");

        cy.assertEventValue("ww16", "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"numeric\", TYPED) >>= 0 AND b.currentMember.getProperty(\"numeric\", TYPED) <<= 20)");
        cy.assertTableRowCount("ww17", 1);
        cy.assertTableCellContent("ww17", 0, 0, "foo");
        cy.assertTableCellContent("ww17", 0, 1, "10");

        cy.assertEventValue("ww25", "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"numeric\", TYPED) >>= 10)");
        cy.assertTableRowCount("ww26", 1);
        cy.assertTableCellContent("ww26", 0, 0, "foo");

        cy.assertEventValue("ww5", "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"numeric\", TYPED) >> 10)");
        cy.assertWidgetNoData("ww20");

        cy.assertEventValue("ww7", "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"numeric\", TYPED) <<= -10)");
        cy.assertTableRowCount("ww21", 1);
        cy.assertTableCellContent("ww21", 0, 0, "bar");

        cy.assertEventValue("ww9", "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"numeric\", TYPED) << -10)");
        cy.assertWidgetNoData("ww22");

        cy.assertEventValue("ww11", "Filter([Character].[Character].[Character].members as b, ISEMPTY(b.currentMember.getProperty(\"numeric\", TYPED)))");
        cy.assertTableRowCount("ww23", 1);
        cy.assertTableCellContent("ww23", 0, 0, "empty-character");

        cy.assertEventValue("ww13", "Filter([Character].[Character].[Character].members as b, NOT ISEMPTY(b.currentMember.getProperty(\"numeric\", TYPED)))");
        cy.assertTableRowCount("ww24", 2);
        cy.assertTableCellContent("ww24", 0, 0, "foo");
        cy.assertTableCellContent("ww24", 1, 0, "bar");
    });

});