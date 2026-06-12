describe("Others/Widget Conditional Visibility AutoExpand", () => {

    beforeEach(() => {
        cy.login();
    });

    it("Viewer", () => {

        cy.openViewerTestReport("Others/Widget Conditional Visibility AutoExpand");
        cy.waitForQueryCount(5);

        cy.assertWidgetVisible("ww1", true)
        cy.assertWidgetDetails(0, "ww2", 0, 0, 559, 147);


        // Hides ww1
        cy.selectDropdownFromInput("ww0", "2008")
        cy.assertWidgetInvisible("ww1")
        cy.assertWidgetDetails(0, "ww2", 0, 0, 1504, 147);

    })

})