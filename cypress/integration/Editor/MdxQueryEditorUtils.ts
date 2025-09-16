export enum SchemaBrowserMdxEntityDataType {

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

export function schemaBrowserExpandNode(type: SchemaBrowserMdxEntityDataType, caption: string, rootClass = ".ic3EditorDrawerShell-content") {

    cy.get(rootClass + ' .ic3WidgetEditorQueryPanel-Hierarchies div[data-cy-type="' + type + '"][data-cy="' + caption + '"] button')
        .click({multiple: true})
    ;

}

export function schemaBrowserDragNode(caption: string, dropAxis: string, rootClass = ".ic3EditorDrawerShell-content") {

    cy.get(`${rootClass} .ic3WidgetEditorQueryPanel-Hierarchies div[data-cy="${caption}"] .ic3-draggable`)
        .scrollIntoView()
        .should('be.visible')
        .as('dragSource');

    // Wait for the drop zone to be visible
    cy.get(`${rootClass} .ic3WidgetEditorQueryPanel-Axis[data-cy="${dropAxis}"] .ic3-dropZone`)
        .should('be.visible')
        .as('dropTarget');

    // Perform drag and drop with more reliable events
    cy.get('@dragSource').trigger('mousedown', { which: 1, button: 0 });

    // Add slight delay to ensure drag start is registered
    cy.wait(100);

    cy.get('@dragSource')
        .trigger('dragstart')
        .trigger('drag', { force: true });

    cy.get('@dropTarget')
        .trigger('dragover')
        .trigger('drop', { force: true });

}