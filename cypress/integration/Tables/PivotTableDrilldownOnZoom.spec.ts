// Same code as TableRenderers
describe("Tables/Pivot Table Drilldown on Zoom", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Pivot Table Drilldown on Zoom");
        cy.waitForQueryCount(1);
    });

    it("zoom", () => {

        const widgetId = "ww0";

        cy.waitForQueryCount(1);
        cy.clickUserMenuZoom(widgetId);
        cy.waitForQueryCount(1);

        cy.getZoomedWidget(widgetId).find(".ic3WidgetBox-content .ic3-pt-rows .ic3-pt-row")
            .should("have.length", 5)
        cy.getZoomedWidget(widgetId).find(`.ic3WidgetBox-content .ic3-pt-left-header div[data-vr='1'][data-vc='0'] svg`)
            .click()
        cy.getZoomedWidget(widgetId).find(".ic3WidgetBox-content .ic3-pt-rows .ic3-pt-row")
            .should("have.length", 5 + 4)
        cy.getZoomedWidget(widgetId).find(`.ic3WidgetBox-content .ic3-pt-left-header div[data-vr='3'][data-vc='0'] svg`)
            .click()
        cy.getZoomedWidget(widgetId).find(".ic3WidgetBox-content .ic3-pt-rows .ic3-pt-row")
            .should("have.length", 5 + 4 + 3)

        cy.waitForQueryCount(1 + 2);
        cy.clickUserMenuZoom(widgetId, true);

        cy.assertPivotTableRowCount(widgetId, 5 + 4 + 3)
        cy.waitForQueryCount(1 + 2);

    })

});
