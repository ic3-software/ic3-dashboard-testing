import {aiApplyLastAction, aiApplyLastActionWithError, aiSendAction} from "./utils";
import {
    ARTICLES,
    amountCell,
    assertFilteredBy,
    editorAssistantWidgetsHooks,
    MDX_F_ARTICLES,
    MDX_STD,
    MDX_YEARS_BY_ARTICLE,
    mdxYearsBy,
    WID,
    WIDGETS
} from "./EditorAssistantWidgetsUtils";

export {};

/*
    Dashboard Editor : AI Assistant widgets (see EditorAssistantWidgetsUtils for the setup and the widget types).
 */

describe("AI/Editor Assistant Widgets (filter events)", () => {

    editorAssistantWidgetsHooks();

    /*
        A filter widget publishes an event (build-widget 'eventName', otherwise named after its title) : the other
        widgets use it in their MDX as @{eventName}.
     */
    describe("Filter events", () => {

        // the first month of the first year of the Sales cube
        const RANGE_FROM = "01 Jan 2005";
        const RANGE_TO = "31 Jan 2005";

        /**
         * Sends the action and applies it (fails on error).
         */
        function applyAction(action: any) {
            aiSendAction(action);
            aiApplyLastAction();
        }

        it("build-widget w/ an 'eventName' : the table listening to it is filtered", () => {

            aiSendAction({
                action: "build-widget",
                templateId: "ic3.FilterButtons",
                mdx: MDX_F_ARTICLES,
                widgetTitle: "AI Articles",
                eventName: "article",
            });

            aiApplyLastAction();

            cy.assertButtons(WID, ARTICLES);

            aiSendAction({
                action: "build-widget",
                templateId: "ic3.Table",
                mdx: MDX_YEARS_BY_ARTICLE,
                widgetTitle: "AI Table",
            });

            aiApplyLastAction();

            cy.assertTableRowCount("ww1", 3);

            // all the articles, then the selected one only : a lower amount
            amountCell("ww1").invoke("text").then(allArticles => {

                cy.selectButton(WID, "Gold");

                amountCell("ww1").should($cell => expect($cell.text()).not.to.eq(allArticles));
                cy.assertTableRowCount("ww1", 3);

            });

        });

        it("build-widget : an 'eventName' already published by another widget is rejected", () => {

            aiSendAction({
                action: "build-widget",
                templateId: "ic3.FilterButtons",
                mdx: MDX_F_ARTICLES,
                eventName: "article",
            });

            aiApplyLastAction();

            aiSendAction({
                action: "build-widget",
                templateId: "ic3.FilterButtons",
                mdx: MDX_F_ARTICLES,
                eventName: "article",
            });

            aiApplyLastActionWithError("the event", "article", "already published by another widget");

            cy.get('[data-cy="widget-box-ww1"]').should("not.exist");

        });

        it("build-widget : 'eventName' on a widget that is not a filter is rejected", () => {

            aiSendAction({
                action: "build-widget",
                templateId: "ic3.Table",
                mdx: MDX_STD,
                eventName: "article",
            });

            aiApplyLastActionWithError("eventName", "is for filter widgets only");

            cy.get(`[data-cy="widget-box-${WID}"]`).should("not.exist");

        });

        it("build-widget : an empty 'eventName' is rejected", () => {

            aiSendAction({
                action: "build-widget",
                templateId: "ic3.FilterButtons",
                mdx: MDX_F_ARTICLES,
                eventName: " ",
            });

            aiApplyLastActionWithError("eventName", "must be a non empty string");

            cy.get(`[data-cy="widget-box-${WID}"]`).should("not.exist");

        });

        it("build-widget w/o 'eventName' : named after its title (lower case)", () => {

            applyAction({
                action: "build-widget",
                templateId: "ic3.FilterButtons",
                mdx: MDX_F_ARTICLES,
                widgetTitle: "Article",
            });

            cy.assertButtons(WID, ARTICLES);

            applyAction({
                action: "build-widget",
                templateId: "ic3.Table",
                mdx: mdxYearsBy("article"),
                widgetTitle: "AI Table",
            });

            assertFilteredBy("ww1", () => cy.selectButton(WID, "Gold"));

        });

        it("build-widget w/o 'eventName' : made unique (the title one already published)", () => {

            // ww0 : 'article'
            applyAction({
                action: "build-widget",
                templateId: "ic3.FilterButtons",
                mdx: MDX_F_ARTICLES,
                widgetTitle: "AI Articles",
                eventName: "article",
            });

            // ww1 : 'article2'
            applyAction({
                action: "build-widget",
                templateId: "ic3.FilterButtons",
                mdx: MDX_F_ARTICLES,
                widgetTitle: "Article",
            });

            cy.assertButtons("ww1", ARTICLES);

            applyAction({
                action: "build-widget",
                templateId: "ic3.Table",
                mdx: mdxYearsBy("article2"),
                widgetTitle: "AI Table 2",
            });

            applyAction({
                action: "build-widget",
                templateId: "ic3.Table",
                mdx: mdxYearsBy("article"),
                widgetTitle: "AI Table",
            });

            // each table filtered by its own filter
            assertFilteredBy("ww2", () => cy.selectButton("ww1", "Gold"));
            assertFilteredBy("ww3", () => cy.selectButton(WID, "Server"));

        });

        it("edit-widget-options on the filter : still publishes its event", () => {

            const filterButtons = WIDGETS.find(widget => widget.templateId === "ic3.FilterButtons")!;

            applyAction({
                action: "build-widget",
                templateId: filterButtons.templateId,
                mdx: MDX_F_ARTICLES,
                widgetTitle: "AI Articles",
                eventName: "article",
            });

            applyAction({
                action: "build-widget",
                templateId: "ic3.Table",
                mdx: MDX_YEARS_BY_ARTICLE,
                widgetTitle: "AI Table",
            });

            // a new title (the event is not named after it) + a chart option
            applyAction({
                action: "edit-widget-options",
                widgetId: WID,
                options: {"$-title": "AI Renamed", ...filterButtons.options},
            });

            cy.assertWidgetHeader(WID, `[${WID}] AI Renamed`);
            filterButtons.assertOptions(WID);

            assertFilteredBy("ww1", () => cy.selectButton(WID, "Gold"));

        });


        it("build-widget w/ 'rangePicker' : a date range picker (start and end dates)", () => {

            const datePicker = WIDGETS.find(widget => widget.templateId === "ic3.DatePicker")!;

            aiSendAction({
                action: "build-widget",
                templateId: datePicker.templateId,
                mdx: datePicker.mdx,
                widgetTitle: "AI Range",
                rangePicker: true,
            });

            aiApplyLastAction();

            cy.assertWidgetHeader(WID, `[${WID}] AI Range`);
            cy.assertDatePickerRangeFrom(WID, null);
            cy.assertDatePickerRangeTo(WID, null);

        });

        it("build-widget w/ 'rangePicker' + 'eventName' : the table listening to it is filtered", () => {

            const datePicker = WIDGETS.find(widget => widget.templateId === "ic3.DatePicker")!;

            applyAction({
                action: "build-widget",
                templateId: datePicker.templateId,
                mdx: datePicker.mdx,
                widgetTitle: "AI Range",
                eventName: "range",
                rangePicker: true,
            });

            applyAction({
                action: "build-widget",
                templateId: "ic3.Table",
                mdx: mdxYearsBy("range"),
                widgetTitle: "AI Table",
            });

            // the first year : the whole year, then its first month only
            assertFilteredBy("ww1", () => {
                cy.selectDatePickerRangeFromFromInput(WID, RANGE_FROM);
                cy.selectDatePickerRangeToFromInput(WID, RANGE_TO);
            });

            cy.assertDatePickerRangeFrom(WID, RANGE_FROM);
            cy.assertDatePickerRangeTo(WID, RANGE_TO);

        });

        it("build-widget : 'rangePicker' on a widget that is not a date picker is rejected", () => {

            aiSendAction({
                action: "build-widget",
                templateId: "ic3.FilterButtons",
                mdx: MDX_F_ARTICLES,
                rangePicker: true,
            });

            aiApplyLastActionWithError("rangePicker", "is for the date picker", "ic3.DatePicker");

            cy.get(`[data-cy="widget-box-${WID}"]`).should("not.exist");

        });

    });

});
