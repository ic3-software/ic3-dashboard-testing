describe("Gadgets/EditGadgetSettings", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Gadgets/Edit Gadget Test");
        cy.waitForQueryCount(2);
    });

    it("edit a gadget", () => {

        /*
        edit a gadget widget in the report editor and check that the settings work.
         */

        cy.widgetEditorOpen("wg0-1");
        cy.widgetEditorChangeTab('tab-chart');

        cy.get("div[data-cy='header-$-title'] input")
            .type('Test Header Test')

        cy.widgetEditorApplyAndClose();

        cy.getWidgetHeader("wg0-1").contains("Test Header Test")

    });

});
