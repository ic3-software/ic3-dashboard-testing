export {};

describe("Selection/PivotTableSelection", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Selection/Pivot Table Selection II - 2");
        cy.waitForQueryCount(3);
    });

    it("selection ww5 Column", () => {

        // Column
        const widgetId = "ww5";
        const eventWidgetId = "ww6";

        cy.log(widgetId);
        cy.assertPivotTableTopHeader(widgetId, 0, 0, "2018");
        cy.assertPivotTableTopHeader(widgetId, 1, 0, "Business");

        cy.selectPivotTableTopHeader(widgetId, 0, 0);
        cy.assertEventValue(eventWidgetId, "(2018, Business)");

        cy.assertPivotTableCellSelected(widgetId, 0, 0);
        cy.assertPivotTableCellSelected(widgetId, 1, 0);
        cy.assertPivotTableCellSelected(widgetId, 2, 0);
        cy.assertPivotTableCellSelected(widgetId, 3, 0);

        cy.selectPivotTableTopHeader(widgetId, 1, 0);
        cy.assertEventValue(eventWidgetId, "");

        cy.selectPivotTableCell(widgetId, 0, 0);
        cy.assertEventValue(eventWidgetId, "(2018, Business)");

        cy.selectPivotTableCell(widgetId, 0, 1);
        cy.assertEventValue(eventWidgetId, "(2018, Consumer)");
        cy.assertPivotTableCellSelected(widgetId, 0, 1);
        cy.assertPivotTableCellSelected(widgetId, 1, 1);
        cy.assertPivotTableCellSelected(widgetId, 2, 1);
        cy.assertPivotTableCellSelected(widgetId, 3, 1);


    });
    it("selection ww7 Column Year", () => {


        // Column Year
        const widgetId = "ww7";
        const eventWidgetId = "ww8";

        cy.log(widgetId);
        cy.assertPivotTableTopHeader(widgetId, 0, 0, "2018");
        cy.assertPivotTableTopHeader(widgetId, 1, 0, "Business");

        cy.selectPivotTableTopHeader(widgetId, 0, 0);
        cy.assertEventValue(eventWidgetId, "2018");
        cy.assertPivotTableNoCellSelected(widgetId);

        cy.selectPivotTableTopHeader(widgetId, 0, 0);
        cy.assertEventValue(eventWidgetId, "");

        cy.selectPivotTableCell(widgetId, 0, 0);
        cy.assertEventValue(eventWidgetId, "2018");

        cy.selectPivotTableCell(widgetId, 0, 2);
        cy.assertEventValue(eventWidgetId, "2019");


    });

    it("selection ww9 Column Type", () => {


        // Column Type
        const widgetId = "ww9";
        const eventWidgetId = "ww11";

        cy.log(widgetId);
        cy.assertPivotTableTopHeader(widgetId, 0, 0, "2018");
        cy.assertPivotTableTopHeader(widgetId, 1, 0, "Business");

        cy.selectPivotTableTopHeader(widgetId, 1, 0);
        cy.assertEventValue(eventWidgetId, "Business");
        cy.assertPivotTableNoCellSelected(widgetId);

        cy.selectPivotTableTopHeader(widgetId, 1, 0);
        cy.assertEventValue(eventWidgetId, "");

        cy.selectPivotTableCell(widgetId, 1, 0);
        cy.assertEventValue(eventWidgetId, "Business");

        cy.selectPivotTableCell(widgetId, 0, 1);
        cy.assertEventValue(eventWidgetId, "Consumer");


    });

});