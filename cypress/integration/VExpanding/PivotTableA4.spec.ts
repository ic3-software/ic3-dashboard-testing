describe("VExpanding/PivotTableA4", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("VExpanding/PivotTableA4");
        cy.waitForQueryCount(6);
    });

    it("Header", () => {

        const widgetId = "ww0";

        cy.assertPageCount(2);

        cy.assertPivotTableDetails(0, widgetId, true, true, 760, 13);
        cy.assertPivotTableDetails(1, widgetId, true, true, 1020, 18);

    })

    it("Rep No Box Header", () => {

        const widgetId = "ww1";

        cy.assertPageCount(2);

        cy.assertPivotTableDetails(0, widgetId, true, true, 760, 13);
        cy.assertPivotTableDetails(1, widgetId, false, true, 988, 18);

    })

    it("Rep No Table Header", () => {

        const widgetId = "ww7";

        cy.assertPageCount(2);

        cy.assertPivotTableDetails(0, widgetId, true, true, 760, 13);
        cy.assertPivotTableDetails(1, widgetId, true, false, 968, 18);

    })

    it("Rep No Box/Table Header", () => {

        const widgetId = "ww8";

        cy.assertPageCount(2);

        cy.assertPivotTableDetails(0, widgetId, true, true, 760, 13);
        cy.assertPivotTableDetails(1, widgetId, false, false, 936, 18);

    })

    it("No Box Header", () => {

        const widgetId = "ww2";

        cy.assertPageCount(2);

        cy.assertPivotTableDetails(0, widgetId, false, true, 728, 13);
        cy.assertPivotTableDetails(1, widgetId, false, true, 988, 18);

    })

    it("No Box Header / Rep No Table Header", () => {

        const widgetId = "ww11";

        cy.assertPageCount(2);

        cy.assertPivotTableDetails(0, widgetId, false, true, 728, 13);
        cy.assertPivotTableDetails(1, widgetId, false, false, 936, 18);

    })

});
