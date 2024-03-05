describe("Others/WidgetActions", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/WidgetActions");
        cy.waitForQueryCount(4);
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
            const pivotTable = "ww2";

            // Show/Hide Data
            cy.assertPivotTableRowCount(pivotTable, 5)
            cy.selectButton(button, "Show/Hide Data");
            cy.assertTableRowCount(pivotTable, 5);
            cy.selectButton(button, "Show/Hide Data");
            cy.assertPivotTableRowCount(pivotTable, 5);


            //Drilldown
            cy.drilldownPivotTableLeftHeader(pivotTable, 1, 0)
            cy.assertPivotTableRowCount(pivotTable, 5 + 4);
            cy.selectButton(button, "Clear Drilldown");
            cy.assertPivotTableRowCount(pivotTable, 5)

            //Export
            const path = require("path");
            const downloadsFolder = Cypress.config("downloadsFolder");

            cy.selectButton(button, "Export To Excel");
            cy.readFile(path.join(downloadsFolder, "MyExcel.xlsx")).should("exist");

            //  Chromium Renderer process just crashed ...
            // if (!Cypress.env('GITHUB_ACTION')) {
            // cy.selectButton(button, "Export To SVG");
            // cy.readFile(path.join(downloadsFolder, "MySVG.svg")).should("exist");
            //
            // cy.selectButton(button, "Export To PNG");
            // cy.readFile(path.join(downloadsFolder, "MyPNG.png")).should("exist");
            // }
        }

        {
            const table = "ww4";

            // Show/Hide Data
            cy.assertTableRowCount(table, 5);
            cy.assertTableValue(table, 1, 0, "2019");
            cy.sortTable(table, 3 /* from 2 : dunno */);
            cy.assertTableValue(table, 1, 0, "2022");
            cy.selectButton(button, "Clear State");
            cy.assertTableValue(table, 1, 0, "2019");

        }


    });

});
