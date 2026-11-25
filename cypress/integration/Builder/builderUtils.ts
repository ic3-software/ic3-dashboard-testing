/**
 * Helpers of the schema builder (Server UI) specs.
 *
 * Prerequisites (icCube server) : the cypress user can use the schema builder (e.g., upload a schema).
 *
 * A spec changes its own test schema only (fixtures/Builder/builder_undo.icc-schema : in-memory data, no database),
 * uploaded again (overwritten) by each test : see builderUploadSchema().
 */

const SCHEMA_FIXTURE = "Builder/builder_undo.icc-schema";

/**
 * The description of the test schema as uploaded (see the fixture).
 */
export const BUILDER_SCHEMA_DESCRIPTION = "Uploaded (overwritten) by the Cypress specs (Builder/BuilderUndo, AI/BuilderAssistantUndo)";

/**
 * The test schema of the spec (see builderUploadSchema()).
 */
let schemaName = "";

/**
 * The CSRF token of the Server UI (a page of the Server UI must be opened).
 */
export function builderCsrf(): Cypress.Chainable<Record<string, string>> {
    return cy.window().then((win): Record<string, string> => ({"X-CSRF-TOKEN": String((win as any).ic3_CSRF_token ?? "")}));
}

/**
 * Uploads (overwrites) the test schema : same as the upload of the schema builder (the XML as is). Its revision is
 * before the session of the test : the start of the Undo.
 *
 * @param name e.g., "Cypress Undo" : a schema per spec.
 */
export function builderUploadSchema(name: string) {

    schemaName = name;

    const fileName = name.replace(/\W+/g, "-").toLowerCase() + ".icc-schema";

    // A page of the Server UI : its CSRF token.
    cy.visit("/icCube/console/builder");

    cy.fixture(SCHEMA_FIXTURE).then(xml => builderCsrf().then(headers => cy.request({
        method: "POST",
        url: "/icCube/ux-api/console/UploadFile?fileType=SCHEMA_DEF&qqfile=" + encodeURIComponent(fileName),
        headers: {...headers, "Content-Type": "application/octet-stream", "X-File-Name": encodeURIComponent(fileName)},
        body: String(xml).replace("{{SCHEMA_NAME}}", name),
    }))).then(response => {
        // {success: true} or {error: "..."} not as JSON (not logged in : {status: "error", ...} as JSON).
        const reply = typeof response.body === "string" ? JSON.parse(response.body) : response.body;
        expect(reply, "upload of the schema " + name + " : " + JSON.stringify(reply)).to.have.property("success", true);
    });

}

/**
 * @param query e.g., PreviewSchemaChanges : a query of the schema builder on the test schema (in the path : a uc
 *              parameter is ignored by the server, i.e., the builder home).
 */
export function builderQueryUrl(query: string) {
    return "/icCube/ux-api/console/builder/" + query + "?schemaName=" + encodeURIComponent(schemaName);
}

/**
 * The schema properties : a page of the test schema (Undo / Redo in its toolbar).
 */
export function builderOpenSchema() {

    cy.visit("/icCube/console/builder?uc=SchemaProps&schemaName=" + encodeURIComponent(schemaName));

    cy.get("[data-cy='builder-undo-redo']").should("be.visible");

}

/**
 * The Undo (Redo) of the toolbar.
 *
 * @param tooltip e.g., "Undo edit properties" (enabled) or "Nothing to undo in this session" (disabled)
 */
export function builderAssertToolbar(button: "undo" | "redo", enabled: boolean, tooltip: string) {

    const selector = `[data-cy='builder-${button}']`;

    cy.get(selector).should(enabled ? "be.enabled" : "be.disabled");

    // A disabled button : the tooltip is on its wrapper.
    cy.get(selector).parent().trigger("mouseover");
    cy.get("[role='tooltip']").should("contain.text", tooltip);
    cy.get(selector).parent().trigger("mouseout");
    cy.get("[role='tooltip']").should("not.exist");

}

/**
 * A new session : nothing to undo, nothing to redo.
 */
export function builderAssertNothingToUndo() {

    builderAssertToolbar("undo", false, "Nothing to undo in this session");
    builderAssertToolbar("redo", false, "Nothing to redo");

}

export function builderToolbarClick(button: "undo" | "redo") {

    cy.get(`[data-cy='builder-${button}']`).should("be.enabled").click();

}

/**
 * @param message e.g., "Undone : edit properties"
 * @param button  its button (e.g., Redo) : clicked if click
 */
export function builderAssertNotification(message: string, button?: string, click?: boolean) {

    cy.get("[data-cy='notification-message']").should("contain.text", message);

    if (button) {
        cy.get("[data-cy='notification-button']").should("have.text", button);
        click && cy.get("[data-cy='notification-button']").click();
    }

}

/**
 * Save a schema version : names the current state (top bar, next to Undo / Redo) ; or an older state (see
 * builderNameVersion()).
 */
export function builderSaveVersion(name: string) {

    cy.get("[data-cy='builder-save-version']").should("be.enabled").click();

    cy.get("[data-cy='builder-save-version-name'] input").clear().type(name);
    cy.get("[data-cy='builder-save-version-create']").click();

    builderAssertNotification("Schema version saved : " + name);

    // The user moves on : the tooltip of the button (hovered, focused again once the dialog is closed) is closed.
    cy.document().then(doc => (doc.activeElement as HTMLElement | null)?.blur());
    cy.get("[data-cy='builder-save-version']").parent().trigger("mouseout");

}

/**
 * The history of the schema (Open a schema version, top bar) : a grid, the newest first (columns : actions, name,
 * change, user, saved).
 */
export function builderHistory() {

    cy.get("body").then($body => {
        // Opened once.
        $body.find("[data-cy='builder-versions-list']").length === 0 && cy.get("[data-cy='builder-versions']").click();
    });

    return cy.get("[data-cy='builder-versions-list'] .MuiDataGrid-row");

}

/**
 * @param row its index (the newest first) or a text of the row (e.g., the name of a version)
 */
function builderHistoryRow(row: number | string) {

    return typeof row === "number" ? builderHistory().eq(row) : builderHistory().filter(`:contains("${row}")`);

}

/**
 * A click in the grid of the history : not scrolled to the top (its rows are virtualized : rendered again, the element
 * clicked is detached).
 */
const GRID_CLICK = {scrollBehavior: "nearest"} as const;

/**
 * An action of a row of the history (its icons).
 */
export function builderHistoryAction(row: number | string, action: "restore" | "download") {

    builderHistoryRow(row).find(`[data-cy='builder-version-${action}']`).should("be.enabled").click(GRID_CLICK);

}

/**
 * Names a version of the history (an older state) : its name cell.
 */
export function builderNameVersion(row: number | string, name: string) {

    builderHistoryRow(row).find("[data-field='name']").click(GRID_CLICK);
    cy.get("[data-cy='builder-versions-list'] [data-field='name'] input").type(name + "{enter}");

    builderAssertNotification("Schema version saved : " + name);

}

function descriptionField() {
    return cy.contains("label", "Description").parent().find("input, textarea").first();
}

/**
 * The saves of the autosave of a page (see builderWaitAutosave()) : to be set up before the change.
 */
export function builderInterceptAutosave() {

    // The saves of a page of the builder : the header of its edit session (one revision per page visit).
    cy.intercept({method: "POST", headers: {"ic3-edit-session": /.+/}}).as("autosave");

}

/**
 * The change of the page has been saved by its autosave (see builderInterceptAutosave()).
 */
export function builderWaitAutosave() {

    cy.wait("@autosave");
    cy.get("[data-cy='builder-autosave-status']").should("have.attr", "data-cy-status", "saved");

}

/**
 * A manual change of the schema : its description, saved when leaving the field (the current page must be the schema
 * properties : no reload, e.g., the AI cards keep the revision of their change, see builderOpenSchema()).
 *
 * The changes of a page visit are a single Undo step (e.g., cy.reload() for another step).
 */
export function builderEditSchemaDescription(description: string) {

    builderInterceptAutosave();

    builderTypeSchemaDescription(description);
    descriptionField().blur();

    builderWaitAutosave();

}

/**
 * Types the description of the schema without saving it : unsaved changes (the current page must be the schema
 * properties).
 */
export function builderTypeSchemaDescription(description: string) {

    descriptionField().clear().type(description);

}

/**
 * The browser asks (or not) before leaving the page (reload, close the tab, another URL) : the page cancels the
 * beforeunload event (the prompt of the browser itself cannot be tested).
 */
export function builderAssertAsksBeforeLeaving(asks: boolean) {

    cy.window().should(win => {

        const event = new win.Event("beforeunload", {cancelable: true});
        win.dispatchEvent(event);

        expect(event.defaultPrevented, "the browser asks before leaving the page").to.eq(asks);

    });

}

/**
 * The description of the schema (schema properties page) : e.g., restored by an Undo.
 */
export function builderAssertSchemaDescription(description: string) {

    descriptionField().should("have.value", description);

}
