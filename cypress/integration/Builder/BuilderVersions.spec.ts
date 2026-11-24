import {
    BUILDER_SCHEMA_DESCRIPTION,
    builderAssertNotification,
    builderAssertNothingToUndo,
    builderAssertSchemaDescription,
    builderCreateSavePoint,
    builderEditSchemaDescription,
    builderHistory,
    builderHistoryAction,
    builderOpenSchema,
    builderSaveSnapshotDialog,
    builderUploadSchema
} from "./builderUtils";

/**
 * Save and Open of the schema builder (Server UI, top bar next to Undo / Redo) : Save a snapshot names the current state
 * (kept forever), Open shows the history of the schema (a table, the actions of a row in its popup menu) : open a
 * snapshot or a change (it can be undone), save an older state as a snapshot, download a state. See builderUtils for
 * the prerequisites.
 */
describe("Builder : Save / Open", () => {

    /**
     * The snapshots of the previous tests are kept (forever, even once the schema is uploaded again) : a name per test.
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

    it("save a snapshot : the current state in the history, not a change (nothing to undo)", () => {

        builderCreateSavePoint(v1);

        builderAssertNothingToUndo();

        builderHistory().first().should("contain.text", v1).and("contain.text", "Current");

    });

    it("open a snapshot, then undo it", () => {

        builderCreateSavePoint(v1);
        builderEditSchemaDescription("after v1");

        builderHistoryAction(v1, "Open");

        builderAssertNotification("Opened : " + v1, "Undo");
        builderAssertSchemaDescription(BUILDER_SCHEMA_DESCRIPTION);

        // Undo from the notification : the open is undone.
        builderAssertNotification("Opened : " + v1, "Undo", true);
        builderAssertSchemaDescription("after v1");

    });

    it("the changes after a snapshot never change it", () => {

        builderCreateSavePoint(v1);

        // Same page visit : a single revision for both, not the one of the snapshot.
        builderEditSchemaDescription("first change");
        builderEditSchemaDescription("second change");

        builderHistory().eq(1).should("contain.text", v1);

        builderHistoryAction(v1, "Open");
        builderAssertSchemaDescription(BUILDER_SCHEMA_DESCRIPTION);

    });

    it("open an older change", () => {

        builderEditSchemaDescription("first change");

        // Another page visit : another revision.
        cy.reload();
        builderEditSchemaDescription("second change");

        // The newest first : the current state (second change), then the first change.
        builderHistory().eq(0).should("contain.text", "Current");
        builderHistoryAction(1, "Open");

        builderAssertSchemaDescription("first change");

    });

    it("save an older change as a snapshot", () => {

        builderEditSchemaDescription("first change");

        cy.reload();
        builderEditSchemaDescription("second change");

        builderHistoryAction(1, "Save as snapshot");
        builderSaveSnapshotDialog(v1);

        // Named : the first change, not the current state.
        builderHistory().eq(1).should("contain.text", v1);
        builderHistory().eq(0).should("not.contain.text", v1);

        builderHistoryAction(v1, "Open");
        builderAssertSchemaDescription("first change");

    });

    it("download a state", () => {

        builderEditSchemaDescription("first change");

        cy.intercept("POST", "**DownloadSchemaDefRevision**").as("download");

        // The schema as uploaded (the definition before the change).
        builderHistoryAction(1, "Download");

        cy.wait("@download").its("response.statusCode").should("eq", 200);

    });

});
