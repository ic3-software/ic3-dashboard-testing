describe("Others/SaveRestoreState", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/ApplicationNotifications");
        cy.waitForQueryCount(3);
    });

    it("Basis", () => {

        {
            cy.selectButton("ww1", "Europe");
            cy.selectButton("ww2", "Q2");
            cy.assertTableRowCount("ww0", 9);
            cy.assertTableCellContent("ww0", 0, 1, "500.00");
        }

        {
            cy.selectButton("ww3", "Clear Filters");
            cy.assertTableCellContent("ww0", 0, 0, "Egypt");
        }

        {
            cy.selectButton("ww1", "Europe");
            cy.selectButton("ww2", "Q2");
            cy.assertTableRowCount("ww0", 9);
            cy.assertTableCellContent("ww0", 0, 1, "500.00");
        }

        {
            cy.selectButton("ww3", "Initialize Filters");
            cy.assertTableRowCount("ww0", 2);
            cy.assertTableCellContent("ww0", 0, 0, "Egypt");
            cy.assertTableCellContent("ww0", 1, 0, "South Africa");
        }

    });

})
