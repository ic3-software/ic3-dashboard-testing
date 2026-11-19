/**
 * Tracing a failure on GitHub (no screenshot) : the gvi requests (e.g., the queries) sent by the test.
 */
interface GviRequest {
    start: number;
    end?: number;
    status?: number;
    body: string;
}

/**
 * e.g., +1234 ms → +1500 ms : 200 : <body> ; a request never answered : pending.
 */
function traceGviRequests(requests: GviRequest[], t0: number): string {

    const ms = (time: number) => "+" + (time - t0) + " ms";

    return "\ngvi requests :\n" + requests.map(r =>
        "  " + ms(r.start) + " → " + (r.end != null ? ms(r.end) + " : " + r.status : "pending") + " : " + r.body
    ).join("\n");

}

describe("Gadgets/CreateGadgetFromScratch", () => {

    beforeEach(() => {

        const t0 = Date.now();
        const requests: GviRequest[] = [];

        cy.intercept("POST", "**/icCube/gvi*", req => {

            const body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
            const request: GviRequest = {start: Date.now(), body: body.replace(/userPassword=[^&]*/, "userPassword=***").slice(0, 300)};

            requests.push(request);

            req.on("response", res => {
                request.end = Date.now();
                request.status = res.statusCode;
            });

        });

        cy.on("fail", err => {
            err.message += traceGviRequests(requests, t0);
            throw err;
        });

        cy.login();
        cy.openGadgetEditor();
    });

    it("ww0: Edit Gadget Test", () => {

        /*
        Creating a gadget from scratch in the gadget editor.
         */

        // Open gadget editor
        cy.get("[data-cy='action-newGadget']").click();
        cy.get("div[data-cy=schemaName] input").click()
        cy.get("div[data-cy=schemaName] input").clear();
        cy.get("div[data-cy=schemaName] input").should('have.value', '');
        cy.get("div[data-cy=schemaName] input").type("Sales (LiveDemo) (tomIII){downArrow}{enter}");
        cy.get("div[data-cy=schemaName] input").should('have.value', 'Sales (LiveDemo) (tomIII)');
        cy.get("div[data-cy='layoutConfigId-name'] input").click();
        cy.get("div[data-cy='layoutConfigId-name'] input").clear();
        cy.get("div[data-cy='layoutConfigId-name'] input").should('have.value', '');
        cy.get("div[data-cy='layoutConfigId-name'] input").type("Documentation Layout (Desktop){downArrow}{enter}")
        cy.get("div[data-cy='layoutConfigId-name'] input").should('have.value', 'Documentation Layout (Desktop)');
        cy.get("[data-cy='button-ok']").click();

        // Place table
        cy.get("[data-cy='appMenu-button-newWidget']").click();
        cy.get("[data-cy='ic3ItemChooser-ic3.Table']").click();

        cy.get('[data-cy-page-nb="0"]')
            .trigger('mousedown', 100, 100, {force: true})
            .wait(100)
            .trigger('mouseup', 100, 100, {force: true})

        cy.get('[data-cy="toolbar-openOptionsEditor"]').click();
        cy.widgetEditorEnterMdxStatement('SELECT [Measures].[Amount] ON "Columns" [Customer].[Customer].[Type].allmembers ON "Rows" FROM [Sales]')

        cy.widgetEditorApplyAndClose(30000) /* slow nightly server */;

        // Place Buttons
        cy.get("[data-cy='appMenu-button-newWidget']").click();
        cy.get("[data-cy='ic3ItemChooser-ic3.FilterButtons']").click();

        cy.get('[data-cy-page-nb="0"]')
            .trigger('mousedown', 100, 600, {force: true})
            .wait(100)
            .trigger('mouseup', 100, 600, {force: true})

        cy.get('[data-cy="toolbar-openOptionsEditor"]').click();
        cy.widgetEditorEnterMdxStatement('SELECT [Time].[Time].[Year].allmembers ON "MdxBuilderFilterItems" FROM [Sales] CELL PROPERTIES CELL_ORDINAL')

        cy.widgetEditorChangeTab("tab-interactions");
        cy.widgetEditorOpenOptionGroup("groupSelection");
        cy.widgetEditorChangeTextOption("Publish-Selection", "selYear");

        cy.widgetEditorApplyAndClose(30000) /* slow nightly server */;

        // Add event to Table query
        cy.clickUserMenuAddEventToQueries("ww1");

        // Assert filter works
        cy.get("[data-cy=ic-button][data-name=2018]").click();
        cy.assertTableCellContent("ww0", 0, 0, "Business")
        cy.assertTableCellContent("ww0", 1, 0, "Consumer")
        cy.assertTableCellContent("ww0", 0, 1, "€356,400")
        cy.assertTableCellContent("ww0", 1, 1, "€165,750")

    });

});
