import {assertTableColumnWidth, dragTableColumnWidth} from "./TableUtils";


describe("Tables/Table Resizing State", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table State Data Change");
        cy.waitForQueryCount(2);
    });

    it("Check resizing and local state", () => {

        const widgetId = "ww0";

        assertTableColumnWidth(cy, widgetId, "Article", 80);
        assertTableColumnWidth(cy, widgetId, "Amount", 80);

        dragTableColumnWidth(cy, widgetId, "Amount", 50);
        assertTableColumnWidth(cy, widgetId, "Amount", 80 + 50);

        // Reload
        cy.openViewerTestReport("Tables/Table State Data Change");
        cy.waitForQueryCount(2);

        assertTableColumnWidth(cy, widgetId, "Amount", 80 + 50);

    });

    it("Check resizing and local state when data changes", () => {

        const widgetId = "ww0";

        assertTableColumnWidth(cy, widgetId, "Amount", 80);
        dragTableColumnWidth(cy, widgetId, "Amount", 50);
        assertTableColumnWidth(cy, widgetId, "Amount", 80 + 50);

        // Click CONSUMER
        cy.wait(300);
        cy.selectButton("ww1", "Consumer", {force:true});
        cy.assertButtonSelected("ww1", "Consumer");
        cy.waitForQueryCount(3);

        assertTableColumnWidth(cy, widgetId, "Amount", 80 + 50);

    });

});