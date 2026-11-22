import {builderCsrf, builderQueryUrl} from "../Builder/builderUtils";

/**
 * Helpers of the schema builder AI assistant (Server UI) specs : see also Builder/builderUtils.
 *
 * Prerequisites (icCube server) :
 *
 *  - the fake AI agent (icCubeAgent : APP_DEFAULT_LLM_MODEL=ic3::in-memory) : a question starting with "papagayo:" is
 *    replied with the question itself, i.e., a builder-changes code block is replied as a Schema Changes card,
 *  - the cypress user : the schema builder (upload a schema) and the Builder AI feature (see the AI permissions of its
 *    role).
 */

/**
 * The target of the changes of the AI (MCP builder path) : its description is changed.
 */
export const BUILDER_DIMENSION = "dimensions/Partition";

const ASSISTANT = ".ic3-ai-panel .ic3AIAssistant-root";

/**
 * MUI multiline text fields have a second (hidden) textarea used for sizing.
 */
const INPUT = `${ASSISTANT} .ic3AIAssistant-input textarea:not([aria-hidden='true'])`;

const SEND = `${ASSISTANT} [data-cy='question-send']`;

const ANSWER = `${ASSISTANT} [data-cy='ai-answer']`;

/**
 * An action (code block) of the replies : the Schema Changes card.
 */
const ACTION_ROW = `${ANSWER} [data-cy='ai-action-row']`;

/**
 * The AI assistant docked on the right (toolbar of the application).
 */
export function builderOpenAssistant() {

    // Labelled as its tooltip (ai.toggleBuilderAssistant) ; the top bar of common-ui (a div, not a header).
    const button = ".ic3TopBar-rightBar [aria-label='AI (Olie)']";

    cy.get(button).click();

    // Its tooltip is left open by the click (the mouse stays over it) : e.g., builderAssertToolbar() would find it.
    cy.get(button).trigger("mouseout");
    cy.get("[role='tooltip']").should("not.exist");

    cy.get(ASSISTANT).should("be.visible");

}

/**
 * The current revision of the test schema : the base_rev of the proposals of changes (an older one : conflict).
 */
export function builderSchemaRevision(): Cypress.Chainable<number> {

    // As JSON (as the Server UI) : the reply is read as JSON as well.
    return builderCsrf().then(headers => cy.request({
        method: "POST",
        url: builderQueryUrl("PreviewSchemaChanges"),
        headers,
        body: {base_rev: -1, ops: "[]"},
    })).then(response => {

        // conflict : the definition has been changed since (revision 12, base_rev -1) : read it again
        const error: string = response.body?.payload?.changes?.error ?? "";
        const match = error.match(/revision (\d+)/);

        expect(match, "the revision of the schema : " + error).to.not.be.null;

        return Number(match![1]);
    });

}

/**
 * The AI (papagayo) proposes to set the description of BUILDER_DIMENSION (based on the current revision of the
 * schema) : a Schema Changes card (previewed, not applied).
 */
export function builderPropose(description: string) {

    builderSchemaRevision().then(rev => {

        const proposal = {base_rev: rev, ops: [{op: "set_description", target: BUILDER_DIMENSION, description}]};

        sendQuestion(["papagayo:", "```builder-changes", JSON.stringify(proposal), "```"].join("\n"));

    });

    builderCard().find("[data-cy='ai-action-apply']").should("be.visible");

}

/**
 * Sets the (multi-line) question then sends it : waits for the whole (papagayo) reply.
 */
function sendQuestion(question: string) {

    cy.get(INPUT).should("be.enabled").then($input => {

        const input = $input[0] as HTMLTextAreaElement;

        // React controlled field : the native setter + an input event (a plain value assignment is ignored).
        const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")!.set!;
        setter.call(input, question);
        input.dispatchEvent(new Event("input", {bubbles: true}));

    });

    cy.get(INPUT).type("{enter}");

    cy.get(INPUT).should("be.enabled").should("have.value", "");
    cy.get(SEND).should("be.visible");

}

/**
 * A Schema Changes card.
 *
 * @param fromLast 0 : the last one, 1 : the one before...
 */
export function builderCard(fromLast = 0) {

    return cy.get(ACTION_ROW).eq(-1 - fromLast);

}

export function builderApply(fromLast = 0) {

    builderCard(fromLast).find("[data-cy='ai-action-apply']").click();
    builderCard(fromLast).find("[data-cy='ai-action-applied']").should("be.visible");

    // Based on a revision of the schema : no Reapply (a conflict), the Undo of the card instead.
    builderCard(fromLast).find("[data-cy='ai-action-reapply']").should("not.exist");

}

/**
 * The Undo of the card : enabled while its change is the last one of the session.
 */
export function builderAssertCardUndo(enabled: boolean, fromLast = 0) {

    builderCard(fromLast).find("[data-cy='builder-changes-undo']").should(enabled ? "be.enabled" : "be.disabled");

}

export function builderAssertCardUndone(fromLast = 0) {

    builderCard(fromLast).find("[data-cy='builder-changes-undone']").should("be.visible");
    builderCard(fromLast).find("[data-cy='ai-action-reapply']").should("not.exist");

}
