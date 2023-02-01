describe("Gadgets/CreateGadgetFromScratch", () => {

    beforeEach(() => {
        cy.login();
        cy.openGadgetEditor();
    });

    it("ww0: Edit Gadget Test", () => {

        /*
        Creating a gadget from scratch in the gadget editor.
         */

        // Open gadget editor
        cy.get("[data-cy='appMenu-button-newGadget']").click();
        cy.get("div[data-cy=schemaName] input").type("Sales (LiveDemo){downArrow}{enter}")
        cy.get("[data-cy='button-ok']").click();

        // Place table
        cy.get("[data-cy='appMenu-button-newWidget']").click();
        cy.get("[data-cy='ic3ItemChooser-ic3.Table']").click();

        cy.get('[data-cy-page-nb="0"]')
            .trigger('mousedown', 100, 100, {force: true})
            .wait(100)
            .trigger('mouseup', 100, 100, {force: true})

        cy.get('[data-cy="toolbar-openOptionsEditor"]').click();
        cy.get('.MuiDrawer-root #tab-query').click();
        cy.get('button[data-cy="switchMdxToStatement"]').click();

        cy.get('.cm-editor')
            .type('{ctrl}a{del}')
            .type('SELECT [Measures].[Amount] ON "Columns" [Customer].[Customer].[Type].allmembers ON "Rows" FROM [Sales]')
            .wait(500)

        cy.widgetEditorApplyAndClose();

        // Place Buttons
        cy.get("[data-cy='appMenu-button-newWidget']").click();
        cy.get("[data-cy='ic3ItemChooser-ic3.FilterButtons']").click();

        cy.get('[data-cy-page-nb="0"]')
            .trigger('mousedown', 100, 600, {force: true})
            .wait(100)
            .trigger('mouseup', 100, 600, {force: true})

        cy.get('[data-cy="toolbar-openOptionsEditor"]').click();
        cy.get('.MuiDrawer-root #tab-query').click();
        cy.get('button[data-cy="switchMdxToStatement"]').click();

        cy.get('.cm-editor').type('{ctrl}a{del}')
            .type('SELECT [Time].[Time].[Year].allmembers ON "MdxBuilderFilterItems"FROM [Sales] CELL PROPERTIES CELL_ORDINAL')
            .wait(500)

        cy.get('.MuiDrawer-root #tab-interactions').click();
        cy.get('[data-cy=selection]').click()
        cy.get("div[data-cy='Publish-Selection'] input")
            .type('selYear')

        cy.widgetEditorApplyAndClose();

        // Add event to Table query
        cy.clickUserMenuAddEventToQueries("ww1");

        // Assert filter works
        cy.get("[data-cy=ic-button][data-name=2018]").click();
        cy.assertTableCellContent("ww0", 0, 0, "Business")
        cy.assertTableCellContent("ww0", 1, 0, "Consumer")
        cy.assertTableCellContent("ww0", 0, 1, "€356,400")
        cy.assertTableCellContent("ww0", 1, 1, "€165,750")

    });

});
