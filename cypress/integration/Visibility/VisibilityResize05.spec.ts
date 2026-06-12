describe("Visibility/VisibilityResize05", () => {

    beforeEach(() => {
        cy.login();
    })

    it("Viewer Mode", () => {

        cy.openViewerTestReport("Visibility/VisibilityResize05", true, true);
        cy.waitForQueryCount(4);

        // Top markdown widget is using the whole horizontal space.
        cy.assertWidgetWidth("ww0", 1504);

        // all rows are present
        cy.assertWidgetGridHeight("ww0", 476)

        // whole row
        cy.assertWidgetWidth("ww1", 1504);

        // ww2 invisible => ww3 | ww4 are using the whole horizontal space.
        cy.assertWidgetWidth("ww3", 1504);
        cy.assertWidgetWidth("ww5", 1504);

        // ww3 | ww4 unchanged
        cy.assertWidgetHeight("ww3", 64);
        cy.assertWidgetHeight("ww4", 128);

    })

})