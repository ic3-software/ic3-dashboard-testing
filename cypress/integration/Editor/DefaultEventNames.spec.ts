import {schemaBrowserDragNode, schemaBrowserExpandNode, SchemaBrowserMdxEntityDataType} from "./MdxQueryEditorUtils";

export {};


describe("Editor/Default Event Names", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Editor/Default event");
        cy.waitForQueryCount(0);
    });

    it("Add buttons widget, check default year event name", () => {

        cy.addWidgetAndOpenEditor("ic3.FilterButtons");
        cy.widgetEditorChangeTab('tab-query');

        schemaBrowserExpandNode(SchemaBrowserMdxEntityDataType.DIMENSION, "Geography");
        schemaBrowserExpandNode(SchemaBrowserMdxEntityDataType.HIERARCHY, "Geography");

        schemaBrowserDragNode("Country", "MdxBuilderFilterItems");

        cy.widgetEditorApplyAndClose();

        cy.selectButton("ww1", "China");
        cy.assertEventValue("ww0", "China");

    });

});
