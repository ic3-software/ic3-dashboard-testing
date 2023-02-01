import {assertButtonsSelection} from "./FilterUtils";

describe("Filters/Buttons Custom Event Value", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Buttons Custom Event Value", true, false);
        cy.waitForQueryCount(2);
    });

    it("ww0: Buttons - custom click events - no selection", () => {

        const availableButtons = ["Business", "Consumer"];

        const widgetId = "ww0";
        const eventWidgetId = "ww1";

        // Starting wo/ selection
        assertButtonsSelection(widgetId, eventWidgetId, availableButtons, [], null);

        // Selecting Business
        cy.selectButton(widgetId, "Business");
        assertButtonsSelection(widgetId, eventWidgetId, availableButtons, [], "event caption 0", "event value 0");

        // Selecting Consumer
        cy.selectButton(widgetId, "Consumer");
        assertButtonsSelection(widgetId, eventWidgetId, availableButtons, [], "event caption 1", "event value 1");
    });

    it("ww2: Buttons - Custom selection mdx value", () => {

        const availableButtons = ["Business", "Consumer"];

        const widgetId = "ww2";
        const eventWidgetId = "ww3";

        // Selecting Business
        cy.selectButton(widgetId, "Business");
        assertButtonsSelection(widgetId, eventWidgetId, availableButtons, ["Business"], "Business", "Business event MDX");

        // Selecting Consumer
        cy.selectButton(widgetId, "Consumer");
        assertButtonsSelection(widgetId, eventWidgetId, availableButtons, ["Consumer"], "Consumer", "Consumer event MDX");

    });

});
