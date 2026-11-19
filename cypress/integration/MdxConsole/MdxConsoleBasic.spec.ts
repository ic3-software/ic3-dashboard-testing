

function selectSalesDemoSchema() {
    cy.get(".ic3MdxConsoleSchemaBrowser-schemaChooser [data-cy='field-schemaName'] input").click()
    cy.wait(500)
    cy.get(".ic3MdxConsoleSchemaBrowser-schemaChooser [data-cy='field-schemaName'] input").type("Sales (Demo)", {force: true});

    cy.get(".ic3MdxConsoleSchemaBrowser-schemaChooser [data-cy='field-schemaName']").get('li.MuiAutocomplete-option[data-option-index="0"]').click()
}

function selectSchemaAndTypeQuery() {
    selectSalesDemoSchema();

    cy.get(".ic3MdxConsoleSchemaBrowser-schemaChooser .ic3FormFieldGroup-summaryAsLabel").click();
    cy.get(".ic3MdxConsoleSchemaBrowser-schemaChooser .ic3FormFieldGroup-summaryAsLabel").contains("Sales (Demo)");

    cy.getWidget("!w-console").find('.cm-content')
        .invoke('text', "SELECT  \n" +
            "  [Measures].members  on 0\n" +
            "  [Customers].[Geography].[Country] on 1\n" +
            "FROM [Sales] \n"
            + "-- " + new Date()
        )
        .wait(500)
}

function executeQuery() {
    cy.get(".ic3MdxConsoleSchemaBrowser-schemaChooser .ic3FormFieldGroup-summaryAsLabel").contains("Select a Schema");

    selectSchemaAndTypeQuery();

    // one and only one query
    cy.waitForQueryCount(0);
    cy.get("button[data-cy='appMenu-button-mdxConsole.execute']").click()
    cy.assertPivotTableRowCount("w-result", 16);
    cy.waitForQueryCount(1);
}

describe("Mdx Console", () => {


    beforeEach(() => {
        cy.login();
        cy.openMdxConsole();
        cy.clearAllLocalStorage();
    });

    it("Export Excel", () => {

        executeQuery();

        cy.exportToExcel("w-result");

        cy.readFileFromDownload("Result ( Pivot Table ) .xlsx").then((blob) => {
            //  check the file exits
        });

        cy.clickUserMenu("w-result", "export_csv");
        cy.readFileFromDownload("Result ( Pivot Table ) .csv").then((blob) => {
            //  check the file exits
        });

    });
    it("Basic", () => {
        executeQuery();

        // check local storage
        cy.reload();
        cy.waitForQueryCount(0);
        cy.getWidget("!w-result").wait(300)
        cy.getWidget("!w-result").find(".ic3WidgetBoxContentMessage-content").should('have.value', '');
        cy.get("button[data-cy='appMenu-button-mdxConsole.execute']").click()
        cy.assertPivotTableRowCount("w-result", 16);
        cy.waitForQueryCount(1);


        // w-status
        cy.getWidget("!w-status").find(".ic3MdxConsoleStatus-message").contains("executed")

        // switch to tidy
        cy.getWidget("!w-status").find(".ic3-mdx-console-forceTidy-switch").click();
        cy.assertTableRowCount("w-result", 30);
        cy.assertTableColCount("w-result", 3);
        cy.waitForQueryCount(1);

        // switch row-number
        cy.getWidget("!w-status").find(".ic3-mdx-console-show-run-numbers-switch").click();
        cy.assertTableRowCount("w-result", 30);
        cy.assertTableColCount("w-result", 4);
        cy.waitForQueryCount(1);

        // check local storage (both swiches)
        cy.reload();
        cy.waitForQueryCount(0);
        cy.getWidget("!w-result").wait(300)
        cy.get("button[data-cy='appMenu-button-mdxConsole.execute']").click();
        cy.assertTableColCount("w-result", 4);


    });

    /**
     * Profile | Debug : the query executed, its time in the status (ms below a second, s above).
     */
    function profileQuery(action: "mdxConsole.profile" | "mdxConsole.debug") {

        selectSchemaAndTypeQuery();

        cy.get(`button[data-cy='appMenu-button-${action}']`).click();

        cy.getWidget("!w-status").find(".ic3MdxConsoleStatus-message").contains(/executed in [\d.,]+ m?s/);
    }

    it("Profiler", () => {

        profileQuery("mdxConsole.profile");

        // no tabs : the profiler only
        cy.getWidget("!w-debugger").find(".ic3MdxConsolePanelToolbar-title").should("have.text", "Profiler");
        cy.getWidget("!w-debugger").find(".MuiTab-root").should("not.exist");

        // the query details (selected by default) : Info | Details | copy
        cy.assertTableColCount("w-debugger", 3);
        cy.assertTableColumnHeader("w-debugger", 0, "Info");
        cy.assertTableColumnHeader("w-debugger", 1, "Details");
        cy.getWidget("!w-debugger").should("contain.text", "Elapsed Time");

    });

    it("Debugger", () => {

        profileQuery("mdxConsole.debug");

        // the tabs : Debugger (selected) | Measures
        cy.getWidget("!w-debugger").find(".MuiTab-root").should("have.length", 2);
        cy.getWidget("!w-debugger").find(".MuiTab-root.Mui-selected").should("have.text", "Debugger");

        // the cells traced per row (a rows axis)
        cy.getWidget("!w-debugger").find(".ic3MdxConsoleDebuggerWidget-tree")
            .should("contain.text", "Cell Evaluation")
            .and("contain.text", "Row");

        cy.getWidget("!w-debugger").find(".MuiTab-root").contains("Measures").click();
        cy.getWidget("!w-debugger").find(".MuiTab-root.Mui-selected").should("have.text", "Measures");

    });
});