import {assertTableColumnWidth, dragTableColumnWidth, getTableHeaderSelector} from "./TableUtils";

export {};


const widgetId = "ww0";

describe("Tables/Table Local State", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table LocalState");
        cy.waitForQueryCount(1);
    });

    it("column sizing", () => {

        assertTableColumnWidth(cy, widgetId, "Country", 180);
        assertTableColumnWidth(cy, widgetId, "Personal", 80);

        dragTableColumnWidth(cy, widgetId, "Country", 55);
        assertTableColumnWidth(cy, widgetId, "Country", 180 + 55);

        cy.reloadAndWait();

        assertTableColumnWidth(cy, widgetId, "Country", 180 + 55);
        cy.clickUserMenu(widgetId, "clearState");
        assertTableColumnWidth(cy, widgetId, "Country", 180);

        cy.reloadAndWait();
        assertTableColumnWidth(cy, widgetId, "Country", 180);
    });

    it("column filtering", () => {

        cy.assertTableRowCount(widgetId, 31);
        cy.assertTableValue(widgetId, 0, 0, 'Egypt');

        cy.clickTableHeaderMenu(widgetId, 'Country', 'Filter');
        cy.get(".MuiDataGrid-panel input[placeholder='Filter value']").first().type('ia')
            .click(0, 0)

        cy.getWidget(widgetId).find(".MuiDataGrid-row").should('have.length', 7)
            .assertTableValue(widgetId, 0, 0, 'India');

        cy.reloadAndWait();

        cy.getWidget(widgetId).find(".MuiDataGrid-row").should('have.length', 7)
            .assertTableValue(widgetId, 0, 0, 'India');
        cy.clickUserMenu(widgetId, "clearState");
        cy.assertTableValue(widgetId, 0, 0, 'Egypt');

    });

    it("column hidding", () => {

        cy.assertTableColCount(widgetId, 6);

        cy.clickTableHeaderMenu(widgetId, 'Country', 'Hide');

        cy.assertTableColCount(widgetId, 5);

        cy.reloadAndWait();

        cy.assertTableColCount(widgetId, 5);
        cy.clickUserMenu(widgetId, "clearState");
        cy.assertTableColCount(widgetId, 6);

    });


    it("column pinning", () => {

        cy.clickTableHeaderMenu(widgetId, 'Server', 'Pin to left');

        cy.assertTableColumnTitle(widgetId, 0, "Server");

        cy.reloadAndWait();
        cy.waitForQueryCount(1);

        cy.assertTableColumnTitle(widgetId, 0, "Server");

        cy.clickUserMenu(widgetId, "clearState");
        if (Cypress.env('GITHUB_ACTIONS')) {
            cy.wait(5000);
        }
        cy.assertTableColumnTitle(widgetId, 0, "Country");

    });

    it("column sorting", () => {


        cy.assertTableValue(widgetId, 0, 1, "€7,000");
        cy.sortTable(widgetId, 0);
        cy.assertTableValue(widgetId, 0, 1, "€750");

        cy.reloadAndWait();

        cy.assertTableValue(widgetId, 0, 1, "€750");
        cy.clickUserMenu(widgetId, "clearState");
        cy.assertTableValue(widgetId, 0, 1, "€7,000");

    })

    it("column order", () => {

        cy.getTableHeader(widgetId, 'Country', ".MuiDataGrid-columnHeaderTitle").drag(getTableHeaderSelector('Gold', ".MuiDataGrid-columnHeaderTitle"), {
            force: true,
        });

        cy.assertTableColumnTitle(widgetId, 0, "Personal");
        cy.assertTableColumnTitle(widgetId, 4, "Country");

        cy.reloadAndWait();

        cy.assertTableColumnTitle(widgetId, 0, "Personal");
        cy.assertTableColumnTitle(widgetId, 4, "Country");
        cy.clickUserMenu(widgetId, "clearState");
        cy.assertTableColumnTitle(widgetId, 0, "Country");
        cy.assertTableColumnTitle(widgetId, 4, "Gold");

    });


});
