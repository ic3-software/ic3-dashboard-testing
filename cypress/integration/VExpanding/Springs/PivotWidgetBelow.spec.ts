describe("VExpanding/Springs/Pivot w/ Widget Below", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("VExpanding/Springs/Pivot w%2F Widget Below");
        cy.waitForQueryCount(1);
    });

    it("Assert Size/Position", () => {

        cy.assertPageCount(2);

        cy.assertWidgetDetailsEx(0, "ww0", 0, 150, 400, 885);

        cy.assertWidgetDetailsEx(1, "ww0", 0, 0, 400, 253);
        cy.assertWidgetDetailsEx(1, "ww2", 0, 278, 400, 100);
        cy.assertWidgetDetailsEx(1, "ww3", 425, 278, 300, 100);

    })

});
