import {
    AICodeBlock,
    aiAssertCodeBlocks,
    aiAssertEmpty,
    aiAssertStreamingCodeBlock,
    aiDeleteConversations,
    aiOpenEditorAssistant,
    aiSendMultiline,
    aiSendMultilineNoWait,
    aiTrackConversations,
    aiWaitReply
} from "./utils";

export {};

/*
    Dashboard Editor : AI Assistant code blocks, i.e., the renderer according to the fenced code language
    (see AICodeBlock and DashboardAIAssistant : CODE_BLOCKS) :

        json        : action card if an icCube action in a reply, plain code otherwise (no card)
        js          : code card w/ a 'Use this JS code' button when the field is known (js-<field> or buildChart)
        mdx         : code card highlighted w/ the MDX grammar
        any other   : code card (no button)

    Requires the papagayo mode (the reply is the question w/o its "papagayo:" prefix) : the questions and the
    replies have the same code blocks (the question never renders an action card).
 */

const MDX = "SELECT [Measures].[Amount] ON 0, [Product].[Product].[Article].members ON 1 FROM [Sales]";

const ACTION = JSON.stringify({action: "edit-widget-options", widgetId: "ww0", options: {"$-title": "AI Title"}});

const USE_JS = "Use this JS code";

describe("AI/Editor Assistant Code Blocks", () => {

    beforeEach(() => {

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

    it("mdx : code card highlighted w/ the MDX grammar", () => {

        aiSendMultiline(
            "An MDX query :",
            "```mdx", MDX, "```",
        );

        const expected: AICodeBlock[] = [{kind: "card", mdx: true, code: MDX}];

        aiAssertCodeBlocks("answer", expected);
        aiAssertCodeBlocks("question", expected);

    });

    it("mdx : multi-line query", () => {

        const lines = [
            "SELECT",
            "  [Measures].[Amount] ON 0,",
            "  [Product].[Product].[Article].members ON 1",
            "FROM [Sales]",
        ];

        aiSendMultiline("```mdx", ...lines, "```");

        aiAssertCodeBlocks("answer", [{kind: "card", mdx: true, code: lines.join("\n")}]);

    });

    it("other languages : code card, not the MDX grammar", () => {

        // MDX-like code : the language decides, not the content
        aiSendMultiline(
            "```sql", MDX, "```",
            "```foo", "bar", "```",
        );

        const expected: AICodeBlock[] = [
            {kind: "card", code: MDX},
            {kind: "card", code: "bar"},
        ];

        aiAssertCodeBlocks("answer", expected);
        aiAssertCodeBlocks("question", expected);

    });

    it("js : 'Use this JS code' button when the field is known", () => {

        aiSendMultiline(
            // buildChart : the chartOptions.jsCode field
            "```js", "function buildChart() {}", "```",
            // the field from the language
            "```js-tooltip", "var y = 1;", "```",
            // unknown field : no button
            "```javascript", "var x = 1;", "```",
            "```js", "var z = 1;", "```",
        );

        const expected: AICodeBlock[] = [
            {kind: "card", button: USE_JS, code: "function buildChart() {}"},
            {kind: "card", button: USE_JS, code: "var y = 1;"},
            {kind: "card", code: "var x = 1;"},
            {kind: "card", code: "var z = 1;"},
        ];

        aiAssertCodeBlocks("answer", expected);
        aiAssertCodeBlocks("question", expected);

    });

    it("json : action card in the reply only, plain code otherwise", () => {

        aiSendMultiline(
            "```json", ACTION, "```",
            "```json", `{"a":1}`, "```",
        );

        // an icCube action : action card (reply only)
        aiAssertCodeBlocks("answer", [
            {kind: "action"},
            {kind: "plain", code: `{"a":1}`},
        ]);

        aiAssertCodeBlocks("question", [
            {kind: "plain", code: ACTION},
            {kind: "plain", code: `{"a":1}`},
        ]);

    });

    it("json : invalid json is plain code", () => {

        const invalid = `{"action": "edit-widget-options",`;

        aiSendMultiline("```json", invalid, "```");

        aiAssertCodeBlocks("answer", [{kind: "plain", code: invalid}]);

    });

    it("several code blocks in a single reply (document order)", () => {

        aiSendMultiline(
            "Some text",
            "```mdx", MDX, "```",
            "more text",
            "```json", ACTION, "```",
            "```js", "function buildChart() {}", "```",
            "```sql", "select * from t", "```",
            "the end",
        );

        aiAssertCodeBlocks("answer", [
            {kind: "card", mdx: true, code: MDX},
            {kind: "action"},
            {kind: "card", button: USE_JS, code: "function buildChart() {}"},
            {kind: "card", code: "select * from t"},
        ]);

    });

    it("streaming : progress card, then the final renderer", () => {

        // slow enough to check the streaming state (300ms per word)
        aiSendMultilineNoWait(
            "chunk:300",
            "```mdx", MDX, "```",
            "the end of the reply is not received yet",
        );

        // partial code : no MDX highlighting yet, no button
        aiAssertStreamingCodeBlock();

        aiWaitReply();

        aiAssertCodeBlocks("answer", [{kind: "card", mdx: true, code: MDX}]);

    });

    it("streaming : json action rendered once complete", () => {

        // pretty-printed : streamed word by word (the fence is open for a while)
        aiSendMultilineNoWait(
            "chunk:300",
            "```json", JSON.stringify({action: "edit-widget-options", widgetId: "ww0", options: {"$-title": "a slow AI title"}}, null, 2), "```",
            "the end of the reply is not received yet",
        );

        aiAssertStreamingCodeBlock();

        aiWaitReply();

        aiAssertCodeBlocks("answer", [{kind: "action"}]);

    });

});
