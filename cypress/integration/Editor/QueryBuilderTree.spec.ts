
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

describe("Query Builder Tree", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Editor/QueryBuilderTree");
        cy.waitForQueryCount(2);
    });

    it("filter tree", () => {

        cy.widgetEditorOpen("ww0");

        cy.get(".WidgetEditorQueryPanelAxis-DropZoneFilter").click();
        // Country in two hierarchies
        cy.get(".ic3QueryBuilderNode-root").should("have.length", 5);

        cy.widgetEditorFilter("coto");
        cy.get(".ic3QueryBuilderNode-root").should("have.length", 0);

        cy.widgetEditorFilter("");
        cy.get(".ic3QueryBuilderNode-root").should("have.length", 5);

        cy.get(".WidgetEditorQueryPanelAxis-DropZoneFilter").click();

        cy.widgetEditorFilter("avg");
        cy.get(".ic3QueryBuilderNode-root").should("have.length", 4);

        cy.widgetEditorFilter("year");
        cy.get(".ic3QueryBuilderNode-root").should("have.length", 6);

        cy.widgetEditorApplyAndClose();
    });

    it("checking visible / invisible dimensions", () => {

        cy.widgetEditorOpen("ww1");
        cy.widgetEditorChangeTab("tab-query");

        cy.widgetEditorChangeCube("Cube-Country");
        cy.get(".ic3QueryBuilderNode-root").should("have.length", 4);
        cy.widgetEditorMdxTreeHasNode("Country");
        cy.widgetEditorMdxTreeHasNode("Country Measures");
        cy.widgetEditorMdxTreeHasNode("Country - Visible");

        cy.widgetEditorChangeCube("Cube-Color");
        cy.get(".ic3QueryBuilderNode-root").should("have.length", 4);
        cy.widgetEditorMdxTreeHasNode("Color");
        cy.widgetEditorMdxTreeHasNode("Color Measures");
        cy.widgetEditorMdxTreeHasNode("Country - Visible");

    });

    it("not closing on apply", () => {

        cy.widgetEditorOpen("ww0");
        cy.widgetEditorChangeTab("tab-query");

        schemaBrowserExpandNode(SchemaBrowserMdxEntityDataType.DIMENSION, "Geography");
        schemaBrowserExpandNode(SchemaBrowserMdxEntityDataType.HIERARCHY, "Geography");
        cy.widgetEditorApply();

        cy.get("div.ic3QueryBuilderNode-itemText[title='Country (31)']").should("be.visible");
    });

});
