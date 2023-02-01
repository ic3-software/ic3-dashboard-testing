describe("VExpanding/RepetitionA4", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("VExpanding/RepetitionA4");
        cy.waitForQueryCount(21);
    });

    it("Header", () => {

        const widgetId = "ww2";

        cy.assertPageCount(2);

        cy.assertRepetitionWidgetDetails(0, widgetId, true, 704, 3);
        cy.assertRepetitionWidgetDetails(1, widgetId, true, 704, 3);

    })

    it("Rep No Box Header", () => {

        const widgetId = "ww0";

        cy.assertPageCount(2);

        cy.assertRepetitionWidgetDetails(0, widgetId, true, 704, 3);
        cy.assertRepetitionWidgetDetails(1, widgetId, false, 672, 3);

    })

    it("No Box Header", () => {

        const widgetId = "ww4";

        cy.assertPageCount(2);

        cy.assertRepetitionWidgetDetails(0, widgetId, false, 600, 3)
        cy.assertRepetitionWidgetDetails(1, widgetId, false, 600, 3)

    })

});
