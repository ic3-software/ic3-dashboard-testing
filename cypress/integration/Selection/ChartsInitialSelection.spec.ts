export {};

describe("Selection/Charts Initial Selection", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Selection/Charts Initial Selection");
        cy.waitForQueryCount(2);
    });

    it("ww2: Column with single selection", () => {

        const eventWidgetId = "ww3";

        cy.assertEventValue(eventWidgetId, "(License, 2022)");
        cy.assertEventMdx(eventWidgetId, "([Product].[Product].[Category].&[1],[Time].[Time].[Year].&[2022-01-01])");

    });

    it("ww0: Donut multiple initial selection", () => {

        const eventWidgetId = "ww1";

        cy.assertEventValue(eventWidgetId, "2020, 2022");
        cy.assertEventMdx(eventWidgetId, "{[Time].[Time].[Year].&[2020-01-01],[Time].[Time].[Year].&[2022-01-01]}");

    });

});
