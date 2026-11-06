import {
    aiApplyLastAction,
    aiApplyLastActionWithError,
    aiAssertEmpty,
    aiAssertLastAction,
    aiDeleteConversations,
    aiLastAction,
    aiOpenEditorAssistant,
    aiSendAction,
    aiTrackConversations
} from "./utils";
import {dashboardUnselectAll, useSalesSchema} from "../Editor/utils";

export {};

/*
    Dashboard Editor : AI Assistant build-widget for every widget type (see get_possible_widgets) followed by an
    edit-widget-options action changing some of its settings (the title and a chart option).

    Requires the fake AI agent (papagayo : the reply is the question w/o its "papagayo:" prefix) : see
    EditorAssistantActions.spec for the actions themselves (apply all, errors, undo, etc...).

    Setup : 'Editor/Empty Report' (fixed layout, nothing saved) + Sales schema : each test creates a single widget (ww0).

    The option keys are the field paths of the widget editor (see DashboardOptionsEditorContext.getWidgetFormFieldEditors) :
        $-title         : the header title (not for the templates w/o title : KPI Box, Markdown, Print Button)
        chartOptions.*  : the chart options of the template
        withHeader, ... : the box options
    An unknown option is an error : the whole action is rejected (aiApplyLastAction() fails).

    A widget w/o query (e.g., Filter Panel, Markdown, Image) : no 'mdx' in the build-widget action.
 */

const WID = "ww0";

// the order of the Sales cube
const ARTICLES = ["Personal", "Server", "Gold", "Platinum", "Silver"];

// -- MDX (Sales)

const MDX_STD = "SELECT [Time].[Calendar].[Year].members.head(3) ON 0, [Product].[Product].[Article].members ON 1 FROM [Sales] WHERE [Measures].[Amount]";
const MDX_ART = "SELECT [Measures].[Amount] ON 0, [Product].[Product].[Article].members ON 1 FROM [Sales]";
const MDX_ART_2M = "SELECT {[Measures].[Amount],[Measures].[Count]} ON 0, [Product].[Product].[Article].members ON 1 FROM [Sales]";
const MDX_ART_3M = "WITH MEMBER [Measures].[Avg] AS [Measures].[Amount]/[Measures].[Count] SELECT {[Measures].[Amount],[Measures].[Count],[Measures].[Avg]} ON 0, [Product].[Product].[Article].members ON 1 FROM [Sales]";
const MDX_ONE = "SELECT [Measures].[Amount] ON 0 FROM [Sales]";
const MDX_COUNTRIES = "SELECT [Measures].[Amount] ON 0, [Customers].[Geography].[Country].members ON 1 FROM [Sales]";

function mdxFilter(set: string) {
    return `SELECT ${set} ON 0 FROM [Sales] CELL PROPERTIES CELL_ORDINAL`;
}

const MDX_F_ARTICLES = mdxFilter("[Product].[Product].[Article].members");

// -- Assertions

/**
 * The widget is rendered (header render status).
 */
function rendered(wid: string) {
    cy.getWidget(wid);
}

function contentContains(wid: string, selector: string, text: string) {
    cy.getWidget(wid).find(`.ic3WidgetBox-content ${selector}`).should("contain.text", text);
}

function dataMappingOk(wid: string) {
    cy.getWidget(wid).find("[data-cy='data-mapping-error']").should("not.exist");
}

/**
 * amCharts legend items.
 */
function amChartsLegend(wid: string, count: number) {
    if (count === 0) {
        cy.getWidget(wid).find(".ic3WidgetBox-content svg g[role='switch']").should("not.exist");
    } else {
        cy.getWidget(wid).find(".ic3WidgetBox-content svg g[role='switch']").should("have.length", count);
    }
}

// -- Filter Panel

/**
 * A single (year) filter w/o selection : no MDX filter.
 */
const FILTER_PANEL_YEAR = JSON.stringify({
    items: [{id: 0, fieldId: "[Time].[Calendar].[Year]", filter: {operator: "IS_ANY_OF"}}]
});

function assertFilterPanelEmpty(wid: string) {
    cy.getWidget(wid).find("[data-cy='addFilter']").should("exist");
    cy.getWidget(wid).find("[data-cy='filters'] .ic3FilterPanel-NoFilters").should("exist");
    cy.getWidget(wid).find("[data-cy='filter-item']").should("not.exist");
}

function assertFilterPanelYear(wid: string) {
    cy.getWidget(wid).find("[data-cy='filters'] .ic3FilterPanel-NoFilters").should("not.exist");
    cy.getWidget(wid).find("[data-cy='filter-item']").should("have.length", 1);
    cy.getWidget(wid).find("[data-cy='filter-item'] .ic3FilterPanel-fieldName").should("contain.text", "Year");
}

// -- Widget types

interface WidgetCase {

    templateId: string;

    /**
     * Undefined : a widget w/o query.
     */
    mdx?: string;

    /**
     * False : the template has no title ($-title is an unknown option).
     */
    withTitle?: false;

    /**
     * False : no header rendered (no [ww0] title to assert).
     */
    withHeader?: false;

    /**
     * Once created (the build-widget applied) : default waits for its rendering.
     */
    assertCreated?: (wid: string) => void;

    /**
     * The options changed w/ edit-widget-options (plus the title if any).
     */
    options: Record<string, any>;

    assertOptions: (wid: string) => void;

}

const AMCHARTS_LEGEND_OPTIONS = {"chartOptions.legendEnabled": true};

const WIDGETS: WidgetCase[] = [

    // ---- Tables -----------------------------------------------------------------------------------------------------

    {
        templateId: "ic3.PivotTable",
        mdx: MDX_STD,
        assertCreated: wid => {
            cy.assertPivotTableColCount(wid, 4);
            cy.assertPivotTableRowCount(wid, 5);
        },
        options: {"chartOptions.cornerText": "AI Corner"},
        assertOptions: wid => {
            cy.getWidget(wid).find(".ic3-pt-header").should("contain.text", "AI Corner");
            cy.assertPivotTableRowCount(wid, 5);
        },
    },
    {
        templateId: "ic3.Table",
        mdx: MDX_STD,
        assertCreated: wid => {
            cy.assertTableColCount(wid, 4);
            cy.assertTableRowCount(wid, 5);
        },
        options: {"chartOptions.showRowNumbers": true},
        assertOptions: wid => {
            // + the row number column
            cy.assertTableColCount(wid, 5);
            cy.assertTableRowCount(wid, 5);
        },
    },

    // ---- Filters ----------------------------------------------------------------------------------------------------

    {
        templateId: "ic3.FilterButtons",
        mdx: MDX_F_ARTICLES,
        assertCreated: wid => cy.assertButtons(wid, ARTICLES),
        options: {"chartOptions.size": "small"},
        assertOptions: wid => cy.getWidget(wid).find("button.MuiButton-sizeSmall").should("have.length", ARTICLES.length),
    },
    {
        templateId: "ic3.FilterCheckboxRadio",
        mdx: MDX_F_ARTICLES,
        assertCreated: wid => cy.assertCheckboxes(wid, ARTICLES),
        options: {"chartOptions.size": "small"},
        assertOptions: wid => cy.getWidget(wid).find(".MuiCheckbox-sizeSmall, .MuiRadio-sizeSmall").should("have.length", ARTICLES.length),
    },
    {
        templateId: "ic3.FilterAutocomplete",
        mdx: MDX_F_ARTICLES,
        assertCreated: wid => cy.assertDropdownOptions(wid, ARTICLES),
        options: {"chartOptions.placeholderText": "AI search"},
        assertOptions: wid => cy.getWidget(wid).find("input").should("have.attr", "placeholder", "AI search"),
    },
    {
        templateId: "ic3.FilterAutocompleteLazy",
        mdx: MDX_F_ARTICLES,
        assertCreated: wid => cy.assertDropdownOptions(wid, ARTICLES),
        options: {"chartOptions.label": "AI Lazy"},
        assertOptions: wid => cy.getWidget(wid).find("label").should("contain.text", "AI Lazy"),
    },
    {
        // Same as the lazy autocomplete (+ a scanner button if a camera is available).
        templateId: "ic3.FilterBarcodeAutocomplete",
        mdx: MDX_F_ARTICLES,
        options: {"chartOptions.label": "AI Barcode"},
        assertOptions: wid => cy.getWidget(wid).find("label").should("contain.text", "AI Barcode"),
    },
    {
        templateId: "ic3.FilterSlider",
        mdx: mdxFilter("[Time].[Calendar].[Year].members.head(3)"),
        assertCreated: wid => cy.assertSlider(wid, ["2005", "2006", "2007"]),
        options: {"chartOptions.orientation": "vertical"},
        assertOptions: wid => cy.getWidget(wid).find("[data-cy='ic-slider'].MuiSlider-vertical").should("have.length", 1),
    },
    {
        templateId: "ic3.FilterTree",
        mdx: mdxFilter("[Product].[Product].[Category].members"),
        assertCreated: wid => cy.assertTreeExists(wid, "control-icons", "License"),
        options: {"chartOptions.useControlIcons": false},
        assertOptions: wid => {
            cy.getWidget(wid).find("[data-cy='ic-treeItem'][data-name='License']").should("exist");
            cy.getWidget(wid).find("[data-cy='ic-checkbox']").should("not.exist");
        },
    },
    {
        templateId: "ic3.FilterSwitch",
        mdx: mdxFilter("[Time].[Calendar].[Year].members.head(2)"),
        assertCreated: wid => cy.getWidget(wid).find(".MuiSwitch-root").should("have.length", 1),
        options: {"chartOptions.labelRight": "AI Right"},
        assertOptions: wid => cy.getWidget(wid).should("contain.text", "AI Right"),
    },
    {
        templateId: "ic3.DatePicker",
        mdx: "SELECT {[Time].[Calendar].[Day].members.head(1),[Time].[Calendar].[Day].members.tail(1)} ON \"dates\" FROM [Sales] CELL PROPERTIES CELL_ORDINAL",
        assertCreated: wid => cy.assertDatePicker(wid, null),
        options: {"chartOptions.label": "AI Date"},
        assertOptions: wid => cy.getWidget(wid).find("label").should("contain.text", "AI Date"),
    },
    {
        // w/o query : the level is an option.
        templateId: "ic3.SinglePanelFilter",
        assertCreated: wid => cy.getWidget(wid).find("[data-cy='filter-item']").should("not.exist"),
        options: {"chartOptions.levelId": "[Time].[Calendar].[Year]"},
        assertOptions: wid => cy.getWidget(wid).find("[data-cy='filter-item'] .ic3FilterPanel-fieldName").should("contain.text", "Year"),
    },

    // FilterPanel : see its own tests below (a regular case as well).
    {
        templateId: "ic3.FilterPanel",
        assertCreated: wid => assertFilterPanelEmpty(wid),
        options: {
            "chartOptions.asGlobalFilter": false,
            "chartOptions.filterLayoutHorizontal": true,
            "chartOptions.initialFilterConfig": FILTER_PANEL_YEAR,
        },
        assertOptions: wid => assertFilterPanelYear(wid),
    },

    // ---- KPI & Misc -------------------------------------------------------------------------------------------------

    {
        templateId: "ic3.KpiBox",
        mdx: MDX_ONE,
        withTitle: false,
        withHeader: false,
        options: {"chartOptions.markdown": "## AI KPI $Amount$"},
        assertOptions: wid => contentContains(wid, "h2", "AI KPI"),
    },
    {
        // $-title accepted but no header displayed
        templateId: "ic3.KpiCard",
        mdx: "SELECT {[Measures].[Amount],[Measures].[Count]} ON 0 FROM [Sales]",
        withHeader: false,
        assertCreated: wid => {
            cy.getWidget(wid).find("h2.ic3KpiCard-valueText").should("exist");
            cy.getWidget(wid).find(".ic3KpiCard-valueTitle").should("have.text", "Amount");
        },
        options: {"chartOptions.titleText": "AI KPI"},
        assertOptions: wid => cy.getWidget(wid).find(".ic3KpiCard-valueTitle").should("have.text", "AI KPI"),
    },
    {
        templateId: "ic3.MarkdownText",
        withTitle: false,
        withHeader: false,
        options: {"chartOptions.$-markdown": "# AI Markdown"},
        assertOptions: wid => contentContains(wid, "h1", "AI Markdown"),
    },
    {
        templateId: "ic3.Image",
        options: {"chartOptions.urlToImage": "ai-image.png"},
        assertOptions: wid => cy.getWidget(wid).find(".ic3WidgetBox-content img[src='ai-image.png']").should("have.length", 1),
    },
    {
        templateId: "ic3.Input",
        options: {"chartOptions.label": "AI Input"},
        assertOptions: wid => {
            cy.getWidget(wid).find("label").should("contain.text", "AI Input");
            cy.getWidget(wid).find("input").should("exist");
        },
    },
    {
        templateId: "ic3.PrintButton",
        withTitle: false,
        withHeader: false,
        options: {"chartOptions.caption": "AI Print"},
        assertOptions: wid => cy.getWidget(wid).find("[data-cy='ic-print-button']").should("have.text", "AI Print"),
    },
    {
        // No report yet : waiting (never rendered).
        // Header asserted here : the embedded report has its own ww0 (same data-cy header).
        templateId: "ic3.EmbeddedReport",
        withHeader: false,
        assertCreated: wid => {
            cy.getWidget(wid, "data-cy-waiting");
            cy.assertWidgetHeader(wid, `[${wid}] AI EmbeddedReport`);
        },
        options: {"chartOptions.$-MDX-reportName": "shared:/Tests/embeddedApi/Report Params"},
        assertOptions: wid => {
            // the table of the embedded report
            cy.getWidget(`_${wid}:ww0`);
            cy.get(`[data-cy="widget-box-header-${wid}"]`).first().should("have.text", `[${wid}] AI Title`);
        },
    },
    {
        // Empty (no nested widget) : not rendered as such.
        templateId: "ic3.RepetitionWidget",
        mdx: "SELECT [Product].[Product].[Category].members ON 0 FROM [Sales]",
        assertCreated: wid => cy.getWidget("!" + wid).should("contain.text", "Drag and drop"),
        options: {"chartOptions.visualColumnNumber": 2},
        assertOptions: wid => cy.getWidget("!" + wid).should("contain.text", "Drag and drop"),
    },
    {
        // Header hidden by default (theme) : shown w/ the box option. Disabled while editing.
        templateId: "ic3.ChatbotWidget",
        withHeader: false,
        assertCreated: wid => cy.getWidget("!" + wid).find("[data-cy='render-info'][data-cy-type='data-cy-ai-deactivated']").should("have.length", 1),
        options: {"withHeader": true, "chartOptions.inputPlaceholder": "AI ask"},
        assertOptions: wid => cy.assertWidgetHeader(wid, `[${wid}] AI Title`),
    },

    // ---- Google Maps ------------------------------------------------------------------------------------------------
    // No lat/long in Sales (+ requires a Google Maps key) : nothing displayed, created and edited though.

    {
        templateId: "ic3.GoogleMarker",
        mdx: MDX_COUNTRIES,
        assertCreated: wid => cy.getWidget("!" + wid),
        options: {"chartOptions.mapOptions.zoom": 3},
        assertOptions: wid => cy.getWidget("!" + wid),
    },
    {
        templateId: "ic3.GoogleHeatMap",
        mdx: MDX_COUNTRIES,
        assertCreated: wid => cy.getWidget("!" + wid),
        options: {"chartOptions.mapOptions.zoom": 3},
        assertOptions: wid => cy.getWidget("!" + wid),
    },

    // ---- amCharts 4 -------------------------------------------------------------------------------------------------

    {
        templateId: "amCharts4.AmCharts4RegularColumnChart",
        mdx: MDX_ART,
        assertCreated: wid => {
            cy.columnAssertColumnCount(wid, 5);
            amChartsLegend(wid, 0);
        },
        options: AMCHARTS_LEGEND_OPTIONS,
        assertOptions: wid => amChartsLegend(wid, 1),
    },
    {
        templateId: "amCharts4.AmCharts4RegularBarChart",
        mdx: MDX_ART,
        assertCreated: wid => {
            cy.columnAssertColumnCount(wid, 5);
            amChartsLegend(wid, 0);
        },
        options: AMCHARTS_LEGEND_OPTIONS,
        assertOptions: wid => amChartsLegend(wid, 1),
    },
    {
        templateId: "amCharts4.AmCharts4StackedColumnChart",
        mdx: MDX_ART,
        assertCreated: wid => {
            cy.columnAssertColumnCount(wid, 5);
            amChartsLegend(wid, 0);
        },
        options: AMCHARTS_LEGEND_OPTIONS,
        assertOptions: wid => amChartsLegend(wid, 1),
    },
    {
        templateId: "amCharts4.AmCharts4StackedBarChart",
        mdx: MDX_ART,
        assertCreated: wid => {
            cy.columnAssertColumnCount(wid, 5);
            amChartsLegend(wid, 0);
        },
        options: AMCHARTS_LEGEND_OPTIONS,
        assertOptions: wid => amChartsLegend(wid, 1),
    },
    {
        templateId: "amCharts4.AmCharts4RegularLineChart",
        mdx: MDX_ART,
        assertCreated: wid => {
            cy.areaAssertPointCount(wid, 5);
            amChartsLegend(wid, 0);
        },
        options: AMCHARTS_LEGEND_OPTIONS,
        assertOptions: wid => amChartsLegend(wid, 1),
    },
    {
        templateId: "amCharts4.AmCharts4RegularAreaChart",
        mdx: MDX_ART,
        assertCreated: wid => {
            cy.areaAssertPointCount(wid, 5);
            amChartsLegend(wid, 0);
        },
        options: AMCHARTS_LEGEND_OPTIONS,
        assertOptions: wid => amChartsLegend(wid, 1),
    },
    {
        templateId: "amCharts4.AmCharts4StackedAreaChart",
        mdx: MDX_ART,
        assertCreated: wid => amChartsLegend(wid, 0),
        options: AMCHARTS_LEGEND_OPTIONS,
        assertOptions: wid => amChartsLegend(wid, 1),
    },
    {
        templateId: "amCharts4.AmCharts4ComboChart",
        mdx: MDX_ART_2M,
        assertCreated: wid => amChartsLegend(wid, 0),
        options: AMCHARTS_LEGEND_OPTIONS,
        assertOptions: wid => amChartsLegend(wid, 2),
    },
    {
        templateId: "amCharts4.AmCharts4DivergentBarChart",
        mdx: MDX_ART_2M,
        assertCreated: wid => {
            dataMappingOk(wid);
            amChartsLegend(wid, 0);
        },
        options: AMCHARTS_LEGEND_OPTIONS,
        assertOptions: wid => cy.getWidget(wid).find(".ic3WidgetBox-content svg g[role='switch']").should("have.length.at.least", 1),
    },
    {
        templateId: "amCharts4.AmCharts4RangeChart",
        mdx: MDX_ART_2M,
        assertCreated: wid => {
            dataMappingOk(wid);
            amChartsLegend(wid, 0);
        },
        options: AMCHARTS_LEGEND_OPTIONS,
        assertOptions: wid => cy.getWidget(wid).find(".ic3WidgetBox-content svg g[role='switch']").should("have.length.at.least", 1),
    },
    {
        templateId: "amCharts4.AmCharts4ScatterPlot",
        mdx: MDX_ART_2M,
        assertCreated: wid => {
            cy.scatterAssertPointCount(wid, 5);
            amChartsLegend(wid, 0);
        },
        options: AMCHARTS_LEGEND_OPTIONS,
        assertOptions: wid => amChartsLegend(wid, 1),
    },
    {
        templateId: "amCharts4.AmCharts4BubbleChart",
        mdx: MDX_ART_3M,
        assertCreated: wid => {
            cy.bubbleAssertBubbleCount(wid, 5);
            amChartsLegend(wid, 0);
        },
        options: AMCHARTS_LEGEND_OPTIONS,
        assertOptions: wid => amChartsLegend(wid, 1),
    },
    {
        // start / end : DATETIME measures
        templateId: "amCharts4.AmCharts4GanttChart",
        mdx: "WITH MEMBER [Measures].[Start] AS DateTime(2005,1,1) MEMBER [Measures].[End] AS DateTime(2005,12,31) SELECT {[Measures].[Start],[Measures].[End]} ON 0, [Product].[Product].[Article].members ON 1 FROM [Sales]",
        assertCreated: wid => {
            dataMappingOk(wid);
            amChartsLegend(wid, 0);
        },
        options: AMCHARTS_LEGEND_OPTIONS,
        assertOptions: wid => cy.getWidget(wid).find(".ic3WidgetBox-content svg g[role='switch']").should("have.length.at.least", 1),
    },
    {
        templateId: "amCharts4.AmCharts4DonutChart",
        mdx: MDX_ART,
        assertCreated: wid => cy.donutAssertSliceCount(wid, 5),
        options: {"chartOptions.labelText": "AI Total"},
        assertOptions: wid => {
            cy.getWidget(wid).find(".ic3WidgetBox-content").should("contain.text", "AI Total");
            cy.donutAssertSliceCount(wid, 5);
        },
    },
    {
        templateId: "amCharts4.AmCharts4GaugeChart",
        mdx: MDX_ONE,
        options: {"chartOptions.labelText": "AI Gauge"},
        assertOptions: wid => cy.getWidget(wid).find(".ic3WidgetBox-content").should("contain.text", "AI Gauge"),
    },
    {
        // the columns are found by role (axis names)
        templateId: "amCharts4.AmCharts4Histogram",
        mdx: "SELECT [Measures].[Amount] ON \"value\", [Customers].[Geography].[City].members ON \"label\" FROM [Sales]",
        assertCreated: wid => dataMappingOk(wid),
        options: AMCHARTS_LEGEND_OPTIONS,
        assertOptions: wid => cy.getWidget(wid).find(".ic3WidgetBox-content svg g[role='switch']").should("have.length.at.least", 1),
    },
    {
        templateId: "amCharts4.AmCharts4SankeyDiagram",
        mdx: "SELECT [Measures].[Amount] ON 0, NON EMPTY [Product].[Product].[Category].members * [Customers].[Geography].[Region].members ON 1 FROM [Sales]",
        assertCreated: wid => cy.getWidget(wid).find(".ic3WidgetBox-content svg tspan").should("contain.text", "License"),
        options: {"chartOptions.orientation": "vertical"},
        assertOptions: wid => cy.getWidget(wid).find(".ic3WidgetBox-content svg tspan").should("contain.text", "License"),
    },
    {
        templateId: "amCharts4.AmCharts4TreeMap",
        mdx: MDX_ART,
        assertCreated: wid => cy.treeMapAssertRectangleCount(wid, 5),
        options: AMCHARTS_LEGEND_OPTIONS,
        assertOptions: wid => cy.getWidget(wid).find(".ic3WidgetBox-content svg g[role='switch']").should("have.length.at.least", 1),
    },
    {
        // Countries w/o ISO2 codes in Sales : no region matched (warning), the map is rendered though.
        templateId: "amCharts4.AmCharts4GeoMap",
        mdx: MDX_COUNTRIES,
        // a CSS color : added to the dashboard colors (see Colors below)
        options: {"chartOptions.regionColor": "#00ff00"},
        assertOptions: wid => assertGeoMapRegionColor(wid, "#00ff00"),
    },

];

function assertGeoMapRegionColor(wid: string, color: string) {
    cy.getWidget(wid).find(`.ic3WidgetBox-content svg [fill='${color}']`).should("have.length.at.least", 1);
}

// -- Actions

function widgetTitle(widget: WidgetCase) {
    return "AI " + widget.templateId.split(".")[1];
}

/**
 * Creates the widget w/ the build-widget action (no 'mdx' for a widget w/o query) and waits for its rendering.
 */
function buildWidget(widget: WidgetCase) {

    const title = widgetTitle(widget);

    aiSendAction({
        action: "build-widget",
        templateId: widget.templateId,
        ...(widget.mdx != null ? {mdx: widget.mdx} : {}),
        widgetTitle: title,
    });

    aiAssertLastAction("Add Widget:");
    cy.get(`[data-cy="widget-box-${WID}"]`).should("not.exist");

    aiApplyLastAction();

    cy.get(`[data-cy="widget-box-${WID}"]`).should("have.length", 1);

    if (widget.withHeader !== false) {
        cy.assertWidgetHeader(WID, `[${WID}] ${title}`);
    }

    (widget.assertCreated ?? rendered)(WID);

}

/**
 * Changes the title (if any) and the options of the widget w/ the edit-widget-options action.
 */
function editWidgetOptions(widget: WidgetCase) {

    aiSendAction({
        action: "edit-widget-options",
        widgetId: WID,
        options: {
            ...(widget.withTitle !== false ? {"$-title": "AI Title"} : {}),
            ...widget.options,
        },
    });

    aiAssertLastAction("Edit Widget Options");

    // fails if an option is unknown (error displayed in the card)
    aiApplyLastAction();

    if (widget.withHeader !== false) {
        cy.assertWidgetHeader(WID, `[${WID}] AI Title`);
    }

    widget.assertOptions(WID);

}

describe("AI/Editor Assistant Widgets", () => {

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

    });

    afterEach(() => {

        aiDeleteConversations();

    });

    WIDGETS.forEach(widget => {

        it(`build-widget + edit-widget-options : ${widget.templateId}`, () => {

            buildWidget(widget);
            editWidgetOptions(widget);

        });

    });

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

});
