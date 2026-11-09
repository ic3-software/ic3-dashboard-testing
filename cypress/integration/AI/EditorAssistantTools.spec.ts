import {
    aiApplyLastAction,
    aiAssertEmpty,
    aiCallTool,
    aiDeleteConversations,
    aiOpenEditorAssistant,
    aiSendAction,
    aiSendMultiline,
    aiTrackConversations
} from "./utils";
import {dashboardUnselectAll, useSalesSchema} from "../Editor/utils";

export {};

/*
    Dashboard Editor : the client-side tools of the AI assistant (see AIClientQuerySideToolsRegister).

    Requires the fake AI agent w/ the tool calls (papagayo : "papagayo: tool:NAME {args}" calls the tool and replies
    with its output, see InMemoryLLMClient and aiCallTool()).

    Setup : 'Editor/Empty Report' (fixed layout, nothing saved, Statos theme) + Sales schema.
 */

const WID = "ww0";

/**
 * #rrggbb or #rrggbbaa (transparent).
 */
const HEX_COLOR = /^#[0-9a-f]{6}([0-9a-f]{2})?$/;

/**
 * A widget w/ a color option (chartOptions.regionColor).
 */
function buildGeoMap() {

    aiSendAction({
        action: "build-widget",
        templateId: "amCharts4.AmCharts4GeoMap",
        mdx: "SELECT [Measures].[Amount] ON 0, [Customers].[Geography].[Country].members ON 1 FROM [Sales]",
        widgetTitle: "AI GeoMap",
    });

    aiApplyLastAction();

    cy.getWidget(WID);

}

function setRegionColor(color: string) {

    aiSendAction({
        action: "edit-widget-options",
        widgetId: WID,
        options: {"chartOptions.regionColor": color},
    });

    aiApplyLastAction();

}

describe("AI/Editor Assistant Tools", () => {

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

    it("get_dashboard_theme : the main colors, colors & palettes (chartPalette) as hex codes", () => {

        aiCallTool("get_dashboard_theme").then(result => {

            // as the theme of the custom ECharts widgets (AiUtils.transformToAiTheme)
            expect(result).to.have.all.keys("typography", "palette", "chartPalette", "colors");

            // the main colors (e.g., Statos : rgba(0, 0, 0, 0.38) => #00000061)
            expect(result.palette).to.include({primaryText: "#16194c", disabledText: "#00000061"});

            Object.entries(result.palette).forEach(([name, color]) => {
                expect(color, name).to.match(HEX_COLOR);
            });

            // Statos
            expect(result.colors).to.include({default: "#00d4ea", red: "#fc6e6d"});

            Object.entries(result.colors).forEach(([name, color]) => {
                expect(color, name).to.match(HEX_COLOR);
            });

            // no dashboard color yet
            expect(Object.keys(result.colors).filter(name => name.startsWith("ic3dashboard."))).to.be.empty;

            expect(Object.keys(result.chartPalette)).not.to.be.empty;

            Object.entries(result.chartPalette).forEach(([name, colors]) => {
                expect(colors, name).not.to.be.empty;
                (colors as string[]).forEach(color => expect(color, name).to.match(HEX_COLOR));
            });

        });

    });

    it("get_dashboard_theme : a CSS color set by the AI is a dashboard color", () => {

        buildGeoMap();

        setRegionColor("rgb(0, 255, 0)");

        aiCallTool("get_dashboard_theme").then(result => {
            expect(result.colors).to.include({"ic3dashboard.#00ff00": "#00ff00"});
        });

    });

    it("get_widget_option_meta / get_widget_options : a color option is a name", () => {

        buildGeoMap();

        aiCallTool("get_widget_option_meta", {widgetId: WID}).then(meta => {

            const regionColor = (meta as any[]).find(option => option.name === "chartOptions.regionColor");

            expect(regionColor.type).to.equal("color");
            expect(regionColor.allowedValues).to.include.members(["default", "red"]);
            expect(regionColor.description).to.contain("get_dashboard_theme");

        });

        setRegionColor("red");

        aiCallTool("get_widget_options", {widgetId: WID}).then(options => {
            // the name (not the stored {path})
            expect(options["chartOptions.regionColor"]).to.equal("red");
        });

    });

    it("an unknown tool : an error message (no tool call)", () => {

        aiSendMultiline("tool:get_palettes");

        cy.get(".ic3App-drawer .ic3AIAssistant-root [data-cy='ai-answer']").last()
            .should("contain.text", "unknown tool(s) 'get_palettes'")
            .should("contain.text", "get_dashboard_theme");

    });

});
