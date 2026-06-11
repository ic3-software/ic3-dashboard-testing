describe("Visibility/VisibilityResize03", () => {

    beforeEach(() => {
        cy.login();
    })

    it("Viewer Mode", () => {

        cy.openViewerTestReport("Visibility/VisibilityResize03", true, true);
        cy.waitForQueryCount(4);

        // Top markdown widget is using the whole horizontal space.
        cy.assertWidgetWidth("ww0", 1504);

        // ww4 auto-expand
        cy.assertWidgetGridHeight("ww0", 672)

        // whole row
        cy.assertWidgetWidth("ww1", 1504);

        // ww3 invisible => ww2 + ww4 are using the whole horizontal space.
        cy.assertWidgetWidth("ww2", 496);
        cy.assertWidgetWidth("ww4", 1000);

        cy.assertWidgetHeight("ww2", 396);
        cy.assertWidgetHeight("ww4", 396);

    })

})