export {};


describe("Selection/ClearSelectionOnEventBind", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Selection/ClearSelectionOnEventBind");
        cy.waitForQueryCount(3);
    });

    // https://github.com/ic3-software/icCubeReportingMF/issues/1185
    it("default", () => {

        cy.selectButton("ww0", "2020")
        cy.selectButton("ww2", "2019")

        cy.assertButtonSelected("ww0", "2020")
        cy.assertButtonSelected("ww1", "2020")
        cy.assertButtonSelected("ww2", "2019")

        cy.clickUserMenuClearSelection("ww1")
        cy.clickUserMenuClearSelection("ww2")

        cy.assertButtonsSelected("ww0")
        cy.assertButtonsSelected("ww1")
        cy.assertButtonsSelected("ww2")

    });


});
