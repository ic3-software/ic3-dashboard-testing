describe("Visibility/VisibilityResize02", () => {

    beforeEach(() => {
        cy.login();
    })

    it("Viewer Mode", () => {

        cy.openViewerTestReport("Visibility/VisibilityResize02", true, true);
        cy.waitForQueryCount(3);

        // Top markdown widget is using the whole horizontal space.
        cy.assertWidgetWidth("ww0", 1504);

        // ww1 invisible => meaning the whole row is removed
        cy.assertWidgetGridHeight("ww0", 268)

        // ww3 invisible => ww2 is using the whole horizontal space.
        cy.assertWidgetWidth("ww2", 1504);

    })

})