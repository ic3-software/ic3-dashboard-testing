import {
    BUILDER_SCHEMA_DESCRIPTION,
    builderAssertNotification,
    builderAssertNothingToUndo,
    builderAssertSchemaDescription,
    builderEditSchemaDescription,
    builderHistory,
    builderHistoryAction,
    builderNameVersion,
    builderOpenSchema,
    builderSaveVersion,
    builderUploadSchema
} from "./builderUtils";

/**
 * Save and Open of the schema builder (Server UI, top bar next to Undo / Redo) : Save a schema version names the current
 * state (kept forever), Open shows the history of the schema (a grid, the actions of a row as icons) : restore a
 * version or a change (it can be undone), name an older state (its name cell), download a state. See builderUtils for
 * the prerequisites.
 */
describe("Builder : Save / Open", () => {

    /**
     * The versions of the previous tests are kept (forever, even once the schema is uploaded again) : a name per test.
     */
    let v1 = "";

    beforeEach(() => {

        v1 = "v1 " + Date.now();

        cy.loginServerUI();

        // The test schema as uploaded : only that schema is changed.
        builderUploadSchema("Cypress Versions");

        builderOpenSchema();
        builderAssertNothingToUndo();

    });

    it("save a schema version : the current state in the history, not a change (nothing to undo)", () => {

        builderSaveVersion(v1);

        builderAssertNothingToUndo();

        builderHistory().first().should("contain.text", v1).and("contain.text", "Current");

    });

    it("restore a schema version, then undo it", () => {

        builderSaveVersion(v1);
        builderEditSchemaDescription("after v1");

        builderHistoryAction(v1, "restore");

        builderAssertNotification("Restored : " + v1, "Undo");
        builderAssertSchemaDescription(BUILDER_SCHEMA_DESCRIPTION);

        // Undo from the notification : the restore is undone.
        builderAssertNotification("Restored : " + v1, "Undo", true);
        builderAssertSchemaDescription("after v1");

    });

    it("the changes after a schema version never change it", () => {

        builderSaveVersion(v1);

        // Same page visit : a single revision for both, not the one of the version.
        builderEditSchemaDescription("first change");
        builderEditSchemaDescription("second change");

        builderHistory().eq(1).should("contain.text", v1);

        builderHistoryAction(v1, "restore");
        builderAssertSchemaDescription(BUILDER_SCHEMA_DESCRIPTION);

    });

    it("restore an older change", () => {

        builderEditSchemaDescription("first change");

        // Another page visit : another revision.
        cy.reload();
        builderEditSchemaDescription("second change");

        // The newest first : the current state (second change), then the first change.
        builderHistory().eq(0).should("contain.text", "Current");
        builderHistoryAction(1, "restore");

        builderAssertSchemaDescription("first change");

    });

    it("name an older change", () => {

        builderEditSchemaDescription("first change");

        cy.reload();
        builderEditSchemaDescription("second change");

        builderNameVersion(1, v1);

        // Named : the first change, not the current state.
        builderHistory().eq(1).should("contain.text", v1);
        builderHistory().eq(0).should("not.contain.text", v1);

        builderHistoryAction(v1, "restore");
        builderAssertSchemaDescription("first change");

    });

    it("download a state", () => {

        builderEditSchemaDescription("first change");

        cy.intercept("POST", "**/builder/DownloadSchemaVersion/**").as("download");

        // The schema as uploaded (the definition before the change).
        builderHistoryAction(1, "download");

        cy.wait("@download").its("response.statusCode").should("eq", 200);

    });

});
