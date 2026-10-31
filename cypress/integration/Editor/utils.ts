/**
 * Helpers shared by the Editor specs (widget & dashboard options editors).
 */

const DRAWER = ".ic3App-drawer";

/**
 * widgetEditorChangeTab() is typed for the widget editor tabs only (works for the dashboard editor tabs as well).
 */
function changeTab(tab: string) {
    cy.widgetEditorChangeTab(tab as any);
}

function escapeRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ---------------------------------------------------------------------------------------------------------------------
// Report setup
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Sets the dashboard default schema to 'Sales' (Dashboard Settings) and applies it.
 *
 * Expects no widget being selected (the toolbar button opens the dashboard settings in that case).
 */
export function useSalesSchema() {

    dashboardEditorOpen();

    editorSelectOption("properties-defaults.schemaName", "Sales");
    editorAssertText("properties-defaults.schemaName", "Sales");

    cy.widgetEditorApply();
    editorCloseIfOpen();

}

/**
 * Adds a new widget using an MDX statement : apply and close the editor and wait for the widget rendering.
 */
export function createMdxWidget(widgetType: string, widgetId: string, mdx: string, posX = 100, posY = 100) {

    cy.addWidgetAndOpenEditor(widgetType, posX, posY);

    changeTab("tab-query");
    cy.get('button[data-cy="switchMdxToStatement"]').click();
    typeMdxStatement(mdx);

    cy.widgetEditorApplyAndClose();

    cy.getWidget(widgetId);

}

/**
 * Replace the MDX statement of the edited widget (the widget is already using a statement).
 */
export function editorReplaceMdxStatement(statement: string) {

    changeTab("tab-query");
    typeMdxStatement(statement);

}

/**
 * Typing in CodeMirror is from time to time garbled (auto-completion, closing brackets): retry if needed.
 */
function typeMdxStatement(statement: string, attempt = 1) {

    cy.get(`${DRAWER} .cm-content`)
        .click()
        .focused()
        .keyboardDeleteAll()
        .type(statement, {force: true})
    ;

    cy.get(`${DRAWER} .cm-content`).invoke("text").then(text => {
        if (text !== statement && attempt < 3) {
            typeMdxStatement(statement, attempt + 1);
        }
    });

    cy.get(`${DRAWER} .cm-content`).should("have.text", statement);

    // the statement is committed to the editor's model w/ a delay (see widgetEditorEnterMdxStatement)
    cy.wait(500);
}

// ---------------------------------------------------------------------------------------------------------------------
// Editors
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Opens the dashboard settings (no widget must be selected).
 */
export function dashboardEditorOpen() {

    cy.get('[data-cy="toolbar-openOptionsEditor"]').click();
    changeTab("tab-report-properties");

}

/**
 * Selects nothing on the dashboard (click on an empty area of the page).
 */
export function dashboardUnselectAll() {

    cy.get('[data-cy-page-nb="0"]').click(5, 5, {force: true});

}

export function editorCloseIfOpen() {

    cy.get("body").then($body => {
        if ($body.find(`${DRAWER} [data-cy="close"]`).length > 0) {
            cy.widgetEditorClose();
        }
    });

    cy.get(`${DRAWER} [data-cy="close"]`).should("not.exist");
}

/**
 * The editor is opened on the given widget (the title is the one of the widget editor's drawer).
 */
export function editorAssertEditedWidget(widgetTitle: string) {

    editorAssertText("header-$-title", widgetTitle, "tab-chart");

}

/**
 * Asserts the widget editor is closed : the dashboard is again the main component (i.e., the 'open editor'
 * toolbar button is enabled) and no dialog is displayed.
 */
export function editorAssertClosed() {

    cy.get(`${DRAWER} [data-cy="apply"]`).should("not.exist");
    cy.get('[data-cy="toolbar-openOptionsEditor"]').should("be.enabled");
    cy.get(".MuiDialog-root").should("not.exist");

}

/**
 * @param scope the data-cy of the group (accordion) the field is into: for field ids used in several groups
 */
function fieldSelector(dataCy: string, scope?: string) {
    return scope
        ? `${DRAWER} [data-cy='${scope}'] [data-cy='${dataCy}']`
        : `${DRAWER} [data-cy='${dataCy}']`;
}

/**
 * Expands the group (accordion) if not already expanded.
 */
export function editorOpenGroup(group: string) {

    cy.get(`${DRAWER} .MuiAccordion-root[data-cy='${group}']`).then($group => {
        if (!$group.hasClass("Mui-expanded")) {
            cy.wrap($group).find(".MuiAccordionSummary-expandIconWrapper").first().click();
        }
    });

    cy.get(`${DRAWER} .MuiAccordion-root[data-cy='${group}']`).should("have.class", "Mui-expanded");
}

function editorGoTo(tab?: string, group?: string) {
    tab && changeTab(tab);
    group && editorOpenGroup(group);
}

export function editorSetText(dataCy: string, value: string, tab?: string, group?: string) {

    editorGoTo(tab, group);

    cy.get(fieldSelector(dataCy) + " input")
        .clear()
        .type(value)
    ;

    cy.get(fieldSelector(dataCy) + " input").should("have.value", value);
}

export function editorAssertText(dataCy: string, value: string, tab?: string, group?: string) {

    editorGoTo(tab, group);

    cy.get(fieldSelector(dataCy) + " input").should("have.value", value);
}

export function editorSelectOption(dataCy: string, value: string, tab?: string, group?: string) {

    editorGoTo(tab, group);

    cy.get(fieldSelector(dataCy) + " input")
        .clear()
        .type(value)
    ;

    cy.contains("li.MuiAutocomplete-option", new RegExp("^" + escapeRegExp(value) + "$")).click();
}

/**
 * Boolean editors (switches).
 *
 * @param scope the data-cy of the group the field is into (e.g., userMenu vs. widgetActionsGroup share field ids)
 */
export function editorSetBoolean(dataCy: string, checked: boolean, tab?: string, group?: string, scope?: string) {

    editorGoTo(tab, group);

    // the inputs of the MUI switches are transparent (opacity:0) : force
    // A switch displaying a value from the defaults : the 1st click defines the value (=> not toggled).
    const toggle = (attempt: number) => {
        cy.get(fieldSelector(dataCy, scope) + " input").then($input => {
            if ($input.prop("checked") !== checked && attempt <= 2) {
                cy.wrap($input).click({force: true});
                toggle(attempt + 1);
            }
        });
    };
    toggle(1);

    cy.get(fieldSelector(dataCy, scope) + " input").should(checked ? "be.checked" : "not.be.checked");
}

export function editorAssertBoolean(dataCy: string, checked: boolean, tab?: string, group?: string, scope?: string) {

    editorGoTo(tab, group);

    cy.get(fieldSelector(dataCy, scope) + " input").should(checked ? "be.checked" : "not.be.checked");
}

/**
 * Markdown/code editors (CodeMirror).
 */
export function editorSetCode(dataCy: string, value: string, tab?: string, group?: string) {

    editorGoTo(tab, group);

    cy.get(fieldSelector(dataCy) + " .cm-content")
        .click()
        .focused()
        .keyboardDeleteAll()
        .type(value, {delay: 25})
        .blur()
    ;

    cy.get(fieldSelector(dataCy) + " .cm-content").should("have.text", value);

    // the value is committed to the editor's model w/ a delay : applying before would leave the editor modified
    cy.wait(500);
}

export function editorAssertCode(dataCy: string, value: string, tab?: string, group?: string) {

    editorGoTo(tab, group);

    cy.get(fieldSelector(dataCy) + " .cm-content").should("have.text", value);
}

// ---------------------------------------------------------------------------------------------------------------------
// Dialogs
// ---------------------------------------------------------------------------------------------------------------------

/**
 * The "Apply Widget Options" dialog (closing or switching with pending changes).
 */
export function assertApplyWidgetOptionsDialog(widgetId: string, switching: boolean) {

    cy.get(".MuiDialog-root [role='dialog']")
        .should("have.length", 1)
        .should("contain.text", "Apply Widget Options")
        .should("contain.text", `Do you want to apply the widget ${widgetId} options before ${switching ? "switching" : "closing"}?`)
    ;

}

/**
 * Cancel : keep the editor opened with its pending changes.
 */
export function dialogCancel() {
    cy.get(".MuiDialog-root [data-cy='button-abort']").click();
    cy.get(".MuiDialog-root").should("not.exist");
}

/**
 * Close (or switch) without saving.
 */
export function dialogDiscard() {
    cy.get(".MuiDialog-root [data-cy='button-cancel']").click();
    cy.get(".MuiDialog-root").should("not.exist");
}

/**
 * Save & close (or save & switch).
 */
export function dialogSave() {
    cy.get(".MuiDialog-root [data-cy='button-ok']").click();
    cy.get(".MuiDialog-root").should("not.exist");
}
