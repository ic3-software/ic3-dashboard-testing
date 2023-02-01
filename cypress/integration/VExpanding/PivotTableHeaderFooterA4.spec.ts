describe("VExpanding/PivotTableHeaderFooterA4", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("VExpanding/PivotTableHeaderFooterA4");
        cy.waitForQueryCount(6);
    });

    it("Header", () => {

        const widgetId = "ww0";

        cy.assertPageCount(3);

        cy.assertPivotTableDetails(0, widgetId, true, true, 656, 11);
        cy.assertPivotTableDetails(1, widgetId, true, true, 968, 17);
        cy.assertPivotTableDetails(2, widgetId, true, true, 760, 13);

    })

    it("Rep No Box Header", () => {

        const widgetId = "ww1";

        cy.assertPageCount(3);

        cy.assertPivotTableDetails(0, widgetId, true, true, 656, 11);
        cy.assertPivotTableDetails(1, widgetId, false, true, 936, 17);
        cy.assertPivotTableDetails(2, widgetId, false, true, 728, 13);

    })

    it("Rep No Table Header", () => {

        const widgetId = "ww7";

        cy.assertPageCount(3);

        cy.assertPivotTableDetails(0, widgetId, true, true, 656, 11);
        cy.assertPivotTableDetails(1, widgetId, true, false, 968, 18);
        cy.assertPivotTableDetails(2, widgetId, true, false, 656, 12);

    })

    it("Rep No Box/Table Header", () => {

        const widgetId = "ww8";

        cy.assertPageCount(3);

        cy.assertPivotTableDetails(0, widgetId, true, true, 656, 11);
        cy.assertPivotTableDetails(1, widgetId, false, false, 936, 18);
        cy.assertPivotTableDetails(2, widgetId, false, false, 624, 12);

    })

    it("No Box Header", () => {

        const widgetId = "ww2";

        cy.assertPageCount(3);

        cy.assertPivotTableDetails(0, widgetId, false, true, 676, 12);
        cy.assertPivotTableDetails(1, widgetId, false, true, 936, 17);
        cy.assertPivotTableDetails(2, widgetId, false, true, 676, 12);

    })

    it("No Box Header / Rep No Table Header", () => {

        const widgetId = "ww11";

        cy.assertPageCount(3);

        cy.assertPivotTableDetails(0, widgetId, false, true, 676, 12);
        cy.assertPivotTableDetails(1, widgetId, false, false, 936, 18);
        cy.assertPivotTableDetails(2, widgetId, false, false, 572, 11);

    })

});
