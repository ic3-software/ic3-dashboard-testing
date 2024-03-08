export {};

describe("Selection/PivotTableSelection", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Selection/Pivot Table Selection");
        cy.waitForQueryCount(3);
    });

    it("selection", () => {

        {
            // Row Selection
            const widgetId = "ww8";
            const eventWidgetId = "ww3";

            cy.assertPivotTableLeftHeader(widgetId, 5, 0, "South/Latin America");
            cy.assertPivotTableLeftHeader(widgetId, 0, 0, "Africa");

            cy.selectPivotTableLeftHeader(widgetId, 5, 0);
            cy.assertEventValue(eventWidgetId, "South/Latin America");

            cy.wait(100)

            // unselect
            cy.selectPivotTableLeftHeader(widgetId, 5, 0);
            cy.assertEventValue(eventWidgetId, "");

            cy.selectPivotTableLeftHeader(widgetId, 5, 0);
            cy.assertEventValue(eventWidgetId, "South/Latin America");

            cy.selectPivotTableLeftHeader(widgetId, 0, 0);
            cy.assertEventValue(eventWidgetId, "Africa");

            cy.keyCtrl(() => {

                cy.selectPivotTableLeftHeader(widgetId, 5, 0);
                cy.assertEventValue(eventWidgetId, "Africa, South/Latin America");

                cy.selectPivotTableLeftHeader(widgetId, 0, 0);
                cy.assertEventValue(eventWidgetId, "South/Latin America");

            });


        }

        {
            // Column Selection
            const widgetId = "ww10";
            const eventWidgetId = "ww0";

            cy.assertPivotTableTopHeader(widgetId, 0, 0, "Business");
            cy.assertPivotTableTopHeader(widgetId, 0, 1, "Consumer");

            cy.selectPivotTableTopHeader(widgetId, 0, 0);
            cy.wait(100)
            cy.assertEventValue(eventWidgetId, "Business");


            cy.selectPivotTableTopHeader(widgetId, 0, 0);
            cy.wait(100)
            cy.assertEventValue(eventWidgetId, "");

            cy.selectPivotTableTopHeader(widgetId, 0, 0);
            cy.wait(100)
            cy.assertEventValue(eventWidgetId, "Business");

            cy.selectPivotTableTopHeader(widgetId, 0, 1);
            cy.wait(100)
            cy.assertEventValue(eventWidgetId, "Consumer");


            cy.keyCtrl(() => {

                cy.selectPivotTableTopHeader(widgetId, 0, 0);
                cy.wait(100)
                cy.assertEventValue(eventWidgetId, "Consumer, Business");

                cy.selectPivotTableTopHeader(widgetId, 0, 1);
                cy.wait(100)
                cy.assertEventValue(eventWidgetId, "Business");

            });

        }


        {
            // Cell Selection
            const widgetId = "ww11";
            const eventWidgetId = "ww1";

            cy.selectPivotTableCell(widgetId, 5, 0);
            cy.assertEventValue(eventWidgetId, "(South/Latin America, Business)");

            cy.wait(100)

            cy.selectPivotTableCell(widgetId, 5, 0);
            cy.assertEventValue(eventWidgetId, "");


            cy.selectPivotTableCell(widgetId, 5, 0);
            cy.assertEventValue(eventWidgetId, "(South/Latin America, Business)");
            cy.selectPivotTableCell(widgetId, 0, 1);
            cy.assertEventValue(eventWidgetId, "(Africa, Consumer)");


            cy.keyCtrl(() => {

                cy.selectPivotTableCell(widgetId, 0, 0);
                cy.assertEventValue(eventWidgetId, "(Africa, Consumer), (Africa, Business)");

                cy.selectPivotTableCell(widgetId, 0, 1);
                cy.assertEventValue(eventWidgetId, "(Africa, Business)");

                cy.selectPivotTableCell(widgetId, 0, 0);
                cy.assertEventValue(eventWidgetId, "");
            });

        }

    })

});
