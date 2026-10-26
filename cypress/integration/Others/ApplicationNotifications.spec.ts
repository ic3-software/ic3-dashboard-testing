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

    // M-8 : with a null tag set, a CSV row shorter than the header ("Initialize Filters,...") must not crash the parse
    // (with the bug the embedded query never finishes and ww3 is never rendered).
    // Report change needed : ww3 embedded data query, Null Tag (nullTag) = NA.
    it("ww3: embedded CSV short row w/ null tag", () => {

        cy.assertButtons("ww3", ["Clear Filters", "Initialize Filters"]);

    });

})
