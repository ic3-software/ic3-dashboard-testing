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

        available.forEach(c => {
            cy.assertCheckboxNotSelected(widgetId, c);
        });

    } else {

        selection.forEach(c => {
            cy.assertCheckboxSelected(widgetId, c);
        });

        const selectionS = new Set<string>(selection);

        available.forEach(c => {
            if (!selectionS.has(c)) {
                cy.assertCheckboxNotSelected(widgetId, c);
            }
        });

    }

    cy.assertEventValue(eventWidgetId, event);

    if (mdx !== undefined) {

        cy.assertEventMdx(eventWidgetId, mdx);

    }

}

describe("Filters/Checkboxes Behavior", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Checkboxes Behavior", true, false);
        cy.waitForQueryCount(10 /* 3 embedded data source */);
    });

    it("ww0: Checkboxes - Single", () => {

        const widgetId = "ww0";
        const eventWidgetId = "ww1";

        // Starting wo/ selection
        assertSelection(widgetId, eventWidgetId, COUNTRIES, [], null);

        // Selecting Country
        cy.selectCheckbox(widgetId, "Egypt");
        assertSelection(widgetId, eventWidgetId, COUNTRIES, ["Egypt"], "Egypt");

        // Selecting Country
        cy.selectCheckbox(widgetId, "China");
        assertSelection(widgetId, eventWidgetId, COUNTRIES, ["China"], "China");

        // Unselecting country
        cy.selectCheckbox(widgetId, "China");
        assertSelection(widgetId, eventWidgetId, COUNTRIES, [], null);

        // Selecting Country
        cy.selectCheckbox(widgetId, "China");
        assertSelection(widgetId, eventWidgetId, COUNTRIES, ["China"], "China");

        // Clear Selection
        cy.clickUserMenuClearSelection(widgetId);
        assertSelection(widgetId, eventWidgetId, COUNTRIES, [], null);

    });

    it("ww2: Checkboxes - Multiple", () => {

        const widgetId = "ww2";
        const eventWidgetId = "ww3";

        const selections = ["China", "Egypt", "India"];

        // Starting wo/ selection
        assertSelection(widgetId, eventWidgetId, COUNTRIES, [], null);

        // CTRL
        cy.keyCtrl(() => {
            selections.forEach((selection) => {
                cy.selectCheckbox(widgetId, selection);
            });
        });
        assertSelection(widgetId, eventWidgetId, COUNTRIES, selections, selections.join(", "));

        // Clear Selection
        selections.forEach(c => cy.selectCheckbox(widgetId, c));
        assertSelection(widgetId, eventWidgetId, COUNTRIES, [], null);

        // SHIFT
        cy.keyShift(() => {
            ["Egypt", "Japan"].forEach((selection) => {
                cy.selectCheckbox(widgetId, selection);
            });
        });
        assertSelection(widgetId, eventWidgetId, COUNTRIES, COUNTRIES, COUNTRIES.join(", "));
    });

    it("ww4: Checkboxes - Initial Selection South Africa", () => {

        const widgetId = "ww4";
        const eventWidgetId = "ww5";

        assertSelection(widgetId, eventWidgetId, COUNTRIES, ["South Africa"], "South Africa");
    });

    it("ww8: Empty Behavior - Default Member All Regions", () => {

        const widgetId = "ww8";
        const eventWidgetId = "ww9";

        assertSelection(widgetId, eventWidgetId, COUNTRIES, [], "All Regions");

        cy.selectCheckbox(widgetId, "Egypt");
        assertSelection(widgetId, eventWidgetId, COUNTRIES, ["Egypt"], "Egypt");

        // Clear selection
        cy.selectCheckbox(widgetId, "Egypt");
        assertSelection(widgetId, eventWidgetId, COUNTRIES, [], "All Regions");

        cy.selectCheckbox(widgetId, "Egypt");
        assertSelection(widgetId, eventWidgetId, COUNTRIES, ["Egypt"], "Egypt");

        // // Clear selection from user menu
        cy.clickUserMenuClearSelection(widgetId)
        assertSelection(widgetId, eventWidgetId, COUNTRIES, [], "All Regions");
    });

    it("ww10: Empty Behavior - Do not allow empty Egypt", () => {

        const widgetId = "ww10";
        const eventWidgetId = "ww11";

        assertSelection(widgetId, eventWidgetId, COUNTRIES, ["Egypt"], "Egypt");

        // trying to clear the selection
        cy.selectCheckbox(widgetId, "Egypt");
        assertSelection(widgetId, eventWidgetId, COUNTRIES, ["Egypt"], "Egypt");
    });

    it("ww12: Connected Checkboxes", () => {

        let queryCount = 9;

        const widgetId_top = "ww12";
        const widgetId_middle = "ww14";
        const widgetId_bottom = "ww18";

        const eventWidgetId = "ww13";

        assertSelection(widgetId_top, eventWidgetId, CONTINENTS, [], "--");

        cy.getWidget(widgetId_middle, "data-cy-waiting");
        cy.getWidget(widgetId_bottom, "data-cy-waiting");
        cy.waitForQueryCount(++queryCount);

        // click in top
        cy.selectCheckbox(widgetId_top, "Africa");
        cy.waitForQueryCount(++queryCount);
        assertSelection(widgetId_top, eventWidgetId, CONTINENTS, ["Africa"], "Africa--");
        assertSelection(widgetId_middle, eventWidgetId, ["Egypt", "South Africa"], [], "Africa--");
        cy.getWidget(widgetId_bottom, "data-cy-waiting");

        // click in middle now
        cy.selectCheckbox(widgetId_middle, "Egypt");
        cy.waitForQueryCount(++queryCount);
        assertSelection(widgetId_top, eventWidgetId, CONTINENTS, ["Africa"], "Africa-Egypt-Alexandria");
        assertSelection(widgetId_middle, eventWidgetId, [], ["Egypt"], "Africa-Egypt-Alexandria");
        assertSelection(widgetId_bottom, eventWidgetId, [], ["Alexandria"], "Africa-Egypt-Alexandria");

        // adding South Africa
        cy.selectCheckbox(widgetId_middle, "South Africa");
        cy.waitForQueryCount(++queryCount);
        assertSelection(widgetId_top, eventWidgetId, CONTINENTS, ["Africa"], "Africa-Egypt, South Africa-Alexandria");
        assertSelection(widgetId_middle, eventWidgetId, [], ["South Africa"], "Africa-Egypt, South Africa-Alexandria");
        assertSelection(widgetId_bottom, eventWidgetId, [], ["Alexandria"], "Africa-Egypt, South Africa-Alexandria");

        // removing Egypt
        cy.selectCheckbox(widgetId_middle, "Egypt");
        cy.waitForQueryCount(++queryCount);
        assertSelection(widgetId_top, eventWidgetId, CONTINENTS, ["Africa"], "Africa-South Africa-Durban");
        assertSelection(widgetId_middle, eventWidgetId, [], ["South Africa"], "Africa-South Africa-Durban");
        assertSelection(widgetId_bottom, eventWidgetId, [], ["Durban"], "Africa-South Africa-Durban");

    });

    it("ww15: Connected Checkboxes Egypt", () => {

        const widgetId_top = "ww15";
        const widgetId_bottom = "ww16";

        const eventWidgetId = "ww17";

        assertSelection(widgetId_top, eventWidgetId, COUNTRIES, [], null);
        assertSelection(widgetId_bottom, eventWidgetId, COUNTRIES, [], null);

        cy.log("adding: Egypt")
        cy.selectCheckbox(widgetId_top, "Egypt");
        assertSelection(widgetId_top, eventWidgetId, COUNTRIES, ["Egypt"], "Egypt");
        assertSelection(widgetId_bottom, eventWidgetId, COUNTRIES, ["Egypt"], "Egypt");

        cy.log("adding: India")
        cy.selectCheckbox(widgetId_top, COUNTRIES[3]);
        assertSelection(widgetId_top, eventWidgetId, COUNTRIES, ["Egypt", COUNTRIES[3]], ["Egypt", COUNTRIES[3]].join(", "));
        assertSelection(widgetId_bottom, eventWidgetId, COUNTRIES, ["Egypt", COUNTRIES[3]], ["Egypt", COUNTRIES[3]].join(", "));

        cy.log("adding: Iran")
        cy.selectCheckbox(widgetId_bottom, COUNTRIES[5]);
        assertSelection(widgetId_top, eventWidgetId, COUNTRIES, ["Egypt", COUNTRIES[3], COUNTRIES[5]], ["Egypt", COUNTRIES[3], COUNTRIES[5]].join(", "));
        assertSelection(widgetId_bottom, eventWidgetId, COUNTRIES, ["Egypt", COUNTRIES[3], COUNTRIES[5]], ["Egypt", COUNTRIES[3], COUNTRIES[5]].join(", "));

        cy.log("ctrl: Egypt, India, Iran")
        {
            cy.selectCheckbox(widgetId_top, "Egypt");
            cy.selectCheckbox(widgetId_top, COUNTRIES[3]);
            cy.selectCheckbox(widgetId_top, COUNTRIES[5]);

            assertSelection(widgetId_top, eventWidgetId, COUNTRIES, [], null);
            assertSelection(widgetId_bottom, eventWidgetId, COUNTRIES, [], null);

            const selections = ["China", "Egypt", "India"];

            cy.keyCtrl(() => {
                selections.forEach((selection) => {
                    cy.selectCheckbox(widgetId_top, selection);
                });
            });

            assertSelection(widgetId_top, eventWidgetId, COUNTRIES, selections, selections.join(", "));
            assertSelection(widgetId_bottom, eventWidgetId, COUNTRIES, selections, selections.join(", "));

            // clear selection using the TOP widget
            selections.forEach(c => cy.selectCheckbox(widgetId_top, c));
            assertSelection(widgetId_top, eventWidgetId, COUNTRIES, [], null);
            assertSelection(widgetId_bottom, eventWidgetId, COUNTRIES, [], null);
        }

        cy.selectCheckbox(widgetId_top, "Egypt");
        assertSelection(widgetId_top, eventWidgetId, COUNTRIES, ["Egypt"], "Egypt");
        assertSelection(widgetId_bottom, eventWidgetId, COUNTRIES, ["Egypt"], "Egypt");

        // clear selection using the BOTTOM widget
        cy.selectCheckbox(widgetId_bottom, "Egypt");
        assertSelection(widgetId_top, eventWidgetId, COUNTRIES, [], null);
        assertSelection(widgetId_bottom, eventWidgetId, COUNTRIES, [], null);

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

        cy.assertCheckboxes(widgetId,
            [...COUNTRIES].sort((a, b) => a.localeCompare(b))
        )

    });

});
