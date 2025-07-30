describe("Gadgets/GadgetChangeTheme", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Gadgets/Gadget Change Theme");
        cy.waitForQueryCount(1);
    });

    it("ww0: Change Theme", () => {

        // Statos
        cy.getWidget("wg0-0").find(".MuiDataGrid-columnHeaderTitle").eq(0)
            .should('have.css', 'font-family')
            .and('match', /Lato/);

        cy.get('[data-cy="toolbar-openOptionsEditor"]').click();

        cy.contains('label', 'Theme *').type("ic3 Demo Theme{downArrow}{enter}");
        cy.contains('label', 'Layout Name *').click({force:true}).type("Desktop{downArrow}{enter}");
        cy.widgetEditorApply();

        // Demo theme
        cy.getWidget("wg0-0").find(".MuiDataGrid-columnHeaderTitle").eq(0)
            .should('have.css', 'font-family')
            .and('match', /Rubik/);

    });

});