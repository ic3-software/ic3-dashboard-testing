export {};

function assertMultiSelection(widgetId: string, eventWidgetId: string, selection: string[], event: string | null, mdx?: string) {

    cy.assertDropdownMultiSelection(widgetId, selection);

    cy.assertEventValue(eventWidgetId, event);

    if (mdx !== undefined) {

        cy.assertEventMdx(eventWidgetId, mdx);

    }

}


describe("Filters/Autocomplete Lazy Behavior", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Autocomplete Lazy Behavior", true, false);
        cy.waitForQueryCount(2);
    });

    it("ww2: Builder: Initial Selection", () => {

        const widgetId = "ww2";
        const eventWidgetId = "ww1";

        assertMultiSelection(widgetId, eventWidgetId, ["None"], "None", "[Barcode].[Barcode].[All].[None]");

        cy.selectDropdownFromInputLazy(widgetId, "AY004EYQQNQQT")
        assertMultiSelection(widgetId, eventWidgetId, ["None", "AY004EYQQNQQT"], "None,AY004EYQQNQQT", "{[Barcode].[Barcode].[All].[None],[Barcode].[Barcode].[All].&[AY004EYQQNQQT]}");

        // save state --------------------------------------------------------------------------------------------------
        cy.selectButton("ww4", "Save State (localstorage)");

        cy.clearDropdown(widgetId)
        assertMultiSelection(widgetId, eventWidgetId, [], "", "");

        // restore state -----------------------------------------------------------------------------------------------
        cy.selectButton("ww4", "Restore State (localstorage)");

        assertMultiSelection(widgetId, eventWidgetId, ["None", "AY004EYQQNQQT"], "None,AY004EYQQNQQT", "{[Barcode].[Barcode].[All].[None],[Barcode].[Barcode].[All].&[AY004EYQQNQQT]}");
    });

    it("ww2: RAW MDX: Initial Selection", () => {

        const widgetId = "ww6";
        const eventWidgetId = "ww5";

        assertMultiSelection(widgetId, eventWidgetId, ["None"], "None", "[Barcode].[Barcode].[All].[None]");

        cy.selectDropdownFromInputLazy(widgetId, "AY004EYQQNQQT")
        assertMultiSelection(widgetId, eventWidgetId, ["None", "AY004EYQQNQQT"], "None,AY004EYQQNQQT", "{[Barcode].[Barcode].[All].[None],[Barcode].[Barcode].[All].&[AY004EYQQNQQT]}");

        // save state --------------------------------------------------------------------------------------------------
        cy.selectButton("ww4", "Save State (localstorage)");

        cy.clearDropdown(widgetId)
        assertMultiSelection(widgetId, eventWidgetId, [], "", "");

        // restore state -----------------------------------------------------------------------------------------------
        cy.selectButton("ww4", "Restore State (localstorage)");

        assertMultiSelection(widgetId, eventWidgetId, ["None", "AY004EYQQNQQT"], "None,AY004EYQQNQQT", "{[Barcode].[Barcode].[All].[None],[Barcode].[Barcode].[All].&[AY004EYQQNQQT]}");
    });

});
