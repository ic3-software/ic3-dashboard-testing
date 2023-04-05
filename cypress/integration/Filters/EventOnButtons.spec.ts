export {};

const CONTINENTS = [
    "Africa",
    "Asia",
    "Europe",
    "North America",
    "South America",
];

const COUNTRIES = [
    "Egypt",
    "South Africa",
    "China",
    "India",
    "Indonesia",
    "Iran",
    "Japan",
];


describe("Filters/Events On Buttons", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Events on Buttons", true, false);
        cy.waitForQueryCount(2);
    });

    it("ww0: Buttons - Single", () => {

        const widgetId = "ww0";
        const eventWidgetId = "ww1";

        // Selecting Country
        cy.selectButton(widgetId, "Egypt");

        cy.assertEventValue(eventWidgetId, 'Egypt');
        cy.assertEventMdx(eventWidgetId, '[Geography].[Geography].[Country].&[EG]');
        cy.assertEventKey(eventWidgetId, 'EG');
        cy.assertEventAsSet(eventWidgetId, '{[Geography].[Geography].[Country].&[EG]}');
        cy.selectButton(widgetId, "Egypt");

        cy.selectButton(widgetId, "India");

        cy.assertEventValue(eventWidgetId, 'India');
        cy.assertEventMdx(eventWidgetId, '[Geography].[Geography].[Country].&[IN]');
        cy.assertEventKey(eventWidgetId, 'IN');
        cy.assertEventAsSet(eventWidgetId, '{[Geography].[Geography].[Country].&[IN]}');

    });

    it("ww2: Buttons - Multiple", () => {

        const widgetId = "ww2";
        const eventWidgetId = "ww3";

        // Selecting Country

        cy.keyCtrl(() => {
            ["Egypt", "India"].forEach((selection) => {
                cy.selectButton(widgetId, selection);
            });
        });

        cy.assertEventValue(eventWidgetId, 'Egypt, India');
        cy.assertEventMdx(eventWidgetId, '{[Geography].[Geography].[Country].&[EG],[Geography].[Geography].[Country].&[IN]}');
        cy.assertEventKey(eventWidgetId, 'EG,IN');
        cy.assertEventAsSet(eventWidgetId, '{[Geography].[Geography].[Country].&[EG],[Geography].[Geography].[Country].&[IN]}');

    });

});
