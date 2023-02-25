describe("Others/WidgetActions", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/WidgetActions");
        cy.waitForQueryCount(3);
    });

    it("Save/Restore State", () => {


        const button = "ww0";

        {
            const filter1 = "ww1";
            const filter2 = "ww3";


            // Zoom
            cy.selectButton(button, "Zoom");
            cy.assertZoomedHeader(filter1, "Zoomed");
            cy.closeZoomedWidget(filter1);

            // Clear Selection
            cy.assertButtonSelected(filter1, "2018");
            cy.selectButton(button, "Clear Selection");
            cy.assertButtonsSelected(filter1);


            // To InitialValue
            cy.assertButtonSelected(filter2, "2018");
            cy.selectButton(filter2, "2020");
            cy.assertButtonSelected(filter2, "2020");

            cy.selectButton(button, "To Initial Selection");
            cy.assertButtonSelected(filter1, "2018");
            cy.assertButtonSelected(filter2, "2018");

        }

        {
            const table = "ww2";


            // Show/Hide Data
            cy.assertPivotTableRowCount(table, 5)
            cy.selectButton(button, "Show/Hide Data");
            cy.assertTableRowCount(table, 5);
            cy.selectButton(button, "Show/Hide Data");
            cy.assertPivotTableRowCount(table, 5);


            //Drilldown
            cy.drilldownPivotTableLeftHeader(table, 1, 0)
            cy.assertPivotTableRowCount(table, 5 + 4);
            cy.selectButton(button, "Clear Drilldown");
            cy.assertPivotTableRowCount(table, 5)

            //Export
            const path = require("path");
            const downloadsFolder = Cypress.config("downloadsFolder");

            cy.selectButton(button, "Export To Excel");
            cy.readFile(path.join(downloadsFolder, "Table.xlsx")).should("exist");

            cy.selectButton(button, "Export To SVG");
            cy.readFile(path.join(downloadsFolder, "Table.svg")).should("exist");

            cy.selectButton(button, "Export To PNG");
            cy.readFile(path.join(downloadsFolder, "Table.png")).should("exist");
        }


    });

});
