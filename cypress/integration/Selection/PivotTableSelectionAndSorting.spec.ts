export {};

describe("Selection/PivotTableSelectionAndSorting", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Selection/Pivot Table Selection & Sorting");
        cy.waitForQueryCount(1);
    });

    const widgetId = "ww8";
    const eventWidgetId = "ww3";

    it("selection", () => {

        {
            // Row Selection

            cy.assertPivotTableLeftHeader(widgetId, 0, 0, "Africa");
            cy.assertPivotTableLeftHeader(widgetId, 5, 0, "South America");

            cy.selectPivotTableLeftHeader(widgetId, 0, 0);
            cy.assertEventValue(eventWidgetId, "Africa");

            // unselect
            cy.log("unselect");
            cy.selectPivotTableLeftHeader(widgetId, 0, 0);
            cy.assertEventValue(eventWidgetId, "");

            cy.selectPivotTableLeftHeader(widgetId, 0, 0);
            cy.assertEventValue(eventWidgetId, "Africa");

            cy.selectPivotTableLeftHeader(widgetId, 5, 0);
            cy.assertEventValue(eventWidgetId, "South America");

            cy.keyCtrl(() => {

                cy.selectPivotTableLeftHeader(widgetId, 0, 0);
                cy.assertEventValue(eventWidgetId, "South America,Africa");

                cy.selectPivotTableLeftHeader(widgetId, 5, 0);
                cy.assertEventValue(eventWidgetId, "Africa");

            });

            //unselect
            cy.log("unselect 2");
            cy.selectPivotTableLeftHeader(widgetId, 0, 0);
            cy.assertEventValue(eventWidgetId, "");

            cy.log("Sort Business (down)");
            cy.selectPivotTableTopHeader(widgetId, 0, 0);
            cy.selectPivotTableTopHeader(widgetId, 0, 0);

            cy.selectPivotTableLeftHeader(widgetId, 0, 0);
            cy.assertEventValue(eventWidgetId, "Europe");
            cy.selectPivotTableLeftHeader(widgetId, 1, 0);
            cy.assertEventValue(eventWidgetId, "North America");

            cy.log("Sort Business (up)");
            cy.selectPivotTableTopHeader(widgetId, 0, 0);

            cy.selectPivotTableLeftHeader(widgetId, 0, 0);
            cy.assertEventValue(eventWidgetId, "South America");
            cy.selectPivotTableLeftHeader(widgetId, 1, 0);
            cy.assertEventValue(eventWidgetId, "Asia");
            cy.selectPivotTableLeftHeader(widgetId, 1, 0);
            cy.assertEventValue(eventWidgetId, "");
        }
    });

    it("drilldown", () => {

        {
            cy.log("Check drilldown");
            cy.assertPivotTableRowCount(widgetId, 6);
            cy.waitForQueryCount(1);
            cy.drilldownPivotTableLeftHeader(widgetId, 0, 0);
            cy.waitForQueryCount(2);
            cy.assertPivotTableLeftHeader(widgetId, 1, 0, "Egypt");
            cy.assertPivotTableLeftHeader(widgetId, 2, 0, "South Africa");

            cy.selectPivotTableLeftHeader(widgetId, 1, 0);
            cy.assertEventValue(eventWidgetId, "Egypt");
            cy.assertPivotTableCellSelected(widgetId, 1, 0);

            cy.selectPivotTableLeftHeader(widgetId, 2, 0);
            cy.assertEventValue(eventWidgetId, "South Africa");
            cy.assertPivotTableCellSelected(widgetId, 2, 0);


        }


    })

});
