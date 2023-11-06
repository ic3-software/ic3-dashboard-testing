import {schemaBrowserDragNode, schemaBrowserExpandNode, SchemaBrowserMdxEntityDataType} from "./MdxQueryEditorUtils";

export {};



describe("Editor/Empty Report", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Editor/Empty Report");
        cy.waitForQueryCount(0);
    });

    /*
    Width and height of the dashboard-div remains the same when zooming in and out. Only scale changes.
     */

    it("Add widget", () => {

        //
        // Add Pivot Table using Mdx statement
        //
        cy.addWidgetAndOpenEditor("ic3.PivotTable");

        cy.widgetEditorEnterMdxStatement("SELECT [Measures].members.head(3)  on 0, [Product].[Article].[Article] on 1 from [Sales]");
        cy.widgetEditorApplyAndClose();
        cy.waitForQueryStatus();

        cy.assertPivotTableRowCount("ww0", 5);
        cy.assertPivotTableColCount("ww0", 4);

        // delete widget
        cy.get('[data-cy="toolbar-delete"]').click();
        cy.assertWidgetMissing("ww0");

        //
        // Add Table using Mdx query wizard"f
        //
        cy.addWidgetAndOpenEditor("ic3.Table");

        schemaBrowserExpandNode(SchemaBrowserMdxEntityDataType.DIMENSION, "Geography");
        schemaBrowserExpandNode(SchemaBrowserMdxEntityDataType.HIERARCHY, "Geography");

        schemaBrowserExpandNode(SchemaBrowserMdxEntityDataType.DIMENSION, "Customer");
        schemaBrowserExpandNode(SchemaBrowserMdxEntityDataType.HIERARCHY, "Customer");

        schemaBrowserExpandNode(SchemaBrowserMdxEntityDataType.MEASURE_FOLDER, "Amounts");

        //schemaBrowserExpandNode(SchemaBrowserMdxEntityDataType.LEVEL_GROUP, "Levels");

        schemaBrowserDragNode("Country", "Rows");
        schemaBrowserDragNode("Type", "Columns");
        schemaBrowserDragNode("Amount", "#Measures");

        cy.widgetEditorApplyAndClose();
        cy.waitForQueryStatus();

        cy.assertTableColCount("ww0", 3)
        cy.assertTableValue("ww0", 0, 0, "Egypt")
        cy.assertTableValue("ww0", 0, 1, "€144,000")


        // Check delete
        cy.get('[data-cy="toolbar-delete"]').click();
        cy.assertWidgetMissing("ww0");

        cy.get('[data-cy="toolbar-undo"]').click();
        cy.getWidget("ww0");
        cy.assertTableColCount("ww0", 3)
        cy.assertTableValue("ww0", 0, 0, "Egypt")
        cy.assertTableValue("ww0", 0, 1, "€144,000")

        // delete
        cy.get('[data-cy="toolbar-delete"]').click();
        cy.assertWidgetMissing("ww0");

    });

});
