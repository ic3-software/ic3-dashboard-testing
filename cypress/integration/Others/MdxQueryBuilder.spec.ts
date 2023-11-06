import {
    schemaBrowserDragNode,
    schemaBrowserExpandNode,
    SchemaBrowserMdxEntityDataType
} from "./../Editor/MdxQueryEditorUtils";

describe("Others/MDXQueryBuilder", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/MDXQueryBuilder", true, false);
        cy.waitForQueryCount(0);
    });

    it("Basis", () => {

        schemaBrowserExpandNode(SchemaBrowserMdxEntityDataType.DIMENSION, "Geography", "");
        schemaBrowserExpandNode(SchemaBrowserMdxEntityDataType.HIERARCHY, "Geography", "");

        schemaBrowserExpandNode(SchemaBrowserMdxEntityDataType.DIMENSION, "Customer", "");
        schemaBrowserExpandNode(SchemaBrowserMdxEntityDataType.HIERARCHY, "Customer", "");

        schemaBrowserExpandNode(SchemaBrowserMdxEntityDataType.MEASURE_FOLDER, "Amounts", "");

        schemaBrowserDragNode("Country", "Rows", "");
        schemaBrowserDragNode("Type", "Columns", "");
        schemaBrowserDragNode("Amount", "Measures", "");

        cy.getWidget("ww3").find(".ic3HtmlBox-root").contains("{[Measures].[Amount]} ON \"Measures\"");
        cy.getWidget("ww3").find(".ic3HtmlBox-root").contains("[Customer].[Customer].[Type].allMembers ON \"Columns\"");
        cy.getWidget("ww3").find(".ic3HtmlBox-root").contains("[Geography].[Geography].[Country].allMembers ON \"Rows\"");
    });

})
