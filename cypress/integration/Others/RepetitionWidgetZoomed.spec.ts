describe("Others/RepetitionWidgetRendering", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/Repetition Widget Zoomed", true, true);
        cy.waitForQueryCount(7);
    });

    it("Test we get what we expect", () => {

        cy.assertWidgetDetails(0, "ww0", 207.891, 150, 1069.1875, 786);

        cy.assertWidgetDetails(0, "ww0~:Rep-ww1-R:0-C:0", 25, 18, 482.109375, 350);
        cy.assertWidgetDetails(0, "ww0~:Rep-ww2-R:0-C:0", 532.109, 18, 512.078125, 175);
        cy.assertWidgetDetails(0, "ww0~:Rep-ww3-R:0-C:0", 532.109, 218, 512.078125, 150);

        const topDist = 386 - 18;
        cy.assertWidgetDetails(0, "ww0~:Rep-ww1-R:1-C:0", 25, 18 + topDist, 482.109375, 350);
        cy.assertWidgetDetails(0, "ww0~:Rep-ww2-R:1-C:0", 532.109, 18 + topDist, 512.078125, 175);
        cy.assertWidgetDetails(0, "ww0~:Rep-ww3-R:1-C:0", 532.109, 218 + topDist, 512.078125, 150);


    });

})


