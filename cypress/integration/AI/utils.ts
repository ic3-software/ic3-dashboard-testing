/**
 * Helpers shared by the AI specs.
 *
 * The icCube server is expected to run with the fake AI agent (icCube.xml : fakeAgent, see FakeAIAgent.java) :
 *
 *  - papagayo : a question starting with "papagayo:" is replied with the question itself (w/o the "papagayo:" prefix),
 *  - the caption of a conversation is generated asynchronously from its first question (see aiCaption()),
 *  - the conversations are kept in RAM (shared by all users) : use unique questions (see aiRunId()).
 */

const ASSISTANT = ".ic3App-drawer .ic3AIAssistant-root";

const TOOLBAR = `${ASSISTANT} .ic3AIAssistantToolbar-root`;

/**
 * MUI multiline text fields have a second (hidden) textarea used for sizing.
 */
const INPUT = `${ASSISTANT} .ic3AIAssistant-input textarea:not([aria-hidden='true'])`;

/**
 * The questions and the replies (document order).
 */
const MESSAGES = `${ASSISTANT} [data-cy='ai-question'], ${ASSISTANT} [data-cy='ai-answer']`;

/**
 * A card of a reply : one or several consecutive actions (no text in between, see AIActionGroupCard).
 */
const ACTION_CARD = "[data-cy='ai-action-card']";

/**
 * An action (json code block) : a row of its card.
 */
const ACTION_ROW = "[data-cy='ai-action-row']";

/**
 * The send button becomes a stop (cancel) button while the reply is streamed.
 */
const SEND = `${ASSISTANT} [data-cy='question-send']`;

const STOP = `${ASSISTANT} [data-cy='question-cancel']`;

const HISTORY = ".AIConversationHistory-root";

const HISTORY_ITEM = `${HISTORY} .AIConversationHistory-item`;

/**
 * Turns on the papagayo mode of the fake AI agent : must be the start of the question (removed from the reply).
 */
const PAPAGAYO = "papagayo:";

/**
 * @param text e.g., "hello" or "delay:30 hello" (see FakeAIAgent)
 * @return e.g., "papagayo: hello" : the question replied with the text itself (see aiReply()).
 */
export function aiQuestion(text: string) {
    return PAPAGAYO + " " + text;
}

/**
 * @param question e.g., "papagayo: hello" (see aiQuestion())
 * @return e.g., "hello" : the reply of the papagayo.
 */
export function aiReply(question: string) {

    if (!question.startsWith(PAPAGAYO)) {
        throw new Error(`AI : the question must start with '${PAPAGAYO}' (see aiQuestion()) : ${question}`);
    }

    return question.substring(PAPAGAYO.length).trimStart();
}

/**
 * A prefix making the questions (and therefore the conversation captions) unique for this run.
 */
export function aiRunId() {
    return "cy" + Date.now().toString(36) + Math.floor(Math.random() * 1000);
}

// ---------------------------------------------------------------------------------------------------------------------
// Dashboard Editor Assistant
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Opens the dashboard settings (no widget must be selected) on the AI tab.
 */
export function aiOpenEditorAssistant() {

    cy.get('[data-cy="toolbar-openOptionsEditor"]').click();
    cy.widgetEditorChangeTab("tab-report-ai" as any);

    cy.get(ASSISTANT).should("be.visible");

}

/**
 * No conversation : the initial page (greetings, suggestions) is displayed.
 */
export function aiAssertEmpty() {

    cy.get(`${ASSISTANT} .AIAssistantInitialState-title`).should("be.visible");
    cy.get(MESSAGES).should("not.exist");

}

/**
 * Sends the question and waits for the whole (papagayo) reply.
 *
 * @param question e.g., "papagayo: hello" (see aiQuestion())
 */
export function aiSend(question: string) {

    cy.get(INPUT)
        .should("be.enabled")
        .type(question)
        .should("have.value", question)
        .type("{enter}")
    ;

    // The input is disabled while the reply is streamed.
    cy.get(INPUT).should("be.enabled").should("have.value", "");

    cy.get(MESSAGES).last().should($message => {
        expect(messageAsText($message[0])).to.equal("A: " + aiReply(question));
    });

}

/**
 * Sends the question without waiting for the reply (e.g., to stop it, see aiStop()).
 *
 * Use the "delay:N" prefix (seconds) after the papagayo one to keep the request running long enough (see FakeAIAgent),
 * e.g., aiQuestion("delay:30 hello").
 */
export function aiSendNoWait(question: string) {

    cy.get(INPUT)
        .should("be.enabled")
        .type(question)
        .should("have.value", question)
        .type("{enter}")
    ;

    // The input is disabled while the reply is streamed : the send button becomes a stop button.
    cy.get(INPUT).should("be.disabled");
    cy.get(STOP).should("be.visible");
    cy.get(SEND).should("not.exist");

}

/**
 * Stops the running question : the input is enabled again.
 */
export function aiStop() {

    cy.get(STOP).should("be.visible").click();

    cy.get(INPUT).should("be.enabled");
    cy.get(STOP).should("not.exist");
    cy.get(SEND).should("be.visible");

}

/**
 * The reply of the papagayo is the question itself (w/o the papagayo prefix).
 *
 * @param questions e.g., "papagayo: hello" (see aiQuestion())
 */
export function aiPapagayo(...questions: string[]) {
    return questions.flatMap(question => ["Q: " + question, "A: " + aiReply(question)]);
}

/**
 * @param expected e.g., ["Q: papagayo: hello", "A: hello"] (see aiPapagayo())
 */
export function aiAssertMessages(expected: string[]) {

    cy.get(MESSAGES).should($messages => {
        expect($messages.toArray().map(messageAsText)).to.deep.equal(expected);
    });

    cy.get(`${ASSISTANT} .AIAssistantInitialState-title`).should("not.exist");

}

function messageAsText(message: HTMLElement) {

    const isQuestion = message.getAttribute("data-cy") === "ai-question";
    const content = message.querySelector(".ic3AIAssistant-messageContent")?.textContent?.trim() ?? "";

    return (isQuestion ? "Q: " : "A: ") + content;
}

// ---------------------------------------------------------------------------------------------------------------------
// Actions (json code blocks, see AIDashboardActionsRegister)
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Sets the (multi-line) question : set directly (Enter would send the first line only).
 */
function aiTypeMultiline(question: string) {

    cy.get(INPUT).should("be.enabled").then($input => {

        const input = $input[0] as HTMLTextAreaElement;

        // React controlled field : the native setter + an input event (a plain value assignment is ignored).
        const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")!.set!;
        setter.call(input, question);
        input.dispatchEvent(new Event("input", {bubbles: true}));

    });

    cy.get(INPUT).should("have.value", question);

}

/**
 * Sends the multi-line question (e.g., code blocks) and waits for the whole (papagayo) reply.
 *
 * @param lines the question lines (the papagayo prefix is added on its own line : a code block must start a line)
 */
export function aiSendMultiline(...lines: string[]) {

    aiTypeMultiline([PAPAGAYO, ...lines].join("\n"));

    cy.get(INPUT).type("{enter}");

    // The reply is fully streamed : the code blocks are rendered w/ their final renderer (not while streaming).
    cy.get(INPUT).should("be.enabled").should("have.value", "");
    cy.get(SEND).should("be.visible");

    cy.get(MESSAGES).last().should("have.attr", "data-cy", "ai-answer");

}

/**
 * Sends the multi-line question without waiting for the end of the reply (e.g., to check the streaming state).
 *
 * @param lines the question lines (the papagayo prefix is added on its own line), e.g., "chunk:300" first.
 */
export function aiSendMultilineNoWait(...lines: string[]) {

    aiTypeMultiline([PAPAGAYO, ...lines].join("\n"));

    cy.get(INPUT).type("{enter}");

    cy.get(STOP).should("be.visible");

}

/**
 * Waits for the end of the reply (see aiSendMultilineNoWait()).
 *
 * @param timeout e.g., a slow reply (chunk:N)
 */
export function aiWaitReply(timeout = 20000) {

    cy.get(INPUT, {timeout}).should("be.enabled").should("have.value", "");
    cy.get(SEND).should("be.visible");

}

/**
 * Sends the action as a json code block : the papagayo replies with the same code block, i.e., an action card.
 */
export function aiSendAction(action: object) {

    aiSendActions([action]);

}

/**
 * A part of a reply (see aiSendReply()) : a text paragraph or an action (json code block).
 */
export type AIReplyPart = string | object;

/**
 * Sends the parts in a single question : the papagayo replies with the same text and an action row per action (in
 * the same order), none applied.
 *
 * @param parts e.g., "First:", {action: ...}, {action: ...}, "Then:", {action: ...}
 */
export function aiSendReply(...parts: AIReplyPart[]) {

    const actions = parts.filter(part => typeof part !== "string");

    aiSendMultiline(...parts.flatMap(part => typeof part === "string"
        ? ["", part, ""]
        : ["```json", JSON.stringify(part), "```"]));

    // The question displays the json code only : the actions are in the reply.
    cy.get(MESSAGES).eq(-2)
        .should("have.attr", "data-cy", "ai-question")
        .find(`${ACTION_CARD}, ${ACTION_ROW}`)
        .should("not.exist")
    ;

    cy.get(MESSAGES).last()
        .should("have.attr", "data-cy", "ai-answer")
        .find(ACTION_ROW)
        .should("have.length", actions.length)
    ;

    actions.forEach((_, idx) => aiAssertLastActionState("idle", idx));

}

/**
 * Sends the actions as consecutive json code blocks in a single question : the papagayo replies with a single card
 * (a row per action, in the same order), none applied.
 */
export function aiSendActions(actions: object[]) {

    aiSendReply(...actions);

    aiAssertActionCards([actions.length]);

}

/**
 * The cards of the last reply (document order).
 *
 * @param rowsPerCard the number of actions of each card, e.g., [2, 1] : a card w/ 2 consecutive actions, then some
 * text, then a card w/ a single action.
 */
export function aiAssertActionCards(rowsPerCard: number[]) {

    cy.get(MESSAGES).last().should($answer => {

        const cards = $answer.find(ACTION_CARD).toArray();

        expect(cards.map(card => card.querySelectorAll(ACTION_ROW).length)).to.deep.equal(rowsPerCard);

    });

}

/**
 * An action (row) of the replies.
 *
 * @param fromLast 0 : the last action of the last reply, 1 : the one before (same reply if several actions), etc...
 */
export function aiLastAction(fromLast = 0) {

    return cy.get(`${ASSISTANT} [data-cy='ai-answer'] ${ACTION_ROW}`).eq(-1 - fromLast);

}

/**
 * @param title e.g., "Edit Widget Options" (ai.action.*.title)
 */
export function aiAssertLastAction(title: string) {

    aiLastAction().find("[data-cy='ai-action-title']").should("contain.text", title);

}

/**
 * The apply state of the last action (redux : see AIMessageActionHooks) and its controls :
 * <ul>
 *     <li>idle : 'Apply Changes' button,</li>
 *     <li>applied : 'Reapply' button,</li>
 *     <li>error : the error message (no button).</li>
 * </ul>
 * The target (subtitle, e.g., "Target: [ww0] Pivot Table") is displayed whatever the state.
 */
export function aiAssertLastActionState(status: "idle" | "applied" | "error", fromLast = 0) {

    aiLastAction(fromLast).should("have.class", "Ic3-" + status);

    const apply = "[data-cy='ai-action-apply']";
    const reapply = "[data-cy='ai-action-reapply']";
    const error = "[data-cy='ai-action-apply-error']";
    const target = "[data-cy='ai-action-target']";

    aiLastAction(fromLast).find(apply).should(status === "idle" ? "be.visible" : "not.exist");
    aiLastAction(fromLast).find(reapply).should(status === "applied" ? "be.visible" : "not.exist");
    aiLastAction(fromLast).find(error).should(status === "error" ? "be.visible" : "not.exist");
    aiLastAction(fromLast).find(target).should("be.visible");

}

/**
 * Performs the action of the last reply (auto-commit is off) : applied without error.
 */
export function aiApplyLastAction(fromLast = 0) {

    aiLastAction(fromLast).find("[data-cy='ai-action-apply']").click();
    aiAssertLastActionState("applied", fromLast);

}

// ---------------------------------------------------------------------------------------------------------------------
// Apply all (several actions in a reply, see AIApplyAllActions)
// ---------------------------------------------------------------------------------------------------------------------

const APPLY_ALL = "[data-cy='ai-apply-all']";

const APPLY_ALL_BUTTON = `${APPLY_ALL} [data-cy='ai-apply-all-button']`;

/**
 * The 'Apply all' of the last reply (displayed from 2 actions, once fully received) :
 * <ul>
 *     <li>null : not displayed (a single action : its own Apply button),</li>
 *     <li>idle : none applied ('Apply N' button),</li>
 *     <li>partial : some applied ('Apply remaining N' button),</li>
 *     <li>error : stopped on an error ('Apply remaining N' button),</li>
 *     <li>done : all applied (no button).</li>
 * </ul>
 *
 * @param pending the actions not applied yet (the button count) : idle, partial and error only.
 */
export function aiAssertApplyAll(status: null | "idle" | "partial" | "error" | "done", pending?: number) {

    const answer = cy.get(MESSAGES).last().should("have.attr", "data-cy", "ai-answer");

    if (status == null) {
        answer.find(APPLY_ALL).should("not.exist");
        return;
    }

    answer.find(APPLY_ALL).should("have.length", 1).should("have.class", "Ic3-" + status);

    const button = () => cy.get(MESSAGES).last().find(APPLY_ALL_BUTTON);

    if (status === "done") {
        button().should("not.exist");
    } else {
        button().should("be.visible").should("be.enabled");
        if (pending != null) {
            button().should("contain.text", String(pending));
        }
    }

}

/**
 * Where the 'Apply all' of the last reply is displayed (see IAIMessageModel.applyAll) :
 * <ul>
 *     <li>footer : the last row of the last card (a single card or the last one ends the reply),</li>
 *     <li>standalone : its own card at the end of the reply (several cards, some text after the last one).</li>
 * </ul>
 */
export function aiAssertApplyAllPlacement(placement: "footer" | "standalone") {

    cy.get(MESSAGES).last().should($answer => {

        const applyAll = $answer.find(APPLY_ALL).toArray();
        expect(applyAll, "apply all").to.have.length(1);

        const card = applyAll[0].closest(ACTION_CARD);
        const lastCard = $answer.find(ACTION_CARD).last()[0];

        if (placement === "footer") {
            expect(card, "in the last card").to.equal(lastCard);
            expect(applyAll[0].previousElementSibling?.matches(ACTION_ROW), "after the rows").to.equal(true);
        } else {
            expect(card, "in a card").to.equal(null);
        }
    });

}

/**
 * Applies the not yet applied actions of the last reply (in their order) : all applied without error.
 */
export function aiApplyAll() {

    aiClickApplyAll();

    aiAssertApplyAll("done");

}

/**
 * Applies the not yet applied actions of the last reply (in their order) : stops at the first error.
 */
export function aiClickApplyAll() {

    cy.get(MESSAGES).last().find(APPLY_ALL_BUTTON).click();

}

/**
 * Performs again the (applied) action of a reply.
 *
 * @param fromLast 0 : the last reply, 1 : the one before, etc...
 */
export function aiReapplyLastAction(fromLast = 0) {

    aiLastAction(fromLast).find("[data-cy='ai-action-reapply']").click();
    aiAssertLastActionState("applied", fromLast);

}

/**
 * Performs the action of the last reply : not applied, the error is displayed in the action card (ai.applyActionError).
 *
 * @param messageParts e.g., "unknown option(s)", "unknown.option"
 */
export function aiApplyLastActionWithError(...messageParts: string[]) {

    aiLastAction().find("[data-cy='ai-action-apply']").click();
    aiAssertLastActionState("error");

    // The quoted values of the message might be decorated (e.g., **'ww0'**) : check the parts only.
    aiLastAction().find("[data-cy='ai-action-apply-error']").should($error => {
        const text = $error.text();
        expect(text).to.contain("Couldn't apply to dashboard:");
        messageParts.forEach(part => expect(text).to.contain(part));
    });

}

// ---------------------------------------------------------------------------------------------------------------------
// Code blocks (see AICodeBlock, DashboardAIAssistant : CODE_BLOCKS)
// ---------------------------------------------------------------------------------------------------------------------

/**
 * The fenced code language (e.g., ```mdx) to the renderer of the dashboard editor :
 * <ul>
 *     <li>action : json w/ an 'action' field in a reply (AIJsonResponseBlockRenderer : AIActionRenderer),</li>
 *     <li>plain : other json (AIJsonResponseBlockRenderer : AICodeHighlighter only, no card),</li>
 *     <li>card : any other language, e.g., mdx, sql, js (BaseSimpleActionCard + AICodeHighlighter).</li>
 * </ul>
 */
export type AICodeBlockKind = "action" | "plain" | "card";

export interface AICodeBlock {

    kind: AICodeBlockKind;

    /**
     * Highlighted w/ the MDX grammar (mdxLang : e.g., [Measures] as squareBracket tokens).
     */
    mdx?: boolean;

    /**
     * The card button (e.g., "Use this JS code" for the js blocks setting a field, see AIJavascriptResponseBlockRenderer).
     */
    button?: string;

    /**
     * The displayed code (action : none).
     */
    code?: string;

}

/**
 * The code blocks of the message are not streamed anymore : no progress (ai.generatingCode).
 */
function codeBlockAsObject(pre: HTMLElement): AICodeBlock {

    if (pre.matches(ACTION_ROW)) {
        return {kind: "action"};
    }

    const actions = pre.querySelector(".Ic3BaseSimpleActionCard-actions");
    const button = actions?.querySelector("button")?.textContent?.trim();

    const block: AICodeBlock = {
        kind: actions ? "card" : "plain",
        mdx: pre.querySelector("code .token.squareBracket") != null,
        code: pre.querySelector("code")?.textContent ?? "",
    };

    if (button) {
        block.button = button;
    }

    return block;
}

function codeBlocks(role: "question" | "answer", fromLast: number) {

    return cy.get(`${ASSISTANT} [data-cy='ai-${role}']`).eq(-1 - fromLast);

}

/**
 * The code blocks (document order) : the actions are the rows of their cards (see AIActionGroupCard), the other ones
 * a pre (the streamed code is rendered in a nested pre, see AICodeHighlighter ; the details of an action too).
 */
function topLevelCodeBlocks($message: JQuery<HTMLElement>): HTMLElement[] {

    const content = ".ic3AIAssistant-messageContent";

    return $message.find(`${content} pre, ${content} ${ACTION_ROW}`).toArray()
        .filter(block => block.matches(ACTION_ROW) || (
            block.parentElement?.closest(`pre, ${ACTION_ROW}`) == null && block.querySelector(ACTION_ROW) == null
        ));

}

/**
 * @param role the last question or the last reply
 * @param expected the code blocks (document order) : mdx defaults to false, button to none
 */
export function aiAssertCodeBlocks(role: "question" | "answer", expected: AICodeBlock[]) {

    const normalized = expected.map(e => e.kind === "action" ? {kind: "action"} : ({mdx: false, ...e}));

    codeBlocks(role, 0).should($message => {

        const actual = topLevelCodeBlocks($message).map(codeBlockAsObject);

        expect(actual).to.deep.equal(normalized);

    });

}

/**
 * The code block of the last reply is being streamed : partial code w/ a progress (ai.generatingCode), no renderer yet.
 */
export function aiAssertStreamingCodeBlock() {

    codeBlocks("answer", 0).should($message => {
        const blocks = topLevelCodeBlocks($message);
        expect(blocks, "code blocks").not.to.be.empty;
        const $pre = Cypress.$(blocks[blocks.length - 1]);
        expect($pre.find(".Ic3BaseSimpleActionCard-actions"), "card").to.have.length(1);
        expect($pre.find(".MuiCircularProgress-root"), "progress").to.have.length(1);
        expect($pre.find(ACTION_ROW), "action").to.have.length(0);
    });

}

export function aiNewChat() {

    cy.get(`${TOOLBAR} [data-cy='ai-new-chat']`).click();

}

// ---------------------------------------------------------------------------------------------------------------------
// Chat History (menu)
// ---------------------------------------------------------------------------------------------------------------------

export function aiOpenHistory() {

    cy.get(`${TOOLBAR} [data-cy='ai-history']`).click();

    cy.get(HISTORY).should("be.visible");
    cy.get(`${HISTORY} .AIConversationHistory-skeleton`).should("not.exist");
    cy.get(`${HISTORY}.AIConversationHistory-pending`).should("not.exist");

}

export function aiCloseHistory() {

    // Click away (Escape is not reliable : the focus is not always within the menu).
    // The click goes to the topmost element at that point (e.g., the invisible backdrop of the menu).
    // An item actions menu (e.g., after a delete) is above the history menu : close it first.
    cy.get("body").then($body => {
        if ($body.find(".AIConversationHistory-actionsMenu").length > 0) {
            cy.get("body").click("topLeft");
            cy.get(".AIConversationHistory-actionsMenu").should("not.exist");
        }
    });

    cy.get("body").click("topLeft");
    cy.get(HISTORY).should("not.exist");

}

/**
 * The caption generated by the agent from the first question : the in-memory LLM (APP_DEFAULT_LLM_MODEL=ic3::in-memory)
 * is asked for a title w/ 'MESSAGE: ' + the question that does not start w/ "papagayo:" : echo mode, i.e.,
 * "response: " + the reversed text (see InMemoryLLMClient.executeEcho and ConversationNameGenerator.sanitize/takeWords).
 *
 * @param firstQuestion e.g., "papagayo: cy123 hello"
 * @return e.g., "response: olleh 321yc :oyagapap :EGASSEM"
 */
export function aiCaption(firstQuestion: string) {

    const echo = "response: " + ("MESSAGE: " + firstQuestion.substring(0, 1000)).split("").reverse().join("");

    const sanitized = echo.trim()
        .split("\n")[0]
        .trim()
        .replace(/^["'`“”«»]+|["'`“”«»]+$/g, "")
        .replace(/[.!:]+$/, "")
        .substring(0, 128)
        .trim();

    return sanitized.split(/\s+/).slice(0, 12).join(" ");
}

/**
 * @param captionOrQuestion the caption (e.g., renamed) or the first question (see aiCaption())
 */
function toCaption(captionOrQuestion: string) {

    return captionOrQuestion.startsWith(PAPAGAYO) ? aiCaption(captionOrQuestion) : captionOrQuestion;

}

function escapeRegExp(text: string) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function historyItem(captionOrQuestion: string) {

    const caption = toCaption(captionOrQuestion);

    return cy.contains(`${HISTORY_ITEM} .AIConversationHistory-itemCaption`, new RegExp("^" + escapeRegExp(caption) + "$"))
        .closest(".AIConversationHistory-item");

}

/**
 * The history menu is opened.
 *
 * @param captionsOrQuestions in the expected order (most recent first) : other conversations (e.g., other runs)
 * are ignored ; the caption or the first question (see aiCaption()).
 */
export function aiAssertHistory(captionsOrQuestions: string[]) {

    const captions = captionsOrQuestions.map(toCaption);

    cy.get(`${HISTORY}.AIConversationHistory-pending`).should("not.exist");

    cy.get(`${HISTORY_ITEM} .AIConversationHistory-itemCaption`).should($captions => {
        const actual = $captions.toArray().map(e => e.textContent).filter(c => captions.includes(c!));
        expect(actual).to.deep.equal(captions);
    });

}

/**
 * The history menu is opened.
 */
export function aiAssertNotInHistory(captionOrQuestion: string) {

    const caption = toCaption(captionOrQuestion);

    cy.get(`${HISTORY}.AIConversationHistory-pending`).should("not.exist");

    cy.get(HISTORY).should($history => {
        const actual = $history.find(".AIConversationHistory-itemCaption").toArray().map(e => e.textContent);
        expect(actual).not.to.include(caption);
    });

}

/**
 * The history menu is opened : the current conversation is selected.
 */
export function aiAssertHistorySelected(caption: string | null) {

    if (caption) {
        historyItem(caption).should("have.class", "Mui-selected");
    }

    cy.get(`${HISTORY_ITEM}.Mui-selected`).should("have.length", caption ? 1 : 0);

}

/**
 * The history menu is opened : brings back the conversation (the menu is closed).
 */
export function aiSelectFromHistory(caption: string) {

    historyItem(caption).click();
    cy.get(HISTORY).should("not.exist");

}

/**
 * The actions button is displayed on hover only.
 */
function openItemActions(caption: string) {

    historyItem(caption).find("button[aria-label='actions']").click({force: true});

}

/**
 * The history menu is opened (and is kept opened).
 */
export function aiDeleteFromHistory(caption: string) {

    openItemActions(caption);
    cy.get(".AIConversationHistory-actionsMenu [cypress-cy='delete']").click();

    cy.get(".MuiDialog-root [role='dialog']").should("contain.text", "Are you sure to delete this chat?");
    cy.get(".MuiDialog-root [data-cy='button-ok']").click();
    cy.get(".MuiDialog-root").should("not.exist");

    aiAssertNotInHistory(caption);

}

/**
 * The history menu is opened (and is kept opened).
 */
export function aiRenameFromHistory(captionOrQuestion: string, newCaption: string) {

    const caption = toCaption(captionOrQuestion);

    openItemActions(caption);
    cy.get(".AIConversationHistory-actionsMenu [cypress-cy='rename']").click();

    cy.get(".MuiDialog-root input").should("have.value", caption).clear().type(newCaption);
    cy.get(".MuiDialog-root [data-cy='button-ok']").click();
    cy.get(".MuiDialog-root").should("not.exist");

    historyItem(newCaption).should("exist");

}

// ---------------------------------------------------------------------------------------------------------------------
// Cleanup
// ---------------------------------------------------------------------------------------------------------------------

interface AICreatedConversation {
    id: string;
    scope: string;
}

let createdConversations: AICreatedConversation[] = [];

/**
 * To be called in beforeEach() : records the conversations created by the UI (id and scope as sent by the UI)
 * to delete them afterward (see aiDeleteConversations()).
 */
export function aiTrackConversations() {

    createdConversations = [];

    cy.intercept("POST", "**/icCube/ai/conversations", req => {

        const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body ?? {});
        const scope: string = body.scope ?? "";

        req.continue(res => {

            const created = typeof res.body === "string" ? JSON.parse(res.body || "{}") : (res.body ?? {});

            if (created.id) {
                createdConversations.push({id: created.id, scope});
            }

        });

    }).as("aiCreateConversation");

}

/**
 * To be called in afterEach() : deletes (server side) the conversations created during the test.
 */
export function aiDeleteConversations() {

    cy.wrap(null).then(() => {

        const conversations = createdConversations;
        createdConversations = [];

        deleteConversations("AI cleanup", conversations);

    });

}

/**
 * 404 : already deleted (e.g., by the test itself : delete from history).
 */
function deleteConversations(label: string, conversations: AICreatedConversation[]) {

    cy.log(`${label} : ${conversations.length} conversation(s)`);

    conversations.forEach(c => cy.request({
        method: "POST",
        url: `/icCube/ai/conversations/${c.id}/delete`,
        body: {scope: c.scope},
        failOnStatusCode: false,
    }).then(response => {
        expect(response.status, `delete conversation ${c.id}`).to.be.oneOf([200, 202, 404]);
    }));

}

/**
 * The scope of the dashboard editor assistant (see AIActions : AI_SCOPE_DASHBOARD_EDITOR).
 */
export const AI_SCOPE_DASHBOARD_EDITOR = "dashboard-editor";

/**
 * Deletes (server side) all the conversations of the scope owned by the test user, i.e., including the ones not
 * tracked (see aiTrackConversations()) such as the leftovers of interrupted runs.
 *
 * Run once before the tests (see cypress/cleanup/AICleanup.cleanup.ts) : the shards of the CI run in parallel w/ the
 * same user, i.e., not from a spec (another AI spec running at the same time would lose its conversations).
 */
export function aiDeleteAllConversations(scope = AI_SCOPE_DASHBOARD_EDITOR) {

    // The requests are sent w/ the session cookie.
    cy.login();

    cy.request({
        method: "POST",
        url: "/icCube/ai/conversations/recents",
        body: {scope, limit: 10000},
    }).then(response => {

        const body = typeof response.body === "string" ? JSON.parse(response.body || "[]") : (response.body ?? []);
        const conversations: { id: string }[] = Array.isArray(body) ? body : [];

        deleteConversations(`AI cleanup (${scope}) : all`, conversations.map(c => ({id: c.id, scope})));

    });

}
