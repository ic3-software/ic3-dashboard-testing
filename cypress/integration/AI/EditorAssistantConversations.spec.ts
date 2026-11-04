import {
    aiAssertEmpty,
    aiAssertHistory,
    aiAssertHistorySelected,
    aiAssertMessages,
    aiAssertNotInHistory,
    aiCloseHistory,
    aiDeleteAllConversations,
    aiDeleteConversations,
    aiDeleteFromHistory,
    aiNewChat,
    aiOpenEditorAssistant,
    aiOpenHistory,
    aiPapagayo,
    aiQuestion,
    aiRenameFromHistory,
    aiRunId,
    aiSelectFromHistory,
    aiSend,
    aiSendNoWait,
    aiStop,
    aiTrackConversations
} from "./utils";

export {};

/*
    Dashboard Editor : AI Assistant conversations (simple messages, no actions).

    Requires the in-memory LLM (papagayo : the questions start with "papagayo:" and the reply is the question w/o
    this prefix) : the caption is generated from the first question (see aiCaption()) ; the history helpers accept
    either the caption or the first question.
 */

describe("AI/Editor Assistant Conversations", () => {

    let run: string;

    beforeEach(() => {

        run = aiRunId();

        aiTrackConversations();

        cy.login();
        cy.openEditorTestReport("Editor/Empty Report");
        cy.waitForQueryCount(0);

        aiOpenEditorAssistant();
        aiAssertEmpty();

    });

    afterEach(() => {

        aiDeleteConversations();

    });

    after(() => {

        aiDeleteAllConversations();

    });

    it("Single message : papagayo reply", () => {

        const q1 = aiQuestion(`${run} hello`);

        aiSend(q1);
        aiAssertMessages(aiPapagayo(q1));

        aiOpenHistory();
        aiAssertHistory([q1]);
        aiAssertHistorySelected(q1);
        aiCloseHistory();

    });

    it("Several messages in the same conversation", () => {

        const q1 = aiQuestion(`${run} first`);
        const q2 = aiQuestion(`${run} second`);
        const q3 = aiQuestion(`${run} third`);

        aiSend(q1);
        aiSend(q2);
        aiSend(q3);

        aiAssertMessages(aiPapagayo(q1, q2, q3));

        // a single conversation : the caption is the first question
        aiOpenHistory();
        aiAssertHistory([q1]);
        aiAssertNotInHistory(q2);
        aiAssertNotInHistory(q3);
        aiCloseHistory();

    });

    it("Several conversations : new chat and bring them back", () => {

        const a1 = aiQuestion(`${run} conv A one`);
        const a2 = aiQuestion(`${run} conv A two`);
        const b1 = aiQuestion(`${run} conv B one`);
        const c1 = aiQuestion(`${run} conv C one`);

        aiSend(a1);
        aiSend(a2);

        aiNewChat();
        aiAssertEmpty();
        aiSend(b1);
        aiAssertMessages(aiPapagayo(b1));

        aiNewChat();
        aiAssertEmpty();
        aiSend(c1);
        aiAssertMessages(aiPapagayo(c1));

        // most recent first
        aiOpenHistory();
        aiAssertHistory([c1, b1, a1]);
        aiAssertHistorySelected(c1);

        aiSelectFromHistory(a1);
        aiAssertMessages(aiPapagayo(a1, a2));

        aiOpenHistory();
        aiAssertHistorySelected(a1);

        aiSelectFromHistory(b1);
        aiAssertMessages(aiPapagayo(b1));

        // continue a conversation brought back : it becomes the most recent one
        aiOpenHistory();
        aiSelectFromHistory(a1);
        aiAssertMessages(aiPapagayo(a1, a2));

        const a3 = aiQuestion(`${run} conv A three`);
        aiSend(a3);
        aiAssertMessages(aiPapagayo(a1, a2, a3));

        aiOpenHistory();
        aiAssertHistory([a1, c1, b1]);
        aiAssertHistorySelected(a1);

        // and from the server again
        aiSelectFromHistory(c1);
        aiAssertMessages(aiPapagayo(c1));

        aiOpenHistory();
        aiSelectFromHistory(a1);
        aiAssertMessages(aiPapagayo(a1, a2, a3));

    });

    it("New chat : not listed before a message is sent", () => {

        const a1 = aiQuestion(`${run} conv A`);

        aiSend(a1);

        aiNewChat();
        aiAssertEmpty();

        aiOpenHistory();
        aiAssertHistory([a1]);
        aiAssertHistorySelected(null);
        aiCloseHistory();

        aiAssertEmpty();

    });

    it("Delete conversations", () => {

        const a1 = aiQuestion(`${run} conv A`);
        const b1 = aiQuestion(`${run} conv B`);
        const c1 = aiQuestion(`${run} conv C`);

        aiSend(a1);
        aiNewChat();
        aiSend(b1);
        aiNewChat();
        aiSend(c1);

        aiOpenHistory();
        aiAssertHistory([c1, b1, a1]);

        // not the current one : the current conversation is untouched
        aiDeleteFromHistory(b1);
        aiAssertHistory([c1, a1]);
        aiAssertHistorySelected(c1);
        aiCloseHistory();

        aiAssertMessages(aiPapagayo(c1));

        // the current one : back to an empty assistant
        aiOpenHistory();
        aiDeleteFromHistory(c1);
        aiAssertHistory([a1]);
        aiAssertHistorySelected(null);
        aiCloseHistory();

        aiAssertEmpty();

        // the remaining one can still be brought back
        aiOpenHistory();
        aiSelectFromHistory(a1);
        aiAssertMessages(aiPapagayo(a1));

        // and deleted once brought back
        aiOpenHistory();
        aiDeleteFromHistory(a1);
        aiCloseHistory();

        aiAssertEmpty();

        // a new conversation once all deleted
        const d1 = aiQuestion(`${run} conv D`);

        aiSend(d1);
        aiAssertMessages(aiPapagayo(d1));

        aiOpenHistory();
        aiAssertHistory([d1]);
        aiAssertNotInHistory(a1);
        aiAssertNotInHistory(b1);
        aiAssertNotInHistory(c1);
        aiCloseHistory();

    });

    it("Rename a conversation", () => {

        const a1 = aiQuestion(`${run} conv A`);
        const b1 = aiQuestion(`${run} conv B`);
        const renamed = `${run} renamed A`;

        aiSend(a1);
        aiNewChat();
        aiSend(b1);

        aiOpenHistory();
        aiRenameFromHistory(a1, renamed);
        aiAssertNotInHistory(a1);
        aiAssertHistory([b1, renamed]);
        aiCloseHistory();

        // current conversation untouched
        aiAssertMessages(aiPapagayo(b1));

        // the renamed conversation still has its messages
        aiOpenHistory();
        aiSelectFromHistory(renamed);
        aiAssertMessages(aiPapagayo(a1));

        // the caption is kept when continuing the conversation
        const a2 = aiQuestion(`${run} conv A two`);
        aiSend(a2);

        aiOpenHistory();
        aiAssertHistory([renamed, b1]);
        aiAssertHistorySelected(renamed);
        aiCloseHistory();

    });

    it("Stop a question : not kept in the conversation", () => {

        const a1 = aiQuestion(`${run} conv A`);
        const a2 = `${run} conv A stopped`;
        const a3 = aiQuestion(`${run} conv A three`);

        aiSend(a1);

        // long enough to be stopped (see FakeAIAgent)
        aiSendNoWait(aiQuestion(`delay:30 ${a2}`));
        aiStop();

        // the conversation can be continued
        aiSend(a3);

        // from the server : the stopped question is not part of the conversation
        aiNewChat();
        aiAssertEmpty();

        aiOpenHistory();
        aiAssertHistory([a1]);
        aiSelectFromHistory(a1);
        aiAssertMessages(aiPapagayo(a1, a3));

    });

    it("Conversation kept when closing and opening again the editor", () => {

        const a1 = aiQuestion(`${run} conv A`);

        aiSend(a1);

        cy.widgetEditorClose();
        cy.get(".ic3App-drawer .ic3AIAssistant-root").should("not.exist");

        aiOpenEditorAssistant();
        aiAssertMessages(aiPapagayo(a1));

        const a2 = aiQuestion(`${run} conv A two`);
        aiSend(a2);
        aiAssertMessages(aiPapagayo(a1, a2));

    });

});
