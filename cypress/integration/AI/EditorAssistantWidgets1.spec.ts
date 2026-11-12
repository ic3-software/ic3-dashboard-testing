import {editorAssistantWidgetsHooks, WIDGETS_IC3, widgetCasesTests} from "./EditorAssistantWidgetsUtils";

export {};

/*
    Dashboard Editor : AI Assistant widgets (see EditorAssistantWidgetsUtils for the setup and the widget types).
 */

describe("AI/Editor Assistant Widgets (ic3)", () => {

    editorAssistantWidgetsHooks();

    widgetCasesTests(WIDGETS_IC3);

});
