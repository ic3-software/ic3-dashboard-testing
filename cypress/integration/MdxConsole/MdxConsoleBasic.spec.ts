// @ts-ignore
import readXlsxFile, {Row} from "read-excel-file";


function selectSalesDemoSchema() {
    cy.get(".ic3MdxConsoleSchemaBrowser-schemaChooser [data-cy='field-schemaName'] input").click()
    cy.wait(500)
    cy.get(".ic3MdxConsoleSchemaBrowser-schemaChooser [data-cy='field-schemaName'] input").type("Sales (Demo)", {force: true});

    cy.get(".ic3MdxConsoleSchemaBrowser-schemaChooser [data-cy='field-schemaName']").get('li.MuiAutocomplete-option[data-option-index="0"]').click()
}

function executeQuery() {
    cy.get(".ic3MdxConsoleSchemaBrowser-schemaChooser .ic3FormFieldGroup-summaryAsLabel").contains("Select a Schema");

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

    // one and only one query
    cy.waitForQueryCount(0);
    cy.get("button[data-cy='appMenu-button-mdxConsole.execute']").click()
    cy.assertPivotTableRowCount("w-result", 16);
    cy.waitForQueryCount(1);
}

describe("Local State/Bar chart", () => {


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

    it("Debugger", () => {

        selectSalesDemoSchema()


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

        cy.get("button[data-cy='appMenu-button-mdxConsole.debug']").click();


        cy.assertTableColCount("w-debugger", 2);
        cy.assertTableColumnHeader("w-debugger", 0, "Info");
        cy.assertTableColumnHeader("w-debugger", 1, "Details");

    });
});