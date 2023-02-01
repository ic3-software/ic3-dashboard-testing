describe("VExpanding/Springs/Pivot w/ Widget Fully Below", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("VExpanding/Springs/Pivot w%2F Widget Fully Below");
        cy.waitForQueryCount(1);
    });

    it("Assert Size/Position", () => {

        cy.assertPageCount(2);

        cy.assertWidgetDetails(0, "ww0", 0, 150, 725, 864);

        cy.assertWidgetDetails(1, "ww0", 0, 0, 725, 344);
        cy.assertWidgetDetails(1, "ww2", 0, 369, 400, 100);
        cy.assertWidgetDetails(1, "ww3", 425, 369, 300, 100);

    })

});
