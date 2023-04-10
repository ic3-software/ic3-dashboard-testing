export {};

enum SchemaBrowserMdxEntityDataType {

    SCHEMA = "SA",
    CUBE = "CE",
    DIMENSION = "DN",
    HIERARCHY = "HY",
    HIERARCHY_MEASURE = "HYME",
    LEVEL = "LL",
    MEMBER = "MR",
    MEMBER_PROPERTY = "PR",
    MEMBER_PROPERTY_ROOT = "PRR",
    TUPLE = "TE",
    MEASURE_GROUP = "MP",
    MEASURE_FOLDER = "MF",
    MEASURE = "ME",
    REPORT_CALC_MEASURE = "RCME",
    REPORT_FOLDER = "RPF",
    REPORT = "RP",
    REPORT_SNAPSHOT = "RPS",
    OTHER = "OT",

    /**
     * Experimental DataSets
     */
    DATASET_PROPERTY_ROOT = "DS_PR",
    DATASET_MEMBER_COLUMN = "DS_MRCOL",
    DATASET_MEASURE_COLUMN = "DS_MECOL",

    /**
     * ic3report client side only !
     */
    EVENTS = "EVTS",
    EVENT = "EVT",
    SET_FOLDER = "FOLDER_SET",
    SET = "SET",
    HIERARCHY_FOLDER = "HIERARCHY_FOLDER",
    LEVEL_GROUP = "LEVEL_GROUP"

}

function schemaBrowserExpandNode(type: SchemaBrowserMdxEntityDataType, caption: string) {

    cy.get('.MuiDrawer-root .ic3WidgetEditorQueryPanel-Hierarchies div[data-cy-type="' + type + '"][data-cy="' + caption + '"] button')
        .click({multiple: true})
    ;

}

function schemaBrowserDragNode(caption: string, dropAxis: string) {

    cy.get('.MuiDrawer-root .ic3WidgetEditorQueryPanel-Hierarchies div[data-cy="' + caption + '"] .ic3-draggable')
        .trigger('dragstart');

    cy.get('.MuiDrawer-root .ic3WidgetEditorQueryPanel-Axis[data-cy="' + dropAxis + '"] .ic3-dropZone')
        .trigger('drop');

}

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
        cy.get('button[data-cy="runQuery"]').click();


        cy.get('.MuiDrawer-root [data-cy="apply"]').click();
        cy.get('.MuiDrawer-root [data-cy="close"]').click();

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

        cy.get('.MuiDrawer-root [data-cy="apply"]').click();
        cy.get('.MuiDrawer-root [data-cy="close"]').click();

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
