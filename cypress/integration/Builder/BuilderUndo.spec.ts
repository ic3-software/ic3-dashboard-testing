import {
    BUILDER_SCHEMA_DESCRIPTION,
    builderAssertNotification,
    builderAssertNothingToUndo,
    builderAssertSchemaDescription,
    builderAssertToolbar,
    builderEditSchemaDescription,
    builderOpenSchema,
    builderToolbarClick,
    builderUploadSchema
} from "./builderUtils";

/**
 * The Undo / Redo of the schema builder (Server UI) : the changes of the user during the current session (here, by
 * hand : the description of the schema). See builderUtils for the prerequisites.
 *
 * A Cypress test has its own session storage : a new session (nothing to undo) for each test.
 */
describe("Builder : Undo / Redo", () => {

    beforeEach(() => {

        cy.loginServerUI();

        // The test schema as uploaded : only that schema is changed.
        builderUploadSchema("Cypress Undo");

        builderOpenSchema();
        builderAssertNothingToUndo();

    });

    it("undo then redo a change", () => {

        builderEditSchemaDescription("first change");

        builderAssertSchemaDescription("first change");
        builderAssertToolbar("undo", true, "Undo edit properties");
        builderAssertToolbar("redo", false, "Nothing to redo");

        builderToolbarClick("undo");

        // No confirmation : undone, then the page is refreshed (Redo from the notification).

        builderAssertNotification("Undone : edit properties", "Redo");
        builderAssertSchemaDescription(BUILDER_SCHEMA_DESCRIPTION);
        builderAssertToolbar("undo", false, "Nothing to undo in this session");
        builderAssertToolbar("redo", true, "Redo edit properties");

        builderToolbarClick("redo");

        builderAssertNotification("Redone : edit properties", "Undo");
        builderAssertSchemaDescription("first change");
        builderAssertToolbar("undo", true, "Undo edit properties");
        builderAssertToolbar("redo", false, "Nothing to redo");

    });

    it("redo from the notification", () => {

        builderEditSchemaDescription("first change");

        builderToolbarClick("undo");
        builderAssertNotification("Undone : edit properties", "Redo", true);

        builderAssertNotification("Redone : edit properties", "Undo");
        builderAssertSchemaDescription("first change");

    });

    it("undo step by step, then redo step by step", () => {

        builderEditSchemaDescription("first change");

        // Another page visit : another step (see BuilderAutosave).
        cy.reload();
        builderEditSchemaDescription("second change");

        builderToolbarClick("undo");
        builderAssertSchemaDescription("first change");

        builderToolbarClick("undo");
        builderAssertSchemaDescription(BUILDER_SCHEMA_DESCRIPTION);

        // The schema as uploaded (before the session) : not undone.
        builderAssertToolbar("undo", false, "Nothing to undo in this session");

        builderToolbarClick("redo");
        builderAssertSchemaDescription("first change");

        builderToolbarClick("redo");
        builderAssertSchemaDescription("second change");

        builderAssertToolbar("redo", false, "Nothing to redo");

    });

    it("a new change after an undo clears the redo", () => {

        builderEditSchemaDescription("first change");

        builderToolbarClick("undo");
        builderAssertToolbar("redo", true, "Redo edit properties");

        builderEditSchemaDescription("another change");

        builderAssertToolbar("redo", false, "Nothing to redo");

        builderToolbarClick("undo");
        builderAssertSchemaDescription(BUILDER_SCHEMA_DESCRIPTION);

    });

    it("a reload is the same session", () => {

        builderEditSchemaDescription("first change");

        cy.reload();

        builderAssertToolbar("undo", true, "Undo edit properties");

    });

    it("the changes of a previous session are not undone", () => {

        builderEditSchemaDescription("first change");

        // A new session (e.g., a new browser tab).
        cy.window().then(win => win.sessionStorage.clear());
        cy.reload();

        builderAssertNothingToUndo();
        builderAssertSchemaDescription("first change");

    });

});
