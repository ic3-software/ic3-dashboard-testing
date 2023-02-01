describe("Others/HorizontalExpanding", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/HorizontalExpanding", true, true);
        cy.waitForQueryCount(4);
    });

    it("Test we get what we expect", () => {

        cy.assertWidgetDetails(0, "ww0", 0, 0, 267.296875, 250);
        cy.assertWidgetDetails(0, "ww1", 267.3, 0, 267.296875, 250);
        cy.assertWidgetDetails(0, "ww2", 534.6, 0, 477.546875, 250);
        cy.assertWidgetDetails(0, "ww3", 1037.15, 0, 447.84375, 250);


    });

})


