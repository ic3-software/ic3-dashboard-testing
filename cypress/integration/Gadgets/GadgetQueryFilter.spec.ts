describe("Gadgets/GadgetQueryFilter", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Gadgets/Gadget Query-Filter");
        cy.waitForQueryCount(2);
    });

    it("query filter", () => {


        const widgetId = "ww0";
        const gadgetId = "wg0-0";

        // play around a bit with events

        cy.selectButton(widgetId, "Africa");
        cy.assertTableCellContent(gadgetId, 0, 1, '€148,250');


        cy.clickUserMenuAddEventToQueries(widgetId);

        cy.assertTableCellContent(gadgetId, 0, 1, '€29,500');

        cy.selectButton(widgetId, "Oceania");
        cy.assertTableCellContent(gadgetId, 0, 1, '€6,000');

        // Edit and clear manually the filterBy
        cy.widgetEditorOpen(gadgetId);
        cy.widgetEditorChangeTab("tab-queryFilter");

        cy.get('input[value="region"]').clear();

        cy.widgetEditorApplyAndClose();

        cy.assertTableCellContent(gadgetId, 0, 1, '€148,250');

        // Put it again
        cy.widgetEditorOpen(gadgetId);
        cy.widgetEditorChangeTab("tab-queryFilter");

        cy.get('[data-cy="field-queryFilter.def"] input')
            .type("region")
            .get('li.MuiAutocomplete-option[data-option-index="0"]')
            .click()

        cy.widgetEditorApplyAndClose();


        cy.assertTableCellContent(gadgetId, 0, 1, '€6,000');

    });

});
