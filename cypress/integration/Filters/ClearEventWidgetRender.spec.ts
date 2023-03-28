export {};

describe("Filters/Clear Event Widget Render", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Clear event render", true, false);
        cy.waitForQueryCount(1);
    });

    it("ww2: Builder: Initial Selection", () => {

        const chartWidgetId = "ww0";
        const buttonsWidgetId = "ww1";

        cy.selectButton(buttonsWidgetId, "Business");
        cy.getWidget(chartWidgetId).find("div[data-cy='data-mapping-error']", {timeout: 0}).should("not.exist");

        cy.selectButton(buttonsWidgetId, "Business");
        cy.get('[data-cy="widget-box-' + chartWidgetId + '"] .ic3WidgetBoxContentMessage-content').contains('Waiting for Event');

    });

});
