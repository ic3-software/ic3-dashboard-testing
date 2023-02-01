import {assertTableColumnWidth, dragTableColumnWidth} from "./TableUtils";


describe("Tables/Table Resizing", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table Resizing");
        cy.waitForQueryCount(1);
    });

    it("Check resizing and local state", () => {

        const widgetId = "ww0";

        assertTableColumnWidth(cy, widgetId, "Country", 180);
        assertTableColumnWidth(cy, widgetId, "Personal", 80);

        dragTableColumnWidth(cy, widgetId, "Country", 55);
        assertTableColumnWidth(cy, widgetId, "Country", 180 + 55);
    })

});

describe("Tables/Table Resizing (editor)", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Tables/Table Resizing");
        cy.waitForQueryCount(1);
    });

    it("Check resizing columns while editing", () => {

        // check we can resize the table when editing as well (no collision with widget events)
        const widgetId = "ww0";

        assertTableColumnWidth(cy, widgetId, "Country", 180);
        assertTableColumnWidth(cy, widgetId, "Personal", 80);

        dragTableColumnWidth(cy, widgetId, "Country", 55);
        assertTableColumnWidth(cy, widgetId, "Country", 180 + 55);

    })

});


