describe("Visibility/VisibilityResize00", () => {

    beforeEach(() => {
        cy.login();
    })

    it("Viewer Mode - Desktop", () => {

        cy.openViewerTestReport("Visibility/VisibilityResize00", true, true);
        cy.waitForQueryCount(2);

        // Top markdown widget is using the whole horizontal space.
        cy.assertWidgetWidth("ww0", 1504);

        // all rows are present
        cy.assertWidgetGridHeight("ww0", 476)

        // That test is about the wrong breakpoint definition : the range [ 0 - 600px ] got no @media CSS !

        cy.assertWidgetWidth("ww1", 1504);
        cy.assertWidgetWidth("ww2", 1504);

        cy.assertWidgetHeight("ww1", 200);
        cy.assertWidgetHeight("ww2", 200);

    })

    it("Viewer Mode - Mobile", {viewportWidth: 400}, () => {

        cy.openViewerTestReport("Visibility/VisibilityResize00", true, true);
        cy.waitForQueryCount(2);

        // Top markdown widget is using the whole horizontal space.
        cy.assertWidgetWidth("ww0", 400);

        // all rows are present
        cy.assertWidgetGridHeight("ww0", 476)

        // That test is about the wrong breakpoint definition (not about invisible stuff) :
        //      before the fix the range [ 0 - 600px ] got no @media CSS.

        // This is not new, but now we rely always on this @media setup.

        cy.assertWidgetWidth("ww1", 400);
        cy.assertWidgetWidth("ww2", 400);

        cy.assertWidgetHeight("ww1", 200);
        cy.assertWidgetHeight("ww2", 200);

    })

})