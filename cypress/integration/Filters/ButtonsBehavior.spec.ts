import {assertButtonsSelection} from "./FilterUtils";

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


describe("Filters/Buttons Behavior", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Buttons Behavior", true, false);
        cy.waitForQueryCount(11 /* 3 embedded data source */);
    });

    it("ww0: Buttons - Single", () => {

        const widgetId = "ww0";
        const eventWidgetId = "ww1";

        // Starting wo/ selection
        assertButtonsSelection(widgetId, eventWidgetId, COUNTRIES, [], null);

        // Selecting Country
        cy.selectButton(widgetId, "Egypt");
        assertButtonsSelection(widgetId, eventWidgetId, COUNTRIES, ["Egypt"], "Egypt");

        // Selecting Country
        cy.selectButton(widgetId, "China");
        assertButtonsSelection(widgetId, eventWidgetId, COUNTRIES, ["China"], "China");

        // Unselecting country
        cy.selectButton(widgetId, "China");
        assertButtonsSelection(widgetId, eventWidgetId, COUNTRIES, [], null);

        // Selecting Country
        cy.selectButton(widgetId, "China");
        assertButtonsSelection(widgetId, eventWidgetId, COUNTRIES, ["China"], "China");

        // Clear Selection
        cy.clickUserMenuClearSelection(widgetId);
        assertButtonsSelection(widgetId, eventWidgetId, COUNTRIES, [], null);
    });

    it("ww2: Buttons - Multiple", () => {

        const widgetId = "ww2";
        const eventWidgetId = "ww3";

        const selections = ["China", "Egypt", "India"];

        // Starting wo/ selection
        assertButtonsSelection(widgetId, eventWidgetId, COUNTRIES, [], null);

        // CTRL
        cy.keyCtrl(() => {
            selections.forEach((selection) => {
                cy.selectButton(widgetId, selection);
            });
        });

        assertButtonsSelection(widgetId, eventWidgetId, COUNTRIES, selections, selections.join(", "));

        // Keep China only
        cy.selectButton(widgetId, "China");
        assertButtonsSelection(widgetId, eventWidgetId, COUNTRIES, ["China"], "China");

        // Clear Selection
        cy.clickUserMenuClearSelection(widgetId);
        assertButtonsSelection(widgetId, eventWidgetId, COUNTRIES, [], null);

        // SHIFT
        cy.selectButton(widgetId, "Egypt");
        cy.keyShift(() => {
            ["Japan"].forEach((selection) => {
                cy.selectButton(widgetId, selection);
            });
        });
        assertButtonsSelection(widgetId, eventWidgetId, COUNTRIES, COUNTRIES, COUNTRIES.join(", "));
    });

    it("ww4: Buttons - Initial Selection Egypt", () => {

        const widgetId = "ww4";
        const eventWidgetId = "ww5";

        assertButtonsSelection(widgetId, eventWidgetId, COUNTRIES, ["Egypt"], "Egypt");
    });

    it("ww27: Buttons - first & last", () => {

        const widgetId = "ww27";
        const eventWidgetId = "ww28";

        assertButtonsSelection(widgetId, eventWidgetId, [],
            ["Egypt", "Japan"],
            "Egypt, Japan");

    });


    // it("ww6: Empty Behavior - Select All", () => {
    //
    //     const widgetId = "ww6";
    //     const eventWidgetId = "ww7";
    //
    //     assertSelection(widgetId, eventWidgetId, COUNTRIES, COUNTRIES, COUNTRIES.join(","));
    //
    //     // Switching to single selection
    //     cy.selectButton(widgetId, "Egypt");
    //     assertSelection(widgetId, eventWidgetId, COUNTRIES, ["Egypt"], "Egypt");
    //
    //     // Clear selection
    //     cy.selectButton(widgetId, "Egypt");
    //     assertSelection(widgetId, eventWidgetId, COUNTRIES, COUNTRIES, COUNTRIES.join(","));
    //
    //     // Clear selection from user menu
    //     cy.clickUserMenuClearSelection(widgetId)
    //     assertSelection(widgetId, eventWidgetId, COUNTRIES, COUNTRIES, COUNTRIES.join(","));
    // });

    it("ww8: Empty Behavior - Default Member All Regions", () => {

        const widgetId = "ww8";
        const eventWidgetId = "ww9";

        assertButtonsSelection(widgetId, eventWidgetId, COUNTRIES, [], "All Regions");

        cy.selectButton(widgetId, "Egypt");
        assertButtonsSelection(widgetId, eventWidgetId, COUNTRIES, ["Egypt"], "Egypt");

        // clear selection
        cy.selectButton(widgetId, "Egypt");
        assertButtonsSelection(widgetId, eventWidgetId, COUNTRIES, [], "All Regions");

        cy.selectButton(widgetId, "Egypt");
        assertButtonsSelection(widgetId, eventWidgetId, COUNTRIES, ["Egypt"], "Egypt");

        // Clear selection from user menu
        cy.clickUserMenuClearSelection(widgetId)
        assertButtonsSelection(widgetId, eventWidgetId, COUNTRIES, [], "All Regions");
    });

    it("ww10: Empty Behavior - Do not allow empty Egypt", () => {

        const widgetId = "ww10";
        const eventWidgetId = "ww11";

        assertButtonsSelection(widgetId, eventWidgetId, COUNTRIES, ["Egypt"], "Egypt");

        // trying to clear the selection
        cy.selectButton(widgetId, "Egypt");
        assertButtonsSelection(widgetId, eventWidgetId, COUNTRIES, ["Egypt"], "Egypt");
    });

    it("ww12: Connected Buttons", () => {

        let queryCount = 10;

        const widgetId_top = "ww12";
        const widgetId_middle = "ww14";
        const widgetId_bottom = "ww18";

        const eventWidgetId = "ww13";

        assertButtonsSelection(widgetId_top, eventWidgetId, CONTINENTS, [], "--");

        cy.getWidget(widgetId_middle, "data-cy-waiting");
        cy.getWidget(widgetId_bottom, "data-cy-waiting");
        cy.waitForQueryCount(++queryCount);

        // click in top
        cy.selectButton(widgetId_top, "Africa");
        cy.waitForQueryCount(++queryCount);
        assertButtonsSelection(widgetId_top, eventWidgetId, CONTINENTS, ["Africa"], "Africa--");
        assertButtonsSelection(widgetId_middle, eventWidgetId, ["Egypt", "South Africa"], [], "Africa--");
        cy.getWidget(widgetId_bottom, "data-cy-waiting");

        // click in middle
        cy.selectButton(widgetId_middle, "Egypt");
        cy.waitForQueryCount(++queryCount);
        assertButtonsSelection(widgetId_top, eventWidgetId, CONTINENTS, ["Africa"], "Africa-Egypt-Alexandria");
        assertButtonsSelection(widgetId_middle, eventWidgetId, [], ["Egypt"], "Africa-Egypt-Alexandria");
        assertButtonsSelection(widgetId_bottom, eventWidgetId, [], ["Alexandria"], "Africa-Egypt-Alexandria");

        cy.selectButton(widgetId_middle, "South Africa");
        cy.waitForQueryCount(++queryCount);
        assertButtonsSelection(widgetId_top, eventWidgetId, CONTINENTS, ["Africa"], "Africa-South Africa-Durban");
        assertButtonsSelection(widgetId_middle, eventWidgetId, [], ["South Africa"], "Africa-South Africa-Durban");
        assertButtonsSelection(widgetId_bottom, eventWidgetId, [], ["Durban"], "Africa-South Africa-Durban");

    });

    it("ww15: Connected Buttons Egypt", () => {

        const widgetId_top = "ww15";
        const widgetId_bottom = "ww16";

        const eventWidgetId = "ww17";

        assertButtonsSelection(widgetId_top, eventWidgetId, COUNTRIES, [], null);
        assertButtonsSelection(widgetId_bottom, eventWidgetId, COUNTRIES, [], null);

        cy.selectButton(widgetId_top, COUNTRIES[3]);
        assertButtonsSelection(widgetId_top, eventWidgetId, COUNTRIES, [COUNTRIES[3]], COUNTRIES[3]);
        assertButtonsSelection(widgetId_bottom, eventWidgetId, COUNTRIES, [COUNTRIES[3]], COUNTRIES[3]);

        cy.selectButton(widgetId_bottom, COUNTRIES[5]);
        assertButtonsSelection(widgetId_top, eventWidgetId, COUNTRIES, [COUNTRIES[5]], COUNTRIES[5]);
        assertButtonsSelection(widgetId_bottom, eventWidgetId, COUNTRIES, [COUNTRIES[5]], COUNTRIES[5]);

        {
            cy.selectButton(widgetId_top, COUNTRIES[5]);

            const selections = ["China", "Egypt", "India"];

            cy.keyCtrl(() => {
                selections.forEach((selection) => {
                    cy.selectButton(widgetId_top, selection);
                });
            });

            assertButtonsSelection(widgetId_top, eventWidgetId, COUNTRIES, selections, selections.join(", "));
            assertButtonsSelection(widgetId_bottom, eventWidgetId, COUNTRIES, selections, selections.join(", "));
        }

        cy.selectButton(widgetId_top, COUNTRIES[0]);
        assertButtonsSelection(widgetId_top, eventWidgetId, COUNTRIES, [COUNTRIES[0]], COUNTRIES[0]);
        assertButtonsSelection(widgetId_bottom, eventWidgetId, COUNTRIES, [COUNTRIES[0]], COUNTRIES[0]);

        // clear selection fom TOP
        cy.selectButton(widgetId_top, COUNTRIES[0]);
        assertButtonsSelection(widgetId_top, eventWidgetId, COUNTRIES, [], null);
        assertButtonsSelection(widgetId_bottom, eventWidgetId, COUNTRIES, [], null);

        cy.selectButton(widgetId_top, COUNTRIES[0]);
        assertButtonsSelection(widgetId_top, eventWidgetId, COUNTRIES, [COUNTRIES[0]], COUNTRIES[0]);
        assertButtonsSelection(widgetId_bottom, eventWidgetId, COUNTRIES, [COUNTRIES[0]], COUNTRIES[0]);

        // clear selection fom BOTTOM
        cy.selectButton(widgetId_bottom, COUNTRIES[0]);
        assertButtonsSelection(widgetId_top, eventWidgetId, COUNTRIES, [], null);
        assertButtonsSelection(widgetId_bottom, eventWidgetId, COUNTRIES, [], null);

    })


    it("ww19: Selection from embedded", () => {

        const widgetId = "ww19";
        const eventWidgetId = "ww20";

        assertButtonsSelection(widgetId, eventWidgetId, [],
            ["Last week of May"],
            "Last week of May",
            "[Time].[Time].[day].[24 May 2021]:[Time].[Time].[day].[31 May 2021]"
        );

    });

    it("ww21: Selection from embedded Simple", () => {

        const widgetId = "ww21";
        const eventWidgetId = "ww22";

        assertButtonsSelection(widgetId, eventWidgetId, [],
            ["Last week of May"],
            "Last week of May",
            "Last week of May"
        );

    });

    it("ww23: Selection from embedded with caption", () => {

        const widgetId = "ww23";
        const eventWidgetId = "ww24";

        assertButtonsSelection(widgetId, eventWidgetId, [],
            ["Last week of May"],
            "Last week of May",
            "[Time].[Time].[day].[24 May 2021]:[Time].[Time].[day].[31 May 2021]"
        );

    });

    it("ww25: Selection and sorting", () => {

        const widgetId = "ww25";
        const eventWidgetId = "ww26";

        assertButtonsSelection(widgetId, eventWidgetId, [],
            ["China"],
            "China",
            "[Geography].[Geography].[Country].&[CN]"
        );

        cy.assertButtons(widgetId,
            [...COUNTRIES].sort((a, b) => a.localeCompare(b))
        )

    });


});
