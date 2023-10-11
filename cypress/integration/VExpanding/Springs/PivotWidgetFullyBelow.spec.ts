describe("VExpanding/Springs/Pivot w/ Widget Fully Below", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("VExpanding/Springs/Pivot w%2F Widget Fully Below");
        cy.waitForQueryCount(1);
    });

    it("Assert Size/Position", () => {

        cy.assertPageCount(2);

        cy.assertWidgetDetailsEx(0, "ww0", 0, 150, 725, 885);

        cy.assertWidgetDetailsEx(1, "ww0", 0, 0, 725, 253);
        cy.assertWidgetDetailsEx(1, "ww2", 0, 278, 400, 100);
        cy.assertWidgetDetailsEx(1, "ww3", 425, 278, 300, 100);

    })

});
