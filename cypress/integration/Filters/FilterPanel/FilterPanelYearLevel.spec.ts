export {};

describe("Filters/Filter Panel Year Level", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/Filter Panel Year Level");
        cy.waitForQueryStatusForLargeDashboard();
        cy.waitForQueryCount(9);
    });

    it("even values correct", () => {
        cy.assertEventValue("ww1", "{[Time].[Time].[Year].&[2016-01-01T00:00:00.000]}");
        cy.assertTableRowCount("ww14", 1);
        cy.assertTableCellContent("ww14", 0, 0, "2016");

        cy.assertEventValue("ww3", "Except([Time].[Time].[Year], {[Time].[Time].[All].[empty-date]}, ALL)");
        cy.assertTableRowCount("ww19", 2);
        cy.assertTableCellContent("ww19", 0, 0, "2015");
        cy.assertTableCellContent("ww19", 1, 0, "2016");

        cy.assertEventValue("ww5", "[Time].[Time].[Year].&[2016-01-01T00:00:00.000]");
        cy.assertTableRowCount("ww20", 1);
        cy.assertTableCellContent("ww20", 0, 0, "2016");

        cy.assertEventValue("ww7", "Except([Time].[Time].[Year], {[Time].[Time].[All].[empty-date]}, ALL)");
        cy.assertTableRowCount("ww21", 2);
        cy.assertTableCellContent("ww21", 0, 0, "2015");
        cy.assertTableCellContent("ww21", 1, 0, "2016");

        cy.assertEventValue("ww9", "[Time].[Time].[Year].&[2015-01-01T00:00:00.000]:[Time].[Time].[Year].&[2016-01-01T00:00:00.000]");
        cy.assertTableRowCount("ww22", 2);
        cy.assertTableCellContent("ww22", 0, 0, "2015");
        cy.assertTableCellContent("ww22", 1, 0, "2016");

        cy.assertEventValue("ww11", "[Time].[Time].[Year].&[2016-01-01T00:00:00.000]:NULL");
        cy.assertTableRowCount("ww23", 2);
        cy.assertTableCellContent("ww23", 0, 0, "2016");
        cy.assertTableCellContent("ww23", 1, 0, "empty-date");

        cy.assertEventValue("ww13", "[Time].[Time].[Year].&[2015-01-01T00:00:00.000].nextMember:NULL");
        cy.assertTableRowCount("ww24", 2);
        cy.assertTableCellContent("ww24", 0, 0, "2016");
        cy.assertTableCellContent("ww24", 1, 0, "empty-date");

        cy.assertEventValue("ww16", "NULL:[Time].[Time].[Year].&[2016-01-01T00:00:00.000]");
        cy.assertTableRowCount("ww25", 2);
        cy.assertTableCellContent("ww25", 0, 0, "2015");
        cy.assertTableCellContent("ww25", 1, 0, "2016");

        cy.assertEventValue("ww18", "NULL:[Time].[Time].[Year].&[2015-01-01T00:00:00.000].prevMember");
        cy.assertWidgetNoData("ww26");
    });

});