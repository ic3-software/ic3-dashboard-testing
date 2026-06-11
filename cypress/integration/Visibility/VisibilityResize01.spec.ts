describe("Visibility/VisibilityResize01", () => {

    beforeEach(() => {
        cy.login();
    })

    it("Viewer Mode", () => {

        cy.openViewerTestReport("Visibility/VisibilityResize01", true, true);
        cy.waitForQueryCount(3);

        // Top markdown widget is using the whole horizontal space.
        cy.assertWidgetWidth("ww0", 1504);

        // all rows are present
        cy.assertWidgetGridHeight("ww0", 476)

        // whole row
        cy.assertWidgetWidth("ww1", 1504);

        // ww3 invisible => ww2 is using the whole horizontal space.
        cy.assertWidgetWidth("ww2", 1504);

    })

})