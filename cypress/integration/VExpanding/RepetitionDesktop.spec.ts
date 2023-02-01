describe("VExpanding/RepetitionDesktop", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("VExpanding/RepetitionDesktop");
        cy.waitForQueryCount(21);
    });

    it("Header", () => {

        const widgetId = "ww2";

        cy.assertRepetitionWidgetDetails(0, widgetId, true, 1358, 6);

    })

    it("Rep No Box Header", () => {

        const widgetId = "ww0";

        cy.assertRepetitionWidgetDetails(0, widgetId, true, 1358, 6);

    })

    it("No Box Header", () => {

        const widgetId = "ww4";

        cy.assertRepetitionWidgetDetails(0, widgetId, false, 1200, 6)

    })

});
