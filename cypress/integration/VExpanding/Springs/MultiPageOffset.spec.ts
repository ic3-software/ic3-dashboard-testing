describe("VExpanding/Springs/Multi Page Offset", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("VExpanding/Springs/Multi Page Offset");
        cy.waitForQueryCount(2);
    });

    it("Assert Size/Position", () => {

        // -------------------------------------------------------------------------------------------------------------
        // Expanding widgets are starting on pages > 0 : the issue was a spring with negative values...
        // -------------------------------------------------------------------------------------------------------------

        cy.assertPageCount(4);

        cy.assertWidgetDetails(0, "ww0", 500, 0, 200, 50);

        cy.assertWidgetDetails(1, "ww1", 0, 0, 275, 1020);
        cy.assertWidgetDetails(2, "ww1", 0, 0, 275, 1020);
        cy.assertWidgetDetails(3, "ww1", 0, 0, 275, 344);

        cy.assertWidgetDetails(1, "ww2", 300, 0, 400, 890);
        cy.assertWidgetDetails(2, "ww2", 300, 0, 400, 218);
    })

});
