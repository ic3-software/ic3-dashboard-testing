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

describe("Editor/Default Event Names", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Editor/Default event");
        cy.waitForQueryCount(0);
    });

    it("Add buttons widget, check default year event name", () => {

        cy.addWidgetAndOpenEditor("ic3.FilterButtons");
        cy.get('.MuiDrawer-root #tab-query').click();

        schemaBrowserExpandNode(SchemaBrowserMdxEntityDataType.DIMENSION, "Geography");
        schemaBrowserExpandNode(SchemaBrowserMdxEntityDataType.HIERARCHY, "Geography");

        schemaBrowserDragNode("Country", "MdxBuilderFilterItems");

        cy.get('.MuiDrawer-root [data-cy="apply"]').click();
        cy.get('.MuiDrawer-root [data-cy="close"]').click();

        cy.selectButton("ww1", "China");
        cy.assertEventValue("ww0", "China");

    });

});
