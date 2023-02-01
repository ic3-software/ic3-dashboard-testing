export {}

describe("Filters/Initial selection numeric", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Initial selection numeric", true, false);
        cy.waitForQueryCount(0 /* 5 embedded data source */);
    });

    it("checkbox", () => {

        const widgetId = "ww2";
        const eventWidgetId = "ww0";

        cy.assertEventValue(eventWidgetId, "10");
        cy.assertEventMdx(eventWidgetId, "TopCount([Geography].[Classification].[Country], 10, [Measures].[Amount])");

    });

    it("buttons", () => {

        const widgetId = "ww1";
        const eventWidgetId = "ww3";

        cy.assertEventValue(eventWidgetId, "5");
        cy.assertEventMdx(eventWidgetId, "TopCount([Geography].[Classification].[Country], 5, [Measures].[Amount])");

    });

    it("dropdown", () => {

        const widgetId = "ww4";
        const eventWidgetId = "ww5";

        cy.assertEventValue(eventWidgetId, "15");
        cy.assertEventMdx(eventWidgetId, "TopCount([Geography].[Classification].[Country], 15, [Measures].[Amount])");

    });

    it("tree", () => {

        const widgetId = "ww6";
        const eventWidgetId = "ww7";

        cy.assertEventValue(eventWidgetId, "20");
        cy.assertEventMdx(eventWidgetId, "TopCount([Geography].[Classification].[Country], 20, [Measures].[Amount])");

    });

    it("slider", () => {

        const widgetId = "ww8";
        const eventWidgetId = "ww9";

        cy.assertEventValue(eventWidgetId, "203");
        cy.assertEventMdx(eventWidgetId, "TopCount([Geography].[Classification].[Country], 203, [Measures].[Amount])");

    });

});
