describe("Others/GlobalEvents", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/GlobalEvents");
    });

    const user = Cypress.env("ic3_user");

    it("ww3:Buttons cell_properties cell_ordinal", () => {
        cy.assertEventWithText("ww0", "ic3_userName", user)
        user === "cypress" && cy.assertEventWithText("ww0", "ic3_userRole", "cypress")
        cy.assertEventWithText("ww0", "ic3_environmentName", "icCube Development")
        cy.assertEventWithText("ww0", "ic3_environmentColor", "#C0E799")
        cy.assertEventWithText("ww0", "ic3_userTenant", null)
    })

})