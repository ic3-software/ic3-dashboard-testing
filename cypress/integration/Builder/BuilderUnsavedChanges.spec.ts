import {
    builderAssertAsksBeforeLeaving,
    builderEditSchemaDescription,
    builderOpenSchema,
    builderTypeSchemaDescription,
    builderUploadSchema
} from "./builderUtils";

/**
 * The unsaved changes of a page of the schema builder (Server UI) are not lost silently. See builderUtils for the
 * prerequisites.
 *
 * Back / forward cannot be tested : no browser history in an iframe (the Cypress runner), see UxConsoleApp.
 */
describe("Builder : unsaved changes", () => {

    beforeEach(() => {

        cy.loginServerUI();

        // The test schema as uploaded : only that schema is changed.
        builderUploadSchema("Cypress Unsaved Changes");

        builderOpenSchema();

    });

    it("the browser asks before leaving the page while there are unsaved changes", () => {

        builderAssertAsksBeforeLeaving(false);

        builderTypeSchemaDescription("not saved yet");
        builderAssertAsksBeforeLeaving(true);

        // Saved : no more unsaved changes (and none left for the next test).
        builderEditSchemaDescription("saved");
        builderAssertAsksBeforeLeaving(false);

    });

});
