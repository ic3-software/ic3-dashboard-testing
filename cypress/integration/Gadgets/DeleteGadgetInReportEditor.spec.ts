describe("Gadgets/DeleteGadgetInReportEditor", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Gadgets/Delete Gadget Test");
        cy.waitForQueryCount(4);
    });

    it("ww0: Delete gadget", () => {

        /*
        delete gadget removes all widgets in that gadget.
         */

        cy.getWidget("wg0-0");
        cy.getWidget("wg0-1");
        cy.getWidget("wg1-0");
        cy.getWidget("wg1-1");

        cy.clickWidgetHeader("wg0-0");
        cy.get("[data-cy='toolbar-delete']").click();

        cy.get('[data-cy="widget-box-wg0-0"]').should('not.exist');
        cy.get('[data-cy="widget-box-wg0-1"]').should('not.exist');
        cy.getWidget("wg1-0");
        cy.getWidget("wg1-1");

    });

});