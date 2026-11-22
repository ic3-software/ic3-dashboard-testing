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
        expect(reply, "upload of the schema " + name).to.have.property("success", true);
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

function descriptionField() {
    return cy.contains("label", "Description").parent().find("input, textarea").first();
}

/**
 * A manual change of the schema : its description (the current page must be the schema properties : no reload, e.g.,
 * the AI cards keep the revision of their change, see builderOpenSchema()).
 */
export function builderEditSchemaDescription(description: string) {

    descriptionField().clear().type(description);

    // The Save button of the page (no id) : saved, then the page is refreshed with the new revision of the schema and
    // its fields are new elements (UxModelEditor) : wait for them before going on (e.g., another edit).
    descriptionField().invoke("attr", "data-cy-before-save", "true");
    cy.contains("button", /^save$/i).click();
    descriptionField().should("not.have.attr", "data-cy-before-save");

}

/**
 * The description of the schema (schema properties page) : e.g., restored by an Undo.
 */
export function builderAssertSchemaDescription(description: string) {

    descriptionField().should("have.value", description);

}
