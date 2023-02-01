describe("VExpanding/TableHeaderFooterA4", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("VExpanding/TableHeaderFooterA4");
        cy.waitForQueryCount(6);
    });

    it("Header", () => {

        const widgetId = "ww0";

        cy.assertPageCount(3);

        cy.assertTableDetails(0, widgetId, true, true, 656, 11);
        cy.assertTableDetails(1, widgetId, true, true, 968, 17);
        cy.assertTableDetails(2, widgetId, true, true, 760, 13);

    })

    it("Rep No Box Header", () => {

        const widgetId = "ww1";

        cy.assertPageCount(3);

        cy.assertTableDetails(0, widgetId, true, true, 656, 11);
        cy.assertTableDetails(1, widgetId, false, true, 936, 17);
        cy.assertTableDetails(2, widgetId, false, true, 728, 13);

    })

    it("Rep No Table Header", () => {

        const widgetId = "ww7";

        cy.assertPageCount(3);

        cy.assertTableDetails(0, widgetId, true, true, 656, 11);
        cy.assertTableDetails(1, widgetId, true, false, 968, 18);
        cy.assertTableDetails(2, widgetId, true, false, 656, 12);

    })

    it("Rep No Box/Table Header", () => {

        const widgetId = "ww8";

        cy.assertPageCount(3);

        cy.assertTableDetails(0, widgetId, true, true, 656, 11);
        cy.assertTableDetails(1, widgetId, false, false, 936, 18);
        cy.assertTableDetails(2, widgetId, false, false, 624, 12);

    })

    it("No Box Header", () => {

        const widgetId = "ww2";

        cy.assertPageCount(3);

        cy.assertTableDetails(0, widgetId, false, true, 676, 12);
        cy.assertTableDetails(1, widgetId, false, true, 936, 17);
        cy.assertTableDetails(2, widgetId, false, true, 676, 12);

    })

    it("No Box Header / Rep No Table Header", () => {

        const widgetId = "ww11";

        cy.assertPageCount(3);

        cy.assertTableDetails(0, widgetId, false, true, 676, 12);
        cy.assertTableDetails(1, widgetId, false, false, 936, 18);
        cy.assertTableDetails(2, widgetId, false, false, 572, 11);

    })

});
