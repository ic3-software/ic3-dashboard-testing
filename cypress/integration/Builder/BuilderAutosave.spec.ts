import {
    BUILDER_SCHEMA_DESCRIPTION,
    builderAssertNothingToUndo,
    builderAssertSchemaDescription,
    builderAssertToolbar,
    builderEditSchemaDescription,
    builderInterceptAutosave,
    builderOpenSchema,
    builderToolbarClick,
    builderTypeSchemaDescription,
    builderUploadSchema,
    builderWaitAutosave
} from "./builderUtils";

/**
 * The autosave of the pages of the schema builder (Server UI) : no Save button, the changes of a page visit are a single
 * revision (a single Undo step). See builderUtils for the prerequisites.
 */
describe("Builder : autosave", () => {

    beforeEach(() => {

        cy.loginServerUI();

        // The test schema as uploaded : only that schema is changed.
        builderUploadSchema("Cypress Autosave");

        builderOpenSchema();
        builderAssertNothingToUndo();

    });

    it("no Save button : saved when leaving the field", () => {

        cy.contains("button", /^save$/i).should("not.exist");

        builderEditSchemaDescription("saved when leaving the field");

        cy.get("[data-cy='builder-autosave-status']").should("contain.text", "Saved");

        cy.reload();
        builderAssertSchemaDescription("saved when leaving the field");

    });

    it("saved after a pause in the typing", () => {

        builderInterceptAutosave();

        builderTypeSchemaDescription("saved after a pause");

        builderWaitAutosave();

        cy.reload();
        builderAssertSchemaDescription("saved after a pause");

    });

    it("the changes of a page visit : a single Undo step", () => {

        builderEditSchemaDescription("first change");

        // Saved with the new revision number of the first save (otherwise rejected : changed since), no reload.
        builderEditSchemaDescription("second change");

        builderAssertToolbar("undo", true, "Undo edit properties");

        builderToolbarClick("undo");

        builderAssertSchemaDescription(BUILDER_SCHEMA_DESCRIPTION);
        builderAssertToolbar("undo", false, "Nothing to undo in this session");

    });

    it("another page visit : another Undo step", () => {

        builderEditSchemaDescription("first change");

        cy.reload();
        builderEditSchemaDescription("second change");

        builderToolbarClick("undo");

        builderAssertSchemaDescription("first change");

    });

});
