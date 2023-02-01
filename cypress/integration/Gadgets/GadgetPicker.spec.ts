describe("Gadgets/GadgetPicker", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Gadgets/Edit Gadget Test");
        cy.waitForQueryCount(2);
    });

    it("gadget picker", () => {

        /*
        adding a gadget from the gadget picker.
         */

        cy.get("[data-cy='appMenu-button-addGadget']").click();
        cy.get("[data-cy='ic3ItemChooser-shared:/Cypress/Delete Gadget Test']").click();

        cy.get('[data-cy-page-nb="0"]')
            .wait(200)
            .trigger('mousedown', 100, 100, {force: true})
            .wait(200)
            .trigger('mouseup', 100, 100, {force: true})
            .wait(200)

        // Widgets exist
        cy.getWidget("wg1-0");
        cy.getWidget("wg1-1");

    });

});
