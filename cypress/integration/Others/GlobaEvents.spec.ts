describe("Others/GlobalEvents", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/GlobalEvents");
    });

    it("ww3:Buttons cell_properties cell_ordinal", () => {

        cy.env(['ic3_user']).then(({ic3_user}) => {

            cy.assertEventWithText("ww0", "ic3_userRole", "cypress")
            cy.assertEventWithText("ww0", "ic3_userName", ic3_user)
            cy.assertEventWithText("ww0", "ic3_environmentName", "icCube Development")
            cy.assertEventWithText("ww0", "ic3_environmentColor", "#C0E799")
            cy.assertEventWithText("ww0", "ic3_userTenant", null)

        });

    })

})