describe("Others/WidgetsNotRendered", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/WidgetsNotRendered", undefined, false, true);
        cy.waitForChartRendering(1);
    });

    it("Basic", () => {

        // just one chart es rendered (the other one is not visible)
        cy.wait(100)
        cy.assertTableRowCount("ww0", 5)
        cy.waitForChartRendering(1);

        // check ww1 is not rendered
        cy.get('[data-cy="widget-box-ww1"]').contains("box not into view yet");
        // scroll dow the page (class needs to be the one with the scrollbar)
        cy.get(".ic3App-payload").scrollTo("bottom")

        // the widget is visible
        cy.assertTableRowCount("ww1", 5)

    })

})