describe("Others/Widget Conditional Visibility", () => {

    beforeEach(() => {
        cy.login();
    });

    it("Viewer", () => {

        cy.openViewerTestReport("Others/Widget Conditional Visibility");
        cy.waitForQueryCount(5);

        cy.assertWidgetVisible("ww1", true)
        cy.selectDropdownFromInput("ww0", "2010")
        cy.assertWidgetInvisible("ww2")

        cy.selectDropdownFromInput("ww0", "2011")
        cy.assertWidgetVisible("ww2",true)
    })

    it("Editor", () => {

        cy.openEditorTestReport("Others/Widget Conditional Visibility");
        cy.waitForQueryCount(5);

        cy.assertWidgetVisible("ww2", true)
        cy.selectDropdownFromInput("ww0", "2010")
        cy.get(".MuiAlert-message").contains("ww2")
        cy.assertWidgetVisible("ww2", true)
    })


})