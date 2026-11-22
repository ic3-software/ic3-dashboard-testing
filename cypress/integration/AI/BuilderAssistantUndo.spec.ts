import {
    builderApply,
    builderAssertCardUndo,
    builderAssertCardUndone,
    builderCard,
    builderOpenAssistant,
    builderPropose
} from "./builderAssistantUtils";
import {
    builderAssertNotification,
    builderAssertNothingToUndo,
    builderAssertToolbar,
    builderEditSchemaDescription,
    builderOpenSchema,
    builderToolbarClick,
    builderUploadSchema
} from "../Builder/builderUtils";
import {aiRunId} from "./utils";

/**
 * The Undo / Redo of the schema builder (Server UI) : the changes of the user during the current session, e.g., the
 * Schema Changes applied from the AI assistant (the Undo / Redo of the changes by hand : Builder/BuilderUndo). See
 * builderAssistantUtils for the prerequisites : each test uploads (overwrites) its test schema.
 *
 * A Cypress test has its own session storage : a new session (nothing to undo) for each test.
 */
describe("AI/Builder assistant : Undo / Redo", () => {

    beforeEach(() => {

        cy.loginServerUI();

        // The test schema as uploaded : only that schema is changed (not the one of Builder/BuilderUndo).
        builderUploadSchema("Cypress AI Undo");

        builderOpenSchema();
        builderOpenAssistant();

        builderAssertNothingToUndo();

    });

    it("1. apply, then change your mind right away", () => {

        builderPropose(aiRunId() + " scenario 1");
        builderApply();

        // Undo from the notification (shown a few seconds : the card and the toolbar Undo, see the other scenarios).

        builderAssertNotification("Schema changes applied", "Undo", true);

        // Undone : the schema is back, it can be redone.

        builderAssertNotification("Undone : Schema Changes (AI)", "Redo");
        builderAssertCardUndone();
        builderAssertToolbar("undo", false, "Nothing to undo in this session");
        builderAssertToolbar("redo", true, "Redo Schema Changes (AI)");

    });

    it("2. apply, edit by hand, then remove the changes of the AI (step by step)", () => {

        const id = aiRunId();

        builderPropose(id + " scenario 2");
        builderApply();

        // The last change : once the page has been refreshed (its fields are new elements, see builderEditSchemaDescription).
        builderAssertCardUndo(true);

        builderEditSchemaDescription(id + " edited by hand");

        // The card cannot undo it anymore : the toolbar, step by step.

        builderAssertCardUndo(false);
        builderAssertToolbar("undo", true, "Undo edit properties");

        builderToolbarClick("undo");
        builderAssertNotification("Undone : edit properties", "Redo");

        // The change of the AI is the last one again.

        builderAssertCardUndo(true);
        builderAssertToolbar("undo", true, "Undo Schema Changes (AI)");

        builderToolbarClick("undo");
        builderAssertNotification("Undone : Schema Changes (AI)", "Redo");

        builderAssertCardUndone();
        builderAssertToolbar("undo", false, "Nothing to undo in this session");
        builderAssertToolbar("redo", true, "Redo Schema Changes (AI)");

    });

    it("3. undo, then want it back (redo)", () => {

        builderPropose(aiRunId() + " scenario 3");
        builderApply();

        builderToolbarClick("undo");
        builderAssertCardUndone();

        // No Reapply on the card (conflict : based on an older revision of the schema) : Redo.

        builderToolbarClick("redo");
        builderAssertNotification("Redone : Schema Changes (AI)", "Undo");

        builderAssertCardUndo(true);
        builderAssertToolbar("undo", true, "Undo Schema Changes (AI)");
        builderAssertToolbar("redo", false, "Nothing to redo");

    });

    it("4. two AI proposals applied one after the other", () => {

        const id = aiRunId();

        builderPropose(id + " scenario 4 (A)");
        builderApply();

        builderPropose(id + " scenario 4 (B)");
        builderApply();

        // Only the last change can be undone from its card.

        builderAssertCardUndo(false, 1);
        builderAssertCardUndo(true, 0);

        // The steps tell the changes of the AI apart (e.g., Undo Schema Changes (AI) : changed Partition (description)).
        builderAssertToolbar("undo", true, "Undo Schema Changes (AI) : changed Partition (description)");

        builderToolbarClick("undo");

        builderAssertCardUndone(0);
        builderAssertCardUndo(true, 1);

        builderToolbarClick("undo");

        builderAssertCardUndone(1);
        builderAssertToolbar("undo", false, "Nothing to undo in this session");

    });

    it.skip("5. a colleague changes the schema after my apply (requires a second user)", () => {

        // TODO a second user (e.g., cypress2) changing the schema after the apply : the Undo / Redo are disabled.
        //  builderAssertToolbar("undo", false, "Changed by cypress2 since : cannot be undone");

    });

    it("6. reload the page after apply", () => {

        builderPropose(aiRunId() + " scenario 6");
        builderApply();

        cy.reload();

        // The same session (session storage) : the toolbar can undo it ; the card has lost its revision (no Undo).

        builderAssertToolbar("undo", true, "Undo Schema Changes (AI)");

    });

    it("7. the proposal of the AI is outdated (changed by hand since)", () => {

        const id = aiRunId();

        // Proposed (and previewed) on the current schema, then changed by hand.

        builderPropose(id + " scenario 7");
        builderEditSchemaDescription(id + " edited by hand");

        builderCard().find("[data-cy='ai-action-apply']").click();

        builderCard().find("[data-cy='ai-action-apply-error']").should("contain.text", "has been changed since");

        // Nothing applied : the manual change is the last one.
        builderAssertToolbar("undo", true, "Undo edit properties");

    });

});
