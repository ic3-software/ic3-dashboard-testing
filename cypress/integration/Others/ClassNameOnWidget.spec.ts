describe("Others/ClassNameOnWidget", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/ClassNameOnWidget");
        cy.waitForQueryCount(3);
    });

    it("Viewer", () => {

        // should be visble
        cy.assertWidgetInvisible("ww1");
        cy.assertWidgetInvisible("ww2");

        cy.selectButton("ww0", "AA-L1");

        cy.getWidget("ww1");
        cy.getWidget("ww2");

        cy.selectButton("ww0", "AA-L1");

        cy.assertWidgetInvisible("ww1");
        cy.assertWidgetInvisible("ww2");

    })

})