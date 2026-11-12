import {editorAssistantWidgetsHooks, WIDGETS_AMCHARTS, widgetCasesTests} from "./EditorAssistantWidgetsUtils";

export {};

/*
    Dashboard Editor : AI Assistant widgets (see EditorAssistantWidgetsUtils for the setup and the widget types).
 */

describe("AI/Editor Assistant Widgets (amCharts)", () => {

    editorAssistantWidgetsHooks();

    widgetCasesTests(WIDGETS_AMCHARTS);

});
