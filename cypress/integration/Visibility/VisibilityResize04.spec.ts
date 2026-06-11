describe("Visibility/VisibilityResize04", () => {

    beforeEach(() => {
        cy.login();
    })

    it("Viewer Mode", () => {

        cy.openViewerTestReport("Visibility/VisibilityResize04", true, true);
        cy.waitForQueryCount(5);

        // Top markdown widget is using the whole horizontal space.
        cy.assertWidgetWidth("ww0", 1504);

        // ww2 auto-expand
        cy.assertWidgetGridHeight("ww0", 672)

        // whole row
        cy.assertWidgetWidth("ww1", 1504);

        // ww2 : half-row + auto-expand
        cy.assertWidgetWidth("ww2", 748);
        cy.assertWidgetHeight("ww2", 396);

        // ww3 | ww5 : half-row
        cy.assertWidgetWidth("ww3", 748);
        cy.assertWidgetWidth("ww5", 748);

        // ww3 | ww5 : redistributed according to ww2 height
        cy.assertWidgetHeight("ww3", 129);
        cy.assertWidgetHeight("ww5", 259);

    })

})