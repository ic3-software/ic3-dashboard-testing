function clickDonut(widgetBoxId: string, color: string, zoomed?: boolean): void {
    cy.getWidgetWithNS(zoomed ? "zoom" : "default", widgetBoxId)
        .find(".ic3WidgetBox-content")
        .find("svg")
        .find('g[fill="' + color + '"]')
        .first()
        .click({force: true});
}

describe("Selection on Widget Zoom InOut", () => {

    const queryCount = 2;

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Selection/Selection on Widget Zoom InOut");
        cy.waitForQueryCount(queryCount);

    });

    it("ww0:Bars", () => {

        const widgetId = "ww0";
        const tableWid = "ww1";

        cy.waitForQueryCount(queryCount);
        clickDonut(widgetId, "#e07a5f")
        cy.waitForQueryCount(queryCount + 1);
        cy.assertTableCellContent(tableWid, 0, 1, "170")

        cy.clickUserMenuZoom(widgetId);
        cy.assertZoomedHeader(widgetId, "2020");

        clickDonut(widgetId, "#3d405b", true)
        cy.waitForQueryCount(queryCount + 1);
        cy.assertZoomedHeader(widgetId, "2019");

        cy.closeZoomedWidget(widgetId);
        cy.waitForQueryCount(queryCount + 2);
        cy.assertWidgetHeader(tableWid, "2019");
        cy.assertTableCellContent(tableWid, 0, 1, "209")

    })
})