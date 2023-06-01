describe("Others/UserMenuInitialSelection", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/UserMenuInitialSelection", true, false);
    });

    it("Test we get what we expect", () => {

        cy.waitForQueryCount(4);

        cy.assertUserMenuVisibility("ww0", "toInitialSelection", true);
        cy.assertUserMenuVisibility("ww1", "toInitialSelection", false);
        cy.assertUserMenuVisibility("ww2", "toInitialSelection", true);
        cy.assertUserMenuVisibility("ww3", "toInitialSelection", false);

    });

})


