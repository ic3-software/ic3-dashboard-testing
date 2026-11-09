import {
    aiApplyAll,
    aiApplyLastAction,
    aiApplyLastActionWithError,
    aiAssertActionCards,
    aiAssertApplyAll,
    aiAssertApplyAllPlacement,
    aiAssertEmpty,
    aiAssertLastAction,
    aiAssertLastActionState,
    aiClickApplyAll,
    aiDeleteConversations,
    aiExpandLastAction,
    aiLastAction,
    aiOpenEditorAssistant,
    aiReapplyLastAction,
    aiSendAction,
    aiSendActions,
    aiSendReply,
    aiTrackConversations
} from "./utils";
import {dashboardUnselectAll, editorAssertText, useSalesSchema} from "../Editor/utils";

export {};

/*
    Dashboard Editor : AI Assistant replies containing an action (json code block, see AIDashboardActionsRegister).

    Requires the fake AI agent (papagayo : the reply is the question w/o its "papagayo:" prefix) : the question is
    the json code block of the action and so is the reply (rendered as an action row w/ an 'Apply Changes' button, auto-commit off).
    Once applied : 'Reapply' button ; on error : the error message in the row (no button).

    Consecutive actions (no text in between) are the rows of a single card. From 2 actions an 'Apply all' : in the footer
    of the last card (a single card or the last one ends the reply), its own card otherwise (see IAIMessageModel.applyAll).

    Setup : 'Editor/Empty Report' (fixed layout, nothing saved) + Sales schema + 2 widgets created from scratch
    w/ the build-widget action (one below the other, full width) :
        ww0 : Pivot Table
        ww1 : Table
 */

const MDX = "SELECT [Time].[Calendar].[Year].members.head(3) ON 0, [Product].[Product].[Article].members ON 1 FROM [Sales] WHERE [Measures].[Amount]";
const MDX_HEAD1 = "SELECT [Time].[Calendar].[Year].members.head(1) ON 0, [Product].[Product].[Article].members ON 1 FROM [Sales] WHERE [Measures].[Amount]";
const MDX_HEAD2 = "SELECT [Time].[Calendar].[Year].members.head(2) ON 0, [Product].[Product].[Article].members ON 1 FROM [Sales] WHERE [Measures].[Amount]";

const WW0_TITLE = "Pivot Table";
const WW1_TITLE = "Table";

// 3 years + the left header (pivot table) / the row header column (table)
const COL_COUNT = 4;
const ROW_COUNT = 5;

/**
 * Creates the widget from scratch w/ the build-widget action and waits for its rendering.
 */
function buildWidget(widgetId: string, templateId: string, widgetTitle: string) {

    aiSendAction({
        action: "build-widget",
        templateId,
        mdx: MDX,
        widgetTitle,
    });

    aiAssertLastAction("Add Widget:");
    cy.get(`[data-cy="widget-box-${widgetId}"]`).should("not.exist");

    aiApplyLastAction();

    cy.assertWidgetHeader(widgetId, `[${widgetId}] ${widgetTitle}`);

}

function undo() {
    cy.get('[data-cy="toolbar-undo"]').click();
}

function assertWw1Untouched() {
    cy.assertWidgetHeader("ww1", "[ww1] " + WW1_TITLE);
    cy.assertTableColCount("ww1", COL_COUNT);
    cy.assertTableRowCount("ww1", ROW_COUNT);
}

describe("AI/Editor Assistant Actions", () => {

    beforeEach(() => {

        aiTrackConversations();

        cy.login();
        cy.openEditorTestReport("Editor/Empty Report");
        cy.waitForQueryCount(0);

        useSalesSchema();

        // the dashboard settings (no widget selected)
        dashboardUnselectAll();

        aiOpenEditorAssistant();
        aiAssertEmpty();

        buildWidget("ww0", "ic3.PivotTable", WW0_TITLE);
        buildWidget("ww1", "ic3.Table", WW1_TITLE);

        cy.assertPivotTableColCount("ww0", COL_COUNT);
        cy.assertPivotTableRowCount("ww0", ROW_COUNT);
        assertWw1Untouched();

    });

    afterEach(() => {

        aiDeleteConversations();

    });

    it("build-widget", () => {

        // a third one (ww0 and ww1 are created the same way)
        buildWidget("ww2", "ic3.Table", "AI Table");

        // fixed layout w/o rectangle : below the lowest widget (full width)
        cy.assertTableColCount("ww2", COL_COUNT);
        cy.assertTableRowCount("ww2", ROW_COUNT);

        assertWw1Untouched();

    });

    it("edit-widget-options", () => {

        aiSendAction({
            action: "edit-widget-options",
            widgetId: "ww0",
            options: {"$-title": "AI Title"},
        });

        aiAssertLastAction("Edit Widget Options");
        cy.assertWidgetHeader("ww0", "[ww0] " + WW0_TITLE);

        // a single action : its own Apply button (no apply all)
        aiAssertApplyAll(null);

        aiApplyLastAction();

        cy.assertWidgetHeader("ww0", "[ww0] AI Title");
        assertWw1Untouched();

        // applied : can be reapplied
        aiReapplyLastAction();
        cy.assertWidgetHeader("ww0", "[ww0] AI Title");

    });

    it("edit-dashboard-options", () => {

        aiSendAction({
            action: "edit-dashboard-options",
            options: {"synopsis": "AI synopsis"},
        });

        aiAssertLastAction("Edit Dashboard Options");

        aiApplyLastAction();

        // the dashboard settings are open (AI tab)
        editorAssertText("properties-synopsis", "AI synopsis", "tab-report-properties");

        assertWw1Untouched();

    });

    it("reorder-widgets", () => {

        aiSendAction({
            action: "reorder-widgets",
            positions: [
                {widgetId: "ww0", rectangle: {top: 500, left: 50, width: 400, height: 300}},
            ],
        });

        aiAssertLastAction("Reorder Widgets");

        aiApplyLastAction();

        cy.assertWidgetDetails(0, "ww0", 50, 500, 400, 300);

        // not listed : kept as is
        assertWw1Untouched();

    });

    it("delete-widgets", () => {

        // a third one : 2 out of 3 deleted
        buildWidget("ww2", "ic3.Table", "AI Table");

        aiSendAction({
            action: "delete-widgets",
            widgetIds: ["ww0", "ww2"],
        });

        aiAssertLastAction("Delete Widgets");

        // a chip per widget : its title (in the details, collapsed by default)
        aiExpandLastAction();
        aiLastAction().should("contain.text", WW0_TITLE).and("contain.text", "AI Table");

        aiApplyLastAction();

        cy.get('[data-cy="widget-box-ww0"]').should("not.exist");
        cy.get('[data-cy="widget-box-ww2"]').should("not.exist");

        // not listed : kept as is
        assertWw1Untouched();

        // a single undo step
        undo();

        cy.assertWidgetHeader("ww0", "[ww0] " + WW0_TITLE);
        cy.assertWidgetHeader("ww2", "[ww2] AI Table");
        assertWw1Untouched();

    });

    it("delete-widgets : an unknown widget, nothing deleted", () => {

        aiSendAction({
            action: "delete-widgets",
            widgetIds: ["ww0", "ww9"],
        });

        aiAssertLastAction("Delete Widgets");

        aiApplyLastActionWithError("unknown widget", "ww9");

        cy.assertWidgetHeader("ww0", "[ww0] " + WW0_TITLE);
        assertWw1Untouched();

    });

    it("set-widget-query", () => {

        aiSendAction({
            action: "set-widget-query",
            widgetId: "ww0",
            mdx: MDX_HEAD1,
        });

        aiAssertLastAction("Update Widget Query");
        cy.assertPivotTableColCount("ww0", COL_COUNT);

        aiApplyLastAction();

        // 1 year + the left header
        cy.assertPivotTableColCount("ww0", 2);
        cy.assertPivotTableRowCount("ww0", ROW_COUNT);

        // a second query
        aiSendAction({
            action: "set-widget-query",
            widgetId: "ww0",
            mdx: MDX_HEAD2,
        });

        aiAssertLastAction("Update Widget Query");
        aiApplyLastAction();

        // 2 years + the left header
        cy.assertPivotTableColCount("ww0", 3);
        cy.assertPivotTableRowCount("ww0", ROW_COUNT);

        // reapply the first query (the second one is still applied : not changed)
        aiReapplyLastAction(1);
        aiAssertLastActionState("applied");

        cy.assertPivotTableColCount("ww0", 2);
        cy.assertPivotTableRowCount("ww0", ROW_COUNT);

        assertWw1Untouched();

    });

    it("2 actions in a single reply : a single card, applied one by one", () => {

        aiSendActions([
            {action: "edit-widget-options", widgetId: "ww0", options: {"$-title": "AI Title 0"}},
            {action: "edit-widget-options", widgetId: "ww1", options: {"$-title": "AI Title 1"}},
        ]);

        // consecutive : the rows of a single card, the apply all in its footer
        aiAssertApplyAll("idle", 2);
        aiAssertApplyAllPlacement("footer");

        // fromLast : 1 = the first row, 0 = the second (last) one

        // the second one first : the first one is untouched
        aiApplyLastAction(0);
        aiAssertLastActionState("idle", 1);

        cy.assertWidgetHeader("ww1", "[ww1] AI Title 1");
        cy.assertWidgetHeader("ww0", "[ww0] " + WW0_TITLE);

        aiAssertApplyAll("partial", 1);

        aiApplyLastAction(1);
        aiAssertLastActionState("applied", 0);

        cy.assertWidgetHeader("ww0", "[ww0] AI Title 0");
        cy.assertWidgetHeader("ww1", "[ww1] AI Title 1");

        // all applied by hand
        aiAssertApplyAll("done");

    });

    it("5 actions in a single reply : apply all", () => {

        aiSendActions([
            {action: "edit-widget-options", widgetId: "ww0", options: {"$-title": "AI Title 0"}},
            {action: "edit-widget-options", widgetId: "ww1", options: {"$-title": "AI Title 1"}},
            {action: "set-widget-query", widgetId: "ww0", mdx: MDX_HEAD1},
            {action: "reorder-widgets", positions: [{widgetId: "ww0", rectangle: {top: 500, left: 50, width: 400, height: 300}}]},
            {action: "edit-dashboard-options", options: {"synopsis": "AI synopsis"}},
        ]);

        aiAssertApplyAll("idle", 5);
        aiAssertApplyAllPlacement("footer");

        // nothing applied yet
        cy.assertWidgetHeader("ww0", "[ww0] " + WW0_TITLE);
        cy.assertPivotTableColCount("ww0", COL_COUNT);
        assertWw1Untouched();

        // one applied by hand (fromLast 3 : the second row) : the remaining ones
        aiApplyLastAction(3);
        cy.assertWidgetHeader("ww1", "[ww1] AI Title 1");

        aiAssertApplyAll("partial", 4);

        aiApplyAll();

        for (let fromLast = 0; fromLast < 5; fromLast++) {
            aiAssertLastActionState("applied", fromLast);
        }

        cy.assertWidgetHeader("ww0", "[ww0] AI Title 0");
        cy.assertWidgetHeader("ww1", "[ww1] AI Title 1");

        // 1 year + the left header
        cy.assertPivotTableColCount("ww0", 2);
        cy.assertPivotTableRowCount("ww0", ROW_COUNT);

        cy.assertWidgetDetails(0, "ww0", 50, 500, 400, 300);

        // the table untouched (title apart)
        cy.assertTableColCount("ww1", COL_COUNT);
        cy.assertTableRowCount("ww1", ROW_COUNT);

        // last : leaves the AI tab
        editorAssertText("properties-synopsis", "AI synopsis", "tab-report-properties");

    });

    it("text in between and after : a card per group, apply all in its own card", () => {

        aiSendReply(
            "First, rename the pivot table:",
            {action: "edit-widget-options", widgetId: "ww0", options: {"$-title": "AI Title 0"}},
            "Then the table:",
            {action: "edit-widget-options", widgetId: "ww1", options: {"$-title": "AI Title 1"}},
            {action: "set-widget-query", widgetId: "ww1", mdx: MDX_HEAD1},
            "Both are undone in a single step.",
        );

        aiAssertActionCards([1, 2]);

        aiAssertApplyAll("idle", 3);
        aiAssertApplyAllPlacement("standalone");

        aiApplyAll();

        for (let fromLast = 0; fromLast < 3; fromLast++) {
            aiAssertLastActionState("applied", fromLast);
        }

        cy.assertWidgetHeader("ww0", "[ww0] AI Title 0");
        cy.assertWidgetHeader("ww1", "[ww1] AI Title 1");

        // 1 year + the row header column
        cy.assertTableColCount("ww1", 2);

    });

    it("the last card ends the reply : apply all in its footer", () => {

        aiSendReply(
            "First, rename the pivot table:",
            {action: "edit-widget-options", widgetId: "ww0", options: {"$-title": "AI Title 0"}},
            "Then the table:",
            {action: "edit-widget-options", widgetId: "ww1", options: {"$-title": "AI Title 1"}},
            {action: "set-widget-query", widgetId: "ww1", mdx: MDX_HEAD1},
        );

        aiAssertActionCards([1, 2]);

        aiAssertApplyAll("idle", 3);
        aiAssertApplyAllPlacement("footer");

    });

    it("apply all : stops at the first error, the remaining ones can be applied later", () => {

        aiSendActions([
            {action: "edit-widget-options", widgetId: "ww0", options: {"$-title": "AI Title 0"}},
            {action: "edit-widget-options", widgetId: "ww1", options: {"unknown.option": 1}},
            {action: "edit-dashboard-options", options: {"synopsis": "AI synopsis"}},
        ]);

        aiClickApplyAll();

        // fromLast : 2 = the first row, 1 = the invalid one, 0 = the last one (not applied)
        aiAssertLastActionState("applied", 2);
        aiAssertLastActionState("error", 1);
        aiAssertLastActionState("idle", 0);

        aiAssertApplyAll("error", 2);

        cy.assertWidgetHeader("ww0", "[ww0] AI Title 0");
        assertWw1Untouched();

        // the last one by hand : the invalid one is still pending
        aiApplyLastAction(0);
        aiAssertApplyAll("error", 1);

        editorAssertText("properties-synopsis", "AI synopsis", "tab-report-properties");

    });

    it("apply all : undone as a single step", () => {

        // Not w/ set-widget-query : undoing it breaks the rendering of the widget (to be fixed, not the apply all).
        aiSendActions([
            {action: "edit-widget-options", widgetId: "ww0", options: {"$-title": "AI Title 0"}},
            {action: "edit-widget-options", widgetId: "ww1", options: {"$-title": "AI Title 1"}},
        ]);

        aiApplyAll();

        cy.assertWidgetHeader("ww0", "[ww0] AI Title 0");
        cy.assertWidgetHeader("ww1", "[ww1] AI Title 1");

        undo();

        // the whole apply all at once
        cy.assertWidgetHeader("ww0", "[ww0] " + WW0_TITLE);
        assertWw1Untouched();

    });

    it("invalid action : not performed", () => {

        // an unknown option : the whole action is rejected (the title is not changed either)
        aiSendAction({
            action: "edit-widget-options",
            widgetId: "ww0",
            options: {"$-title": "AI Title", "unknown.option": 1},
        });

        aiAssertLastAction("Edit Widget Options");

        // the error is displayed in the card : only the unknown option is listed
        aiApplyLastActionWithError("unknown option(s)", "unknown.option");
        aiLastAction().find("[data-cy='ai-action-apply-error']").should("not.contain.text", "$-title");

        cy.assertWidgetHeader("ww0", "[ww0] " + WW0_TITLE);
        assertWw1Untouched();

    });

});
