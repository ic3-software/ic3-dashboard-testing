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
 * The versions of the schema builder (Server UI, toolbar next to Undo / Redo) : the save points (named versions, kept
 * forever) and the recent changes ; a restore is a change that can be undone. See builderUtils for the prerequisites.
 */
describe("Builder : versions", () => {

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

    it("create a save point : listed, not a change (nothing to undo)", () => {

        builderCreateSavePoint(v1);

        builderAssertNothingToUndo();

        builderVersions("save-points").first().should("contain.text", v1);

    });

    it("restore a save point, then undo the restore", () => {

        builderCreateSavePoint(v1);
        builderEditSchemaDescription("after v1");

        builderRestoreVersion("save-points", 0);

        builderAssertNotification("Restored : " + v1, "Undo");
        builderAssertSchemaDescription(BUILDER_SCHEMA_DESCRIPTION);

        // Undo from the notification : the restore is undone.
        builderAssertNotification("Restored : " + v1, "Undo", true);
        builderAssertSchemaDescription("after v1");

    });

    it("the changes after a save point never change it", () => {

        builderCreateSavePoint(v1);

        // Same page visit : a single revision for both, not the one of the save point.
        builderEditSchemaDescription("first change");
        builderEditSchemaDescription("second change");

        builderVersions("save-points").first().should("contain.text", v1);

        builderRestoreVersion("save-points", 0);
        builderAssertSchemaDescription(BUILDER_SCHEMA_DESCRIPTION);

    });

    it("restore a recent change", () => {

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
