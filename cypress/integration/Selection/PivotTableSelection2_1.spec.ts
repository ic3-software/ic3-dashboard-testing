export {};

describe("Selection/PivotTableSelection", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Selection/Pivot Table Selection II - 1");
        cy.waitForQueryCount(3);
    });

    it("selection", () => {

        {
            // Default Selection -> Row
            const widgetId = "ww2";
            const eventWidgetId = "ww3";

            cy.log(widgetId);
            cy.assertPivotTableLeftHeader(widgetId, 0, 0, "South/Latin America");
            cy.assertPivotTableLeftHeader(widgetId, 0, 1, "2018");

            cy.selectPivotTableLeftHeader(widgetId, 0, 0);
            cy.assertEventValue(eventWidgetId, "(South/Latin America, 2018)");

            cy.assertPivotTableCellSelected(widgetId, 0, 0);
            cy.assertPivotTableCellSelected(widgetId, 0, 1);

            cy.selectPivotTableLeftHeader(widgetId, 0, 1);
            cy.assertEventValue(eventWidgetId, "");

            cy.selectPivotTableCell(widgetId, 0, 0);
            cy.assertEventValue(eventWidgetId, "(South/Latin America, 2018)");

        }


        {
            // Default Selection -> Row / Region
            const widgetId = "ww10";
            const eventWidgetId = "ww0";

            cy.log(widgetId);
            cy.assertPivotTableLeftHeader(widgetId, 0, 0, "South/Latin America");
            cy.assertPivotTableLeftHeader(widgetId, 0, 1, "2018");

            cy.selectPivotTableLeftHeader(widgetId, 0, 0);
            cy.assertEventValue(eventWidgetId, "South/Latin America");
            cy.assertPivotTableNoCellSelected(widgetId);

            cy.selectPivotTableLeftHeader(widgetId, 0, 0);
            cy.assertEventValue(eventWidgetId, "");

            cy.selectPivotTableCell(widgetId, 2, 1);
            cy.assertEventValue(eventWidgetId, "South/Latin America");

            cy.selectPivotTableCell(widgetId, 5, 1);
            cy.assertEventValue(eventWidgetId, "Asia & Pacific");

        }

        {
            // Default Selection -> Row / Year
            const widgetId = "ww1";
            const eventWidgetId = "ww4";

            cy.log(widgetId);
            cy.assertPivotTableLeftHeader(widgetId, 0, 0, "South/Latin America");
            cy.assertPivotTableLeftHeader(widgetId, 0, 1, "2018");
            cy.assertEventValue(eventWidgetId, "");

            cy.selectPivotTableLeftHeader(widgetId, 0, 1);
            cy.assertEventValue(eventWidgetId, "2018");
            cy.assertPivotTableNoCellSelected(widgetId);

            cy.selectPivotTableLeftHeader(widgetId, 0, 1);
            cy.assertEventValue(eventWidgetId, "");

            cy.selectPivotTableCell(widgetId, 0, 1);
            cy.assertEventValue(eventWidgetId, "2018");

            cy.selectPivotTableCell(widgetId, 3, 1);
            cy.assertEventValue(eventWidgetId, "2021");

        }
    })

});
