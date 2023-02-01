export {};

describe("Editor/Zoom in out", () => {

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
        cy.get(".ic3QueryBuilderNode-root").should("have.length", 3);

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

});
