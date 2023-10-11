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

        cy.assertPageCount(3);

        cy.assertWidgetDetails(0, "ww0", 500, 0, 200, 50);

        cy.assertWidgetDetailsEx(1, "ww1", 0, 0, 275, 1037);
        cy.assertWidgetDetailsEx(2, "ww1", 0, 0, 275, 471);

        cy.assertWidgetDetailsEx(1, "ww2", 300, 0, 400, 964);
        cy.assertWidgetDetailsEx(2, "ww2", 300, 0, 400, 246);
    })

});
