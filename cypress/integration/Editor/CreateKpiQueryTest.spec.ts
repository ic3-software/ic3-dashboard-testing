import {schemaBrowserDragNode, schemaBrowserExpandNode, SchemaBrowserMdxEntityDataType} from "./MdxQueryEditorUtils";

export {};


describe("Editor/CreateKpiQueryTest", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Editor/Empty Report");
        cy.waitForQueryCount(0);
    });

    it("Bubble", () => {

        cy.addWidgetAndOpenEditor("ic3.KpiCard");

        // Set query
        cy.widgetEditorChangeTab("tab-query");

        schemaBrowserExpandNode(SchemaBrowserMdxEntityDataType.MEASURE_FOLDER, "All measures");
        schemaBrowserDragNode("#Articles", "value");
        schemaBrowserDragNode("#Customers", "target");
        schemaBrowserDragNode("Amount VECTOR", "data");

        cy.widgetEditorApplyAndClose();
        cy.waitForQueryStatus();

        // Assert KPI
        cy.getWidget("ww0").find("h2.ic3KpiCard-valueText").should('have.text', '5');
        cy.getWidget("ww0").find("div.ic3KpiCard-comparePercentageText").should('have.text', '-98%');
        cy.getWidget("ww0").find("div.ic3KpiCard-compareTargetText").should('have.text', '#Customers');

    });

});
