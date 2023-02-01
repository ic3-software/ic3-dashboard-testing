describe("VExpanding/PivotTableDesktop", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("VExpanding/PivotTableDesktop");
        cy.waitForQueryCount(6);
    });

    it("Header", () => {

        const widgetId = "ww0";

        cy.assertPivotTableDetails(0, widgetId, true, true, 1696, 31);

    })

    it("Rep No Box Header", () => {

        const widgetId = "ww1";

        cy.assertPivotTableDetails(0, widgetId, true, true, 1696, 31);

    })

    it("Rep No Table Header", () => {

        const widgetId = "ww7";

        cy.assertPivotTableDetails(0, widgetId, true, true, 1696, 31);

    })

    it("Rep No Box/Table Header", () => {

        const widgetId = "ww8";

        cy.assertPivotTableDetails(0, widgetId, true, true, 1696, 31);

    })

    it("No Box Header", () => {

        const widgetId = "ww2";

        cy.assertPivotTableDetails(0, widgetId, false, true, 1664, 31);

    })

    it("No Box Header / Rep No Table Header", () => {

        const widgetId = "ww11";

        cy.assertPivotTableDetails(0, widgetId, false, true, 1664, 31);

    })

});
