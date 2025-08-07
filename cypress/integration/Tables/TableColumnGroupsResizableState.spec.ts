import {assertTableColumnWidth, dragTableColumnWidth} from "./TableUtils";


describe("Tables/Table Column Groups State", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table Column Groups State");
        cy.waitForQueryCount(2);
    });

    it("Check resizing and local state", () => {

        const widgetId = "ww0";

        assertTableColumnWidth(cy, widgetId, "Business,Amount", 80);
        assertTableColumnWidth(cy, widgetId, "Business,Amount MIN", 80);

        dragTableColumnWidth(cy, widgetId, "Business,Amount", 50);
        assertTableColumnWidth(cy, widgetId, "Business,Amount", 80 + 50);

        // Reload
        cy.openViewerTestReport("Tables/Table Column Groups State");
        cy.waitForQueryCount(2);

        assertTableColumnWidth(cy, widgetId, "Business,Amount", 80 + 50);

    });

    it("Check resizing and local state when data changes", () => {

        const widgetId = "ww0";

        assertTableColumnWidth(cy, widgetId, "Business,Amount", 80);
        dragTableColumnWidth(cy, widgetId, "Business,Amount", 50);
        assertTableColumnWidth(cy, widgetId, "Business,Amount", 80 + 50);

        // Click CONSUMER
        cy.wait(300);
        cy.selectButton("ww1", "2021", {force:true});
        cy.assertButtonSelected("ww1", "2021");
        cy.waitForQueryCount(3);

        assertTableColumnWidth(cy, widgetId, "Business,Amount", 80 + 50);

    });

});