describe("Others/WidgetDataOnError", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/WidgetDataOnError");
        cy.waitForQueryCount(4);
    });

    it("ww3: Table", () => {

        const widgetId = "ww3";

        cy.assertTableCellOnError(widgetId, 0, 1);
        cy.assertTableCellOnError(widgetId, 0, 2);
    })

    it("ww5: Pivot Table", () => {

        const widgetId = "ww5";

        cy.assertPivotTableCellOnError(widgetId, 0, 0);
        cy.assertPivotTableCellOnError(widgetId, 0, 1);
    })

    it("ww4: Bar Chart", () => {

        const widgetId = "ww4";

        cy.assertWidgetDataOnError(widgetId);
    })

    it("ww6: Bar Chart wo/ Header", () => {

        const widgetId = "ww6";

        cy.assertWidgetDataOnError(widgetId);
    })


})