import {aiApplyLastAction, aiApplyLastActionWithError, aiSendAction} from "./utils";
import {
    ARTICLES,
    assertFilteredBy,
    editorAssistantWidgetsHooks,
    MDX_F_ARTICLES,
    MDX_STD,
    mdxYearsBy,
    WID,
    WIDGETS
} from "./EditorAssistantWidgetsUtils";

export {};

/*
    Dashboard Editor : AI Assistant widgets (see EditorAssistantWidgetsUtils for the setup and the widget types).

    A filter widget publishes an event (build-widget 'eventName', otherwise named after its title) : the other
    widgets use it in their MDX as @{eventName}.

    Note : no interaction w/ the date range picker (typing its dates is not reliable in the CI, see the excluded
    DatePickerRangeBehavior.spec).
 */

/**
 * Sends the action and applies it (fails on error).
 */
function applyAction(action: any) {
    aiSendAction(action);
    aiApplyLastAction();
}

/**
 * Sends the action : rejected w/ an error, nothing created.
 */
function rejectAction(action: any, ...error: string[]) {
    aiSendAction(action);
    aiApplyLastActionWithError(...error);
    cy.get(`[data-cy="widget-box-${WID}"]`).should("not.exist");
}

function buildFilterButtons(widgetTitle: string, eventName?: string) {
    applyAction({
        action: "build-widget",
        templateId: "ic3.FilterButtons",
        mdx: MDX_F_ARTICLES,
        widgetTitle,
        ...(eventName !== undefined ? {eventName} : {}),
    });
}

function buildTableListeningTo(eventName: string) {
    applyAction({
        action: "build-widget",
        templateId: "ic3.Table",
        mdx: mdxYearsBy(eventName),
        widgetTitle: "AI Table",
    });
}

describe("AI/Editor Assistant Widgets (filter events)", () => {

    editorAssistantWidgetsHooks();

    it("build-widget w/ an 'eventName' : the table listening to it is filtered", () => {

        buildFilterButtons("AI Articles", "article");
        cy.assertButtons(WID, ARTICLES);

        buildTableListeningTo("article");

        assertFilteredBy("ww1", () => cy.selectButton(WID, "Gold"));

    });

    it("build-widget w/o 'eventName' : named after its title, made unique", () => {

        // ww0 : 'article'
        buildFilterButtons("AI Articles", "article");

        // ww1 : 'article' already published : 'article2'
        buildFilterButtons("Article");

        buildTableListeningTo("article2");

        assertFilteredBy("ww2", () => cy.selectButton("ww1", "Gold"));

    });

    it("edit-widget-options on the filter : still publishes its event", () => {

        buildFilterButtons("AI Articles", "article");
        buildTableListeningTo("article");

        // a new title : the event is not renamed
        applyAction({
            action: "edit-widget-options",
            widgetId: WID,
            options: {"$-title": "AI Renamed"},
        });

        cy.assertWidgetHeader(WID, `[${WID}] AI Renamed`);

        assertFilteredBy("ww1", () => cy.selectButton(WID, "Gold"));

    });

    it("build-widget w/ 'rangePicker' : a date range picker (start and end dates)", () => {

        const datePicker = WIDGETS.find(widget => widget.templateId === "ic3.DatePicker")!;

        applyAction({
            action: "build-widget",
            templateId: datePicker.templateId,
            mdx: datePicker.mdx,
            widgetTitle: "AI Range",
            eventName: "range",
            rangePicker: true,
        });

        cy.assertWidgetHeader(WID, `[${WID}] AI Range`);
        cy.assertDatePickerRangeFrom(WID, null);
        cy.assertDatePickerRangeTo(WID, null);

    });

    it("build-widget : invalid 'eventName' / 'rangePicker' are rejected", () => {

        rejectAction({
            action: "build-widget",
            templateId: "ic3.Table",
            mdx: MDX_STD,
            eventName: "article",
        }, "eventName", "is for filter widgets only");

        rejectAction({
            action: "build-widget",
            templateId: "ic3.FilterButtons",
            mdx: MDX_F_ARTICLES,
            eventName: " ",
        }, "eventName", "must be a non empty string");

        rejectAction({
            action: "build-widget",
            templateId: "ic3.FilterButtons",
            mdx: MDX_F_ARTICLES,
            rangePicker: true,
        }, "rangePicker", "is for the date picker", "ic3.DatePicker");

    });

    it("build-widget : an 'eventName' already published by another widget is rejected", () => {

        buildFilterButtons("AI Articles", "article");

        aiSendAction({
            action: "build-widget",
            templateId: "ic3.FilterButtons",
            mdx: MDX_F_ARTICLES,
            eventName: "article",
        });

        aiApplyLastActionWithError("the event", "article", "already published by another widget");

        cy.get('[data-cy="widget-box-ww1"]').should("not.exist");

    });

});
