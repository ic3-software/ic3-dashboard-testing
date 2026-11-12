import {
    aiApplyAll,
    aiApplyLastAction,
    aiApplyLastActionWithError,
    aiAssertActionCards,
    aiAssertApplyAll,
    aiAssertLastAction,
    aiLastAction,
    aiSendAction,
    aiSendText
} from "./utils";
import {
    amountCell,
    ARTICLES,
    assertFilterPanelEmpty,
    assertFilterPanelYear,
    assertGeoMapRegionColor,
    buildWidget,
    editorAssistantWidgetsHooks,
    FILTER_PANEL_YEAR,
    MDX_ART,
    MDX_STD,
    MDX_YEARS_BY_ARTICLE,
    rendered,
    WID,
    WidgetCase,
    WIDGETS,
    widgetTitle
} from "./EditorAssistantWidgetsUtils";

export {};

/*
    Dashboard Editor : AI Assistant widgets (see EditorAssistantWidgetsUtils for the setup and the widget types).
 */

describe("AI/Editor Assistant Widgets (colors, filter panel, placement, dashboard)", () => {

    editorAssistantWidgetsHooks();

    /*
        A color option is a name (theme or dashboard colors : get_widget_option_meta allowedValues) or a CSS color
        added to the dashboard colors (as the color editor picker does).
     */
    describe("Colors", () => {

        const GEO_MAP = WIDGETS.find(widget => widget.templateId === "amCharts4.AmCharts4GeoMap")!;

        function editRegionColor(color: any) {
            aiSendAction({
                action: "edit-widget-options",
                widgetId: WID,
                options: {"chartOptions.regionColor": color},
            });
        }

        it("a theme color name", () => {

            buildWidget(GEO_MAP);

            // Statos : red = #fc6e6d
            editRegionColor("red");
            aiApplyLastAction();

            assertGeoMapRegionColor(WID, "#fc6e6d");

        });

        // The dashboard color reuse (same value) : see AIFormFieldColors.test (reportingMF).
        it("a CSS color (any notation) : normalized", () => {

            buildWidget(GEO_MAP);

            editRegionColor("rgb(0, 255, 0)");
            aiApplyLastAction();

            // normalized
            assertGeoMapRegionColor(WID, "#00ff00");

            editRegionColor("red");
            aiApplyLastAction();
            assertGeoMapRegionColor(WID, "#fc6e6d");

            editRegionColor("#0F0");
            aiApplyLastAction();
            assertGeoMapRegionColor(WID, "#00ff00");

        });

        it("an invalid color : rejected (the color names listed)", () => {

            buildWidget(GEO_MAP);

            editRegionColor("not a color");

            aiApplyLastActionWithError("invalid color", "chartOptions.regionColor", "red", "#ff0000");

            cy.getWidget(WID).find(".ic3WidgetBox-content svg [fill='#00ff00']").should("not.exist");

        });

    });

    describe("Filter Panel", () => {

        it("build-widget w/ an MDX : ignored (no query), not displayed in the card", () => {

            aiSendAction({
                action: "build-widget",
                templateId: "ic3.FilterPanel",
                mdx: MDX_ART,
                widgetTitle: "AI Filter Panel",
            });

            aiAssertLastAction("Add Widget:");
            aiLastAction().should("not.contain.text", "SELECT");

            aiApplyLastAction();

            cy.assertWidgetHeader(WID, `[${WID}] AI Filter Panel`);
            assertFilterPanelEmpty(WID);

        });

        it("build-widget w/o title : the default one", () => {

            aiSendAction({
                action: "build-widget",
                templateId: "ic3.FilterPanel",
            });

            aiAssertLastAction("Add Widget:");
            aiApplyLastAction();

            assertFilterPanelEmpty(WID);

        });

        it("a filter panel (not global) next to a table : the table is not filtered", () => {

            buildWidget({
                templateId: "ic3.Table",
                mdx: MDX_STD,
                options: {},
                assertOptions: () => {
                },
            });

            cy.assertTableRowCount(WID, 5);

            aiSendAction({
                action: "build-widget",
                templateId: "ic3.FilterPanel",
                widgetTitle: "AI Filter Panel",
            });

            aiApplyLastAction();

            cy.assertWidgetHeader("ww1", "[ww1] AI Filter Panel");
            assertFilterPanelEmpty("ww1");

            aiSendAction({
                action: "edit-widget-options",
                widgetId: "ww1",
                options: {
                    "chartOptions.asGlobalFilter": false,
                    "chartOptions.initialFilterConfig": FILTER_PANEL_YEAR,
                },
            });

            aiApplyLastAction();

            assertFilterPanelYear("ww1");

            // untouched
            cy.assertWidgetHeader(WID, `[${WID}] AI Table`);
            cy.assertTableColCount(WID, 4);
            cy.assertTableRowCount(WID, 5);

        });

        it("an unknown filter panel option : rejected", () => {

            buildWidget(WIDGETS.find(widget => widget.templateId === "ic3.FilterPanel")!);

            aiSendAction({
                action: "edit-widget-options",
                widgetId: WID,
                options: {"$-title": "AI Title", "chartOptions.unknownOption": true},
            });

            aiApplyLastActionWithError("unknown option(s)", "chartOptions.unknownOption");

            cy.assertWidgetHeader(WID, `[${WID}] AI FilterPanel`);
            assertFilterPanelEmpty(WID);

        });

    });

    describe("Placement", () => {

        it("build-widget : 'colSpan' / 'height' in a fixed layout are rejected", () => {

            aiSendAction({
                action: "build-widget",
                templateId: "ic3.Table",
                mdx: MDX_STD,
                colSpan: 2,
                height: 300,
            });

            aiApplyLastActionWithError("'colSpan' and 'height' are for a grid layout only", "rectangle");

            cy.get(`[data-cy="widget-box-${WID}"]`).should("not.exist");

        });

    });

    /*
        A whole dashboard from a single reply (a single card, 'Apply all') : the papagayo question of the fixture
        DashboardSingleMessage.md (sent as is, can be pasted in the assistant as well) :
            ww0     : a filter (Filter Buttons) publishing 'article',
            ww1..   : every widget type that is not a filter (see WIDGETS, same MDX and titles),
            last    : a table listening to the filter (@{article}).

        Fixed layout : the filter as a first row, then the widgets on a 4 columns grid (explicit rectangles).
     */
    describe("Dashboard (single message)", () => {

        const MESSAGE = "cypress/fixtures/AI/DashboardSingleMessage.md";

        const FILTER_TITLE = "AI Articles";
        const FILTERED_TABLE_TITLE = "AI Filtered Table";

        const FILTERED_TABLE: WidgetCase = {
            templateId: "ic3.Table",
            mdx: MDX_YEARS_BY_ARTICLE,
            assertCreated: wid => cy.assertTableRowCount(wid, 3),
            options: {},
            assertOptions: () => {
            },
        };

        // ww1.. : in the order of the actions
        const DASHBOARD_WIDGETS = [...WIDGETS.filter(widget => !widget.filter), FILTERED_TABLE];

        const FILTERED_TABLE_WID = "ww" + DASHBOARD_WIDGETS.length;

        function dashboardWidgetTitle(widget: WidgetCase) {
            return widget === FILTERED_TABLE ? FILTERED_TABLE_TITLE : widgetTitle(widget);
        }

        /**
         * The actions of the message (its json code blocks).
         */
        function messageActions(message: string): any[] {
            return [...message.matchAll(/```json\n([\s\S]*?)\n```/g)].map(match => JSON.parse(match[1]));
        }

        it("a filter + all the widgets : built w/ 'Apply all'", () => {

            cy.readFile(MESSAGE).then((message: string) => {

                const actions = messageActions(message);

                // the message is in sync w/ the widgets asserted below
                expect(actions.map(action => [action.templateId, action.widgetTitle]), MESSAGE).to.deep.equal([
                    ["ic3.FilterButtons", FILTER_TITLE],
                    ...DASHBOARD_WIDGETS.map(widget => [widget.templateId, dashboardWidgetTitle(widget)]),
                ]);
                expect(actions[0].eventName, MESSAGE).to.equal("article");

                aiSendText(message);

                aiAssertActionCards([actions.length]);
                aiAssertApplyAll("idle", actions.length);

                cy.get(`[data-cy="widget-box-${WID}"]`).should("not.exist");

                aiApplyAll();

                // the filter
                cy.assertWidgetHeader(WID, `[${WID}] ${FILTER_TITLE}`);
                cy.assertButtons(WID, ARTICLES);

                // the widgets
                DASHBOARD_WIDGETS.forEach((widget, idx) => {

                    const wid = "ww" + (idx + 1);

                    if (widget.withHeader !== false) {
                        cy.assertWidgetHeader(wid, `[${wid}] ${dashboardWidgetTitle(widget)}`);
                    }

                    (widget.assertCreated ?? rendered)(wid);

                });

                cy.get(`[data-cy="widget-box-ww${actions.length}"]`).should("not.exist");

            });

            // the table listening to the filter : all the articles, then the selected one only (a lower amount)
            amountCell(FILTERED_TABLE_WID).invoke("text").then(allArticles => {

                cy.selectButton(WID, "Gold");

                amountCell(FILTERED_TABLE_WID).should($cell => expect($cell.text()).not.to.eq(allArticles));
                cy.assertTableRowCount(FILTERED_TABLE_WID, 3);

            });

        });

    });

});
