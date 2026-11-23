import {
    BUILDER_SCHEMA_DESCRIPTION,
    builderAssertNotification,
    builderAssertNothingToUndo,
    builderAssertSchemaDescription,
    builderCreateSavePoint,
    builderEditSchemaDescription,
    builderOpenSchema,
    builderRestoreVersion,
    builderUploadSchema,
    builderVersions
} from "./builderUtils";

/**
 * Save and Open of the schema builder (Server UI, top bar next to Undo / Redo) : Save a snapshot names the current state
 * (kept forever), Open restores a snapshot or a recent change (a change that can be undone). See builderUtils for the
 * prerequisites.
 */
describe("Builder : Save / Open", () => {

    /**
     * The save points of the previous tests are kept (forever, even once the schema is uploaded again) : a name per test.
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

    it("save a snapshot : listed, not a change (nothing to undo)", () => {

        builderCreateSavePoint(v1);

        builderAssertNothingToUndo();

        builderVersions("save-points").first().should("contain.text", v1);

    });

    it("open a snapshot, then undo it", () => {

        builderCreateSavePoint(v1);
        builderEditSchemaDescription("after v1");

        builderRestoreVersion("save-points", 0);

        builderAssertNotification("Opened : " + v1, "Undo");
        builderAssertSchemaDescription(BUILDER_SCHEMA_DESCRIPTION);

        // Undo from the notification : the restore is undone.
        builderAssertNotification("Opened : " + v1, "Undo", true);
        builderAssertSchemaDescription("after v1");

    });

    it("the changes after a snapshot never change it", () => {

        builderCreateSavePoint(v1);

        // Same page visit : a single revision for both, not the one of the save point.
        builderEditSchemaDescription("first change");
        builderEditSchemaDescription("second change");

        builderVersions("save-points").first().should("contain.text", v1);

        builderRestoreVersion("save-points", 0);
        builderAssertSchemaDescription(BUILDER_SCHEMA_DESCRIPTION);

    });

    it("open a recent change", () => {

        builderEditSchemaDescription("first change");

        // Another page visit : another revision.
        cy.reload();
        builderEditSchemaDescription("second change");

        // The newest first : the current version (second change), then the first change.
        builderVersions("recent").eq(0).should("contain.text", "Current");
        builderRestoreVersion("recent", 1);

        builderAssertSchemaDescription("first change");

    });

});
