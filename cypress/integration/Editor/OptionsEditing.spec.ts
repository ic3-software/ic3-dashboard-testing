import {
    assertApplyWidgetOptionsDialog,
    createMdxWidget,
    dashboardEditorOpen,
    dashboardUnselectAll,
    dialogCancel,
    dialogDiscard,
    dialogSave,
    editorAssertBoolean,
    editorAssertClosed,
    editorAssertCode,
    editorAssertEditedWidget,
    editorAssertText,
    editorCloseIfOpen,
    editorReplaceMdxStatement,
    editorSelectOption,
    editorSetBoolean,
    editorSetCode,
    editorSetText,
    useSalesSchema
} from "./utils";

export {};

/*
    Regression tests for the widget options editor (refactoring of the editors : header, chart, box, interactions...).

    Setup : 'Editor/Empty Report' (nothing saved) + Sales schema + 2 widgets created from an MDX statement :
        ww0 : Pivot Table
        ww1 : Table

    Each option group : change an option of ww0, apply, assert the effect on ww0 and that ww1 is untouched.
 */

const MDX = "SELECT [Time].[Calendar].[Year].members.head(3) ON 0, [Product].[Product].[Article].members ON 1 FROM [Sales] WHERE [Measures].[Amount]";
const MDX_HEAD1 = "SELECT [Time].[Calendar].[Year].members.head(1) ON 0, [Product].[Product].[Article].members ON 1 FROM [Sales] WHERE [Measures].[Amount]";

const WW0_TITLE = "Pivot Table";
const WW1_TITLE = "Table";

// 3 years + the left header (pivot table) / the row header column (table)
const COL_COUNT = 4;
const ROW_COUNT = 5;

const WW0_WIDTH = 400;

function assertWw0Initial() {
    cy.assertWidgetHeader("ww0", "[ww0] " + WW0_TITLE);
    cy.assertPivotTableRowCount("ww0", ROW_COUNT);
    cy.assertPivotTableColCount("ww0", COL_COUNT);
}

/**
 * ww1 untouched as seen on the dashboard (title and data).
 */
function assertWw1Untouched() {
    cy.assertWidgetHeader("ww1", "[ww1] " + WW1_TITLE);
    cy.assertTableColCount("ww1", COL_COUNT);
    cy.assertTableRowCount("ww1", ROW_COUNT);
}

/**
 * Open the editor of the widget and assert it is actually editing that widget.
 */
function openEditor(widgetId: "ww0" | "ww1") {
    cy.widgetEditorOpen(widgetId);
    editorAssertEditedWidget(widgetId === "ww0" ? WW0_TITLE : WW1_TITLE);
}

/**
 * Apply and close: no "apply widget options" dialog expected.
 */
function applyAndClose() {
    cy.widgetEditorApplyAndClose();
    editorAssertClosed();
}

function closeNoDialog() {
    cy.widgetEditorClose();
    editorAssertClosed();
}

describe("Editor/Options Editing", () => {

    beforeEach(() => {

        cy.login();
        cy.openEditorTestReport("Editor/Empty Report");
        cy.waitForQueryCount(0);

        useSalesSchema();

        createMdxWidget("ic3.PivotTable", "ww0", MDX, 100, 100);
        createMdxWidget("ic3.Table", "ww1", MDX, 900, 100);

        assertWw0Initial();
        assertWw1Untouched();

    });

    // =================================================================================================================
    // Option groups
    // =================================================================================================================

    it("Header: title", () => {

        openEditor("ww0");
        editorSetText("header-$-title", "My Pivot", "tab-chart");
        applyAndClose();

        cy.assertWidgetHeader("ww0", "[ww0] My Pivot");
        assertWw1Untouched();

        openEditor("ww1");
        editorAssertText("header-$-title", WW1_TITLE, "tab-chart");
        closeNoDialog();

    });

    it("Chart: pivot table corner text", () => {

        openEditor("ww0");
        editorSetText("options-chartOptions.cornerText", "MyCorner", "tab-chart", "columns");
        applyAndClose();

        cy.getWidget("ww0").find(".ic3WidgetBox-content .ic3-pt-header").should("contain.text", "MyCorner");
        cy.assertPivotTableColCount("ww0", COL_COUNT);
        assertWw1Untouched();

        openEditor("ww0");
        editorAssertText("options-chartOptions.cornerText", "MyCorner", "tab-chart", "columns");
        closeNoDialog();

    });

    it("Box: width and export name (extra editor)", () => {

        cy.assertWidgetWidth("ww0", WW0_WIDTH);
        cy.assertWidgetWidth("ww1", WW0_WIDTH);

        openEditor("ww0");
        editorSetText("boxrectangle.width", "550", "tab-box", "rectangle");
        editorSetText("extraOptionsic3t_exportName", "my-pivot-export", "tab-box", "export");
        applyAndClose();

        cy.assertWidgetWidth("ww0", 550);
        cy.assertWidgetWidth("ww1", WW0_WIDTH);
        assertWw1Untouched();

        openEditor("ww0");
        editorAssertText("boxrectangle.width", "550", "tab-box", "rectangle");
        editorAssertText("extraOptionsic3t_exportName", "my-pivot-export", "tab-box", "export");
        closeNoDialog();

        openEditor("ww1");
        editorAssertText("boxrectangle.width", "" + WW0_WIDTH, "tab-box", "rectangle");
        editorAssertText("extraOptionsic3t_exportName", "", "tab-box", "export");
        closeNoDialog();

    });

    it("Selection", () => {

        openEditor("ww0");
        editorAssertBoolean("isSelectionActive", false, "tab-interactions");
        editorSetBoolean("isSelectionActive", true, "tab-interactions");
        editorSetText("Publish-Selection", "mySelection", "tab-interactions", "groupSelection");
        applyAndClose();

        openEditor("ww0");
        editorAssertBoolean("isSelectionActive", true, "tab-interactions");
        editorAssertText("Publish-Selection", "mySelection", "tab-interactions", "groupSelection");
        closeNoDialog();

        assertWw1Untouched();

        openEditor("ww1");
        editorAssertBoolean("isSelectionActive", false, "tab-interactions");
        editorAssertText("Publish-Selection", "", "tab-interactions", "groupSelection");
        closeNoDialog();

    });

    it("Events", () => {

        openEditor("ww0");
        editorSetText("Publish-Drilldown", "myDrilldownEvent", "tab-interactions", "groupEvents");
        applyAndClose();

        openEditor("ww0");
        editorAssertText("Publish-Drilldown", "myDrilldownEvent", "tab-interactions", "groupEvents");
        closeNoDialog();

        assertWw1Untouched();

        openEditor("ww1");
        editorAssertText("Publish-Drilldown", "", "tab-interactions", "groupEvents");
        closeNoDialog();

    });

    it("Drilldown", () => {

        openEditor("ww0");
        editorAssertBoolean("keepDrilldownOnQueryChange", false, "tab-interactions", "drilldown");
        editorSetBoolean("keepDrilldownOnQueryChange", true, "tab-interactions", "drilldown");
        applyAndClose();

        openEditor("ww0");
        editorAssertBoolean("keepDrilldownOnQueryChange", true, "tab-interactions", "drilldown");
        closeNoDialog();

        assertWw1Untouched();

        openEditor("ww1");
        editorAssertBoolean("keepDrilldownOnQueryChange", false, "tab-interactions", "drilldown");
        closeNoDialog();

    });

    it("Tooltip", () => {

        openEditor("ww0");
        editorSetBoolean("visible", true, "tab-box");
        editorSetCode("ic3t_contentMd", "My widget help", "tab-box", "tooltip");
        applyAndClose();

        // the help icon is displayed in the header of ww0 only : it opens the tooltip content (dialog box by default)
        const headerIcons = ".ic3WidgetBox-header .ic3WidgetBox-userMenuIcons button";

        cy.getWidget("ww1").find(headerIcons).its("length").then(ww1IconCount => {
            cy.getWidget("ww0").find(headerIcons).should("have.length", ww1IconCount + 1);
        });

        cy.getWidget("ww0").find(headerIcons).not("[data-cy='userMenu']").not("[title^='[default]']")
            .should("have.length", 1)
            .click();

        cy.get(".MuiDialog-root").should("contain.text", WW0_TITLE).should("contain.text", "My widget help");
        cy.get(".MuiDialog-root button").last().click() /* close (x) */;
        cy.get(".MuiDialog-root").should("not.exist");

        assertWw1Untouched();

        openEditor("ww0");
        editorAssertBoolean("visible", true, "tab-box");
        editorAssertCode("ic3t_contentMd", "My widget help", "tab-box", "tooltip");
        closeNoDialog();

        openEditor("ww1");
        editorAssertBoolean("visible", false, "tab-box");
        closeNoDialog();

    });

    it("Icons and widget actions", () => {

        openEditor("ww0");
        editorSetBoolean("disableHelp", true, "tab-interactions", "widgetIcons");
        editorSetText("maximize", "myMaximizeAction", "tab-interactions", "widgetActionsGroup");
        applyAndClose();

        openEditor("ww0");
        editorAssertBoolean("disableHelp", true, "tab-interactions", "widgetIcons");
        editorAssertText("maximize", "myMaximizeAction", "tab-interactions", "widgetActionsGroup");
        closeNoDialog();

        assertWw1Untouched();

        openEditor("ww1");
        editorAssertBoolean("disableHelp", false, "tab-interactions", "widgetIcons");
        editorAssertText("maximize", "", "tab-interactions", "widgetActionsGroup");
        closeNoDialog();

    });

    it("User menu", () => {

        openEditor("ww0");
        editorSetBoolean("showData", false, "tab-interactions", "userMenu", "userMenu");
        applyAndClose();

        cy.assertUserMenuVisibility("ww0", "showData", false);
        cy.assertUserMenuVisibility("ww0", "editWidget", true);
        assertWw1Untouched();

        openEditor("ww0");
        editorAssertBoolean("showData", false, "tab-interactions", "userMenu", "userMenu");
        editorAssertBoolean("maximize", true, "tab-interactions", "userMenu", "userMenu");
        closeNoDialog();

        openEditor("ww1");
        editorAssertBoolean("showData", true, "tab-interactions", "userMenu", "userMenu");
        closeNoDialog();

    });

    it("Global filter", () => {

        openEditor("ww0");
        editorAssertBoolean("useGlobalFilter", true, "tab-interactions");
        editorSetBoolean("useGlobalFilter", false, "tab-interactions");
        applyAndClose();

        openEditor("ww0");
        editorAssertBoolean("useGlobalFilter", false, "tab-interactions");
        closeNoDialog();

        assertWw0Initial();
        assertWw1Untouched();

        openEditor("ww1");
        editorAssertBoolean("useGlobalFilter", true, "tab-interactions");
        closeNoDialog();

    });

    // =================================================================================================================
    // Editor behaviour
    // =================================================================================================================

    it("Unsaved changes: cancel then save & close", () => {

        openEditor("ww0");
        editorSetText("header-$-title", "Pending Title", "tab-chart");

        cy.widgetEditorClose();
        assertApplyWidgetOptionsDialog("ww0", false);

        // Cancel : the editor is still opened w/ the pending change (not applied yet)
        dialogCancel();
        editorAssertText("header-$-title", "Pending Title");
        cy.assertWidgetHeader("ww0", "[ww0] " + WW0_TITLE);

        cy.widgetEditorClose();
        assertApplyWidgetOptionsDialog("ww0", false);

        // Save & Close
        dialogSave();
        editorAssertClosed();

        cy.assertWidgetHeader("ww0", "[ww0] Pending Title");
        assertWw1Untouched();

        openEditor("ww1");
        closeNoDialog();

    });

    it("Unsaved changes: close without saving", () => {

        openEditor("ww0");
        editorSetText("header-$-title", "Discarded Title", "tab-chart");

        cy.widgetEditorClose();
        assertApplyWidgetOptionsDialog("ww0", false);

        dialogDiscard();
        editorAssertClosed();

        cy.assertWidgetHeader("ww0", "[ww0] " + WW0_TITLE);
        assertWw1Untouched();

        openEditor("ww0");
        editorAssertText("header-$-title", WW0_TITLE, "tab-chart");
        closeNoDialog();

    });

    it("Apply then close: no dialog", () => {

        openEditor("ww0");
        editorSetText("header-$-title", "Applied Title", "tab-chart");

        cy.widgetEditorApply();
        cy.assertWidgetHeader("ww0", "[ww0] Applied Title");

        closeNoDialog();

        cy.assertWidgetHeader("ww0", "[ww0] Applied Title");
        assertWw1Untouched();

        // nothing is blocking the editor : open the other widget directly
        openEditor("ww1");
        closeNoDialog();

    });

    it("Switching widgets with unsaved changes: cancel then save & switch", () => {

        openEditor("ww0");
        editorSetText("header-$-title", "Switched Title", "tab-chart");

        cy.widgetEditorOpen("ww1");
        assertApplyWidgetOptionsDialog("ww0", true);

        // Cancel : still editing ww0 w/ the pending change
        dialogCancel();
        editorAssertText("header-$-title", "Switched Title");
        cy.assertWidgetHeader("ww0", "[ww0] " + WW0_TITLE);

        cy.widgetEditorOpen("ww1");
        assertApplyWidgetOptionsDialog("ww0", true);

        // Save & Switch : editing ww1, the change is applied to ww0 only
        dialogSave();
        editorAssertEditedWidget(WW1_TITLE);

        cy.assertWidgetHeader("ww0", "[ww0] Switched Title");
        assertWw1Untouched();

        closeNoDialog();

        openEditor("ww1");
        closeNoDialog();

        cy.widgetEditorOpen("ww0");
        editorAssertEditedWidget("Switched Title");
        closeNoDialog();

    });

    it("Switching widgets with unsaved changes: switch without saving", () => {

        openEditor("ww0");
        editorSetText("header-$-title", "Discarded Title", "tab-chart");

        cy.widgetEditorOpen("ww1");
        assertApplyWidgetOptionsDialog("ww0", true);

        dialogDiscard();
        editorAssertEditedWidget(WW1_TITLE);

        cy.assertWidgetHeader("ww0", "[ww0] " + WW0_TITLE);
        assertWw1Untouched();

        closeNoDialog();

        openEditor("ww0");
        closeNoDialog();

    });

    it("Undo / redo", () => {

        openEditor("ww0");
        editorSetText("header-$-title", "Undoable Title", "tab-chart");
        applyAndClose();

        cy.assertWidgetHeader("ww0", "[ww0] Undoable Title");

        cy.get('[data-cy="toolbar-undo"]').click({force: true} /* tooltip */);
        cy.assertWidgetHeader("ww0", "[ww0] " + WW0_TITLE);
        assertWw1Untouched();

        cy.get('[data-cy="toolbar-redo"]').click({force: true} /* tooltip */);
        cy.assertWidgetHeader("ww0", "[ww0] Undoable Title");
        assertWw1Untouched();

        cy.widgetEditorOpen("ww0");
        editorAssertEditedWidget("Undoable Title");
        closeNoDialog();

    });

    it("Several option groups in one editing session", () => {

        openEditor("ww0");
        editorSetText("header-$-title", "Multi", "tab-chart");
        editorSetText("options-chartOptions.cornerText", "MultiCorner", "tab-chart", "columns");
        editorSetText("boxrectangle.width", "520", "tab-box", "rectangle");
        applyAndClose();

        cy.assertWidgetHeader("ww0", "[ww0] Multi");
        cy.getWidget("ww0").find(".ic3WidgetBox-content .ic3-pt-header").should("contain.text", "MultiCorner");
        cy.assertWidgetWidth("ww0", 520);

        cy.assertWidgetWidth("ww1", WW0_WIDTH);
        assertWw1Untouched();

        cy.widgetEditorOpen("ww0");
        editorAssertEditedWidget("Multi");
        editorAssertText("options-chartOptions.cornerText", "MultiCorner", "tab-chart", "columns");
        editorAssertText("boxrectangle.width", "520", "tab-box", "rectangle");
        closeNoDialog();

    });

    it("Query tab still works", () => {

        openEditor("ww0");
        editorReplaceMdxStatement(MDX_HEAD1);
        applyAndClose();

        // 1 year + the left header
        cy.assertPivotTableColCount("ww0", 2);
        cy.assertPivotTableRowCount("ww0", ROW_COUNT);

        assertWw1Untouched();

    });

    it("Dashboard settings", () => {

        cy.getWidget("ww0").parent().parent().should("not.have.class", "ic3GridGrid");

        dashboardUnselectAll();
        dashboardEditorOpen();
        editorAssertText("properties-layoutConfig.layoutConfigId-name", "Scale Horizontally");

        editorSelectOption("properties-layoutConfig.layoutConfigId-name", "Grid");
        cy.widgetEditorApply();
        editorCloseIfOpen();

        // visible effect : the widgets are now laid out in a grid
        cy.getWidget("ww0").parent().parent().should("have.class", "ic3GridGrid");
        cy.getWidget("ww1").parent().parent().should("have.class", "ic3GridGrid");

        dashboardUnselectAll();
        dashboardEditorOpen();
        editorAssertText("properties-layoutConfig.layoutConfigId-name", "Grid");
        editorAssertText("properties-defaults.schemaName", "Sales");
        editorCloseIfOpen();

        // the widgets are not affected
        assertWw0Initial();
        assertWw1Untouched();

        openEditor("ww0");
        editorAssertText("options-chartOptions.cornerText", "", "tab-chart", "columns");
        closeNoDialog();

    });

});

/*
    Option resetting another option (dependsOnReset).

    No widget editor option is using dependsOnReset : the usages are the MDX console (schema => cube) and the print
    dialog (paper size => margins set from valueFromDependsOnValue), both built w/ the same FormFieldEditorFactory.

    The print dialog is not usable here : the margins are visible for paper-size layouts only and printing a
    modified dashboard asks for saving it first (the tests must not save anything) => MDX console.
 */
describe("Editor/Options Editing (dependsOnReset)", () => {

    beforeEach(() => {

        cy.login();
        cy.openMdxConsole();

    });

    it("Option resetting another option (dependsOnReset)", () => {

        const chooser = ".ic3MdxConsoleSchemaBrowser-schemaChooser";
        const summary = `${chooser} .ic3FormFieldGroup-summaryAsLabel`;
        const schema = `${chooser} [data-cy='field-schemaName'] input`;
        const cube = `${chooser} [data-cy='field-cubeName'] input`;

        function selectSchema(name: string) {
            cy.get(schema).click();
            cy.contains("li.MuiAutocomplete-option", new RegExp("^" + name + "$")).click();
        }

        cy.get(summary).should("have.text", "Select a Schema").click();

        selectSchema("Sales");
        // the group is collapsed : 'schema : cube'
        cy.get(summary).should("have.text", "Sales : Sales").click();
        cy.get(schema).should("have.value", "Sales");

        // the cube is the default one (no value) : select it
        cy.get(cube).click();
        cy.contains("li.MuiAutocomplete-option", /^Sales$/).click();
        cy.get(cube).should("have.value", "Sales");

        // changing the schema resets the cube
        selectSchema("ProcureDemo");
        cy.get("body").then($body => {
            if ($body.find(cube).length === 0) {
                cy.get(summary).click();
            }
        });
        cy.get(schema).should("have.value", "ProcureDemo");
        cy.get(cube).should("have.value", "");

        // ... and the cube field is following the new schema
        cy.get(cube).click();
        cy.contains("li.MuiAutocomplete-option", /^cube$/).click();
        cy.get(cube).should("have.value", "cube");

    });

});
