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

function assertSelection(widgetId: string, eventWidgetId: string, available: string[], selection: string[], event: string | null, mdx?: string) {

    if (selection.length === 0) {

        // Dunno but there seems to be always at least one active mark... so let's check instead the ic3 empty marker
        // available.forEach(c => {
        //     cy.assertSliderNotSelected(widgetId, c);
        // });

        cy.assertSliderWithoutSelection(widgetId);

    } else {

        selection.forEach(c => {
            cy.assertSliderSelected(widgetId, c);
        });

        const selectionS = new Set<string>(selection);

        available.forEach(c => {
            if (!selectionS.has(c)) {
                cy.assertSliderNotSelected(widgetId, c);
            }
        });

    }

    cy.assertEventValue(eventWidgetId, event);

    if (mdx !== undefined) {

        cy.assertEventMdx(eventWidgetId, mdx);

    }

}

describe("Filters/Slider Behavior", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Slider Behavior", true, false);
        cy.waitForQueryCount(12 /* 3 embedded data source */);
    });

    it("ww0: Checkbox - Single", () => {

        const widgetId = "ww0";
        const eventWidgetId = "ww1";

        // Starting wo/ selection
        assertSelection(widgetId, eventWidgetId, COUNTRIES, [], null);

        // Selecting Country
        cy.selectSlider(widgetId, "Egypt");
        assertSelection(widgetId, eventWidgetId, COUNTRIES, ["Egypt"], "Egypt");

        // Selecting Country
        cy.selectSlider(widgetId, "China");
        assertSelection(widgetId, eventWidgetId, COUNTRIES, ["China"], "China");

        // Clear Selection
        cy.clickUserMenuClearSelection(widgetId);
        assertSelection(widgetId, eventWidgetId, COUNTRIES, [], null);
    });

    it("ww2: Checkbox - Multiple", () => {

        const widgetId = "ww2";
        const eventWidgetId = "ww3";

        const selections = ["China", "Egypt", "India"];

        // Starting wo/ selection
        assertSelection(widgetId, eventWidgetId, COUNTRIES, [], null);

        cy.selectSlider(widgetId, "Egypt");
        assertSelection(widgetId, eventWidgetId, COUNTRIES, ["Egypt"], "Egypt");

        cy.selectSlider(widgetId, "China");
        assertSelection(widgetId, eventWidgetId, COUNTRIES, ["Egypt", "South Africa", "China"], "Egypt, South Africa, China");

        // Clear Selection
        cy.clickUserMenuClearSelection(widgetId);
        assertSelection(widgetId, eventWidgetId, COUNTRIES, [], null);
    });

    it("ww4: Checkbox - Initial Selection (Single)", () => {

        const widgetId = "ww4";
        const eventWidgetId = "ww5";

        assertSelection(widgetId, eventWidgetId, COUNTRIES, ["South Africa"], "South Africa");

    });


    it("ww29: Checkbox - Initial Selection (Range)", () => {

        const widgetId = "ww29";
        const eventWidgetId = "ww30";

        assertSelection(widgetId, eventWidgetId, COUNTRIES, ["South Africa", "China", "India", "Indonesia"], "South Africa, China, India, Indonesia");

    });

    // it("ww6: Empty Behavior - Select All", () => {
    //
    //     const widgetId = "ww6";
    //     const eventWidgetId = "ww7";
    //
    //     assertSelection(widgetId, eventWidgetId, COUNTRIES, [], COUNTRIES.join(","));
    //
    //     cy.selectSlider(widgetId, "Egypt");
    //     assertSelection(widgetId, eventWidgetId, COUNTRIES, ["Egypt"], "Egypt");
    //
    //     cy.clickUserMenuClearSelection(widgetId)
    //     assertSelection(widgetId, eventWidgetId, COUNTRIES, [], COUNTRIES.join(","));
    // });

    it("ww27: Multi: Empty Behavior - Select All", () => {

        const widgetId = "ww27";
        const eventWidgetId = "ww28";

        assertSelection(widgetId, eventWidgetId, COUNTRIES, COUNTRIES, COUNTRIES.join(", "));

        cy.selectSlider(widgetId, "South Africa");
        assertSelection(widgetId, eventWidgetId, COUNTRIES, COUNTRIES.slice(1), COUNTRIES.slice(1).join(", "));

        cy.clickUserMenuClearSelection(widgetId);
        assertSelection(widgetId, eventWidgetId, COUNTRIES, COUNTRIES, COUNTRIES.join(", "));
    });

    it("ww8: Empty Behavior - Default Member All Regions", () => {

        const widgetId = "ww8";
        const eventWidgetId = "ww9";

        assertSelection(widgetId, eventWidgetId, COUNTRIES, [], "All Regions");

        cy.selectSlider(widgetId, "Egypt");
        assertSelection(widgetId, eventWidgetId, COUNTRIES, ["Egypt"], "Egypt");

        cy.clickUserMenuClearSelection(widgetId);
        assertSelection(widgetId, eventWidgetId, COUNTRIES, [], "All Regions");
    });

    it("ww10: Empty Behavior - Do not allow empty Egypt", () => {

        const widgetId = "ww10";
        const eventWidgetId = "ww11";

        assertSelection(widgetId, eventWidgetId, COUNTRIES, ["Egypt"], "Egypt");

        cy.selectSlider(widgetId, "China");
        assertSelection(widgetId, eventWidgetId, COUNTRIES, ["China"], "China");

        cy.clickUserMenuClearSelection(widgetId);
        assertSelection(widgetId, eventWidgetId, COUNTRIES, ["Egypt"], "Egypt");
    });

    it("ww12: Connected Buttons", () => {

        let queryCount = 11;

        const widgetId_top = "ww12";
        const widgetId_middle = "ww14";
        const widgetId_bottom = "ww18";

        const eventWidgetId = "ww13";

        assertSelection(widgetId_top, eventWidgetId, CONTINENTS, [], "--");

        cy.getWidget(widgetId_middle, "data-cy-waiting");
        cy.getWidget(widgetId_bottom, "data-cy-waiting");
        cy.waitForQueryCount(++queryCount);

        // click in top
        cy.selectSlider(widgetId_top, "Africa");
        cy.waitForQueryCount(++queryCount);
        assertSelection(widgetId_top, eventWidgetId, CONTINENTS, ["Africa"], "Africa--");
        assertSelection(widgetId_middle, eventWidgetId, ["Egypt", "South Africa"], [], "Africa--");
        cy.getWidget(widgetId_bottom, "data-cy-waiting");

        // click in middle
        cy.selectSlider(widgetId_middle, "Egypt");
        cy.waitForQueryCount(++queryCount);
        assertSelection(widgetId_top, eventWidgetId, CONTINENTS, ["Africa"], "Africa-Egypt-Alexandria");
        assertSelection(widgetId_middle, eventWidgetId, [], ["Egypt"], "Africa-Egypt-Alexandria");
        assertSelection(widgetId_bottom, eventWidgetId, [], ["Alexandria"], "Africa-Egypt-Alexandria");

        cy.selectSlider(widgetId_middle, "South Africa");
        cy.waitForQueryCount(++queryCount);
        assertSelection(widgetId_top, eventWidgetId, CONTINENTS, ["Africa"], "Africa-South Africa-Durban");
        assertSelection(widgetId_middle, eventWidgetId, [], ["South Africa"], "Africa-South Africa-Durban");
        assertSelection(widgetId_bottom, eventWidgetId, [], ["Durban"], "Africa-South Africa-Durban");

    });

    it("ww15: Connected Buttons Egypt", () => {

        const widgetId_top = "ww15";
        const widgetId_bottom = "ww16";

        const eventWidgetId = "ww17";

        assertSelection(widgetId_top, eventWidgetId, COUNTRIES, [], null);
        assertSelection(widgetId_bottom, eventWidgetId, COUNTRIES, [], null);

        cy.selectSlider(widgetId_top, "China");
        assertSelection(widgetId_top, eventWidgetId, COUNTRIES, ["China"], "China");
        assertSelection(widgetId_bottom, eventWidgetId, COUNTRIES, ["China"], "China");

        cy.selectSlider(widgetId_bottom, "Iran");
        assertSelection(widgetId_top, eventWidgetId, COUNTRIES, ["Iran"], "Iran");
        assertSelection(widgetId_bottom, eventWidgetId, COUNTRIES, ["Iran"], "Iran");

        // The state of the selection is not part of the widget ownProps but in the event value.
        //      See TidyTableInteraction
        //              this.appContext.dispatchRedux(changeTidySelectionEvent(this.nsId, this.wuid, toSelection));
        //          not performed.
        // --
        // The user menu cannot easily detect that condition to active the Clear Selection option.
        //      WidgetBoxUserMenu const hasSelection = useSelector( ownProps )

        // // clear selection fom TOP
        // cy.clickUserMenuClearSelection(widgetId_top);
        // assertSelection(widgetId_top, eventWidgetId, COUNTRIES, [], null);
        // assertSelection(widgetId_bottom, eventWidgetId, COUNTRIES, [], null);
        //
        // cy.selectSlider(widgetId_top, "China");
        // assertSelection(widgetId_top, eventWidgetId, COUNTRIES, ["China"], "China");
        // assertSelection(widgetId_bottom, eventWidgetId, COUNTRIES, ["China"], "China");
        //
        // // clear selection fom BOTTOM
        // cy.clickUserMenuClearSelection(widgetId_bottom);
        // assertSelection(widgetId_top, eventWidgetId, COUNTRIES, [], null);
        // assertSelection(widgetId_bottom, eventWidgetId, COUNTRIES, [], null);

    })

    it("ww19: Selection from embedded", () => {

        const widgetId = "ww19";
        const eventWidgetId = "ww20";

        assertSelection(widgetId, eventWidgetId, [],
            ["Last week of May"],
            "Last week of May",
            "[Time].[Time].[day].[24 May 2021]:[Time].[Time].[day].[31 May 2021]"
        );

    });

    it("ww21: Selection from embedded Simple", () => {

        const widgetId = "ww21";
        const eventWidgetId = "ww22";

        assertSelection(widgetId, eventWidgetId, [],
            ["Last week of May"],
            "Last week of May",
            "Last week of May"
        );

    });

    it("ww23: Selection from embedded with caption", () => {

        const widgetId = "ww23";
        const eventWidgetId = "ww24";

        assertSelection(widgetId, eventWidgetId, [],
            ["Last week of May"],
            "Last week of May",
            "[Time].[Time].[day].[24 May 2021]:[Time].[Time].[day].[31 May 2021]"
        );

    });

    it("ww25: Selection and sorting", () => {

        const widgetId = "ww25";
        const eventWidgetId = "ww26";

        assertSelection(widgetId, eventWidgetId, [],
            ["China"],
            "China",
            "[Geography].[Geography].[Country].&[CN]"
        );

        cy.assertSlider(widgetId,
            [...COUNTRIES].sort((a, b) => a.localeCompare(b))
        )

    });

});
