describe("VExpanding/TableColumnGroups", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("VExpanding/TableColumnGroups");
        cy.waitForQueryCount(6);
    });

    it("Header", () => {

        const widgetId = "ww0";

        cy.assertPageCount(3);

        cy.assertTableDetails(0, widgetId, true, true, 760, 12, 2);
        cy.assertTableDetails(1, widgetId, true, true, 1020, 17, 2);
        cy.assertTableDetails(2, widgetId, true, true, 240, 2, 2);

    })

    it("Rep No Box Header", () => {

        const widgetId = "ww1";

        cy.assertPageCount(3);

        cy.assertTableDetails(0, widgetId, true, true, 760, 12, 2);
        cy.assertTableDetails(1, widgetId, false, true, 1040, 18, 2);
        cy.assertTableDetails(2, widgetId, false, true, 156, 1, 2);

    })

    it("Rep No Table Header", () => {

        const widgetId = "ww7";

        cy.assertPageCount(3);

        cy.assertTableDetails(0, widgetId, true, true, 760, 12, 2);
        cy.assertTableDetails(1, widgetId, true, false, 1020, 19, 2);

    })

    it("Rep No Box/Table Header", () => {

        const widgetId = "ww8";

        cy.assertPageCount(3);

        cy.assertTableDetails(0, widgetId, true, true, 760, 12, 2);
        cy.assertTableDetails(1, widgetId, false, false, 988, 19, 2);

    })

    it("No Box Header", () => {

        const widgetId = "ww2";

        cy.assertPageCount(3);

        cy.assertTableDetails(0, widgetId, false, true, 728, 12, 2);
        cy.assertTableDetails(1, widgetId, false, true, 1040, 18, 2);
        cy.assertTableDetails(2, widgetId, false, true, 156, 1, 2);

    })

    it("No Box Header / Rep No Table Header", () => {

        const widgetId = "ww11";

        cy.assertPageCount(3);

        cy.assertTableDetails(0, widgetId, false, true, 728, 12, 2);
        cy.assertTableDetails(1, widgetId, false, false, 988, 19, 2);

    })

});
