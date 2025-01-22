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


function assertSingleSelection(widgetId: string, eventWidgetId: string, selection: string | null, event: string | null, mdx?: string) {

    cy.assertDropdownSingleSelection(widgetId, selection);

    cy.assertEventValue(eventWidgetId, event);

    if (mdx !== undefined) {

        cy.assertEventMdx(eventWidgetId, mdx);

    }

}

function assertMultiSelection(widgetId: string, eventWidgetId: string, selection: string[], event: string | null, mdx?: string) {

    cy.assertDropdownMultiSelection(widgetId, selection);

    cy.assertEventValue(eventWidgetId, event);

    if (mdx !== undefined) {

        cy.assertEventMdx(eventWidgetId, mdx);

    }

}


describe("Filters/Autocomplete Behavior", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Autocomplete Behavior", true, false);
        cy.waitForQueryCount(11 /* 3 embedded data source */);
    });

    it("ww0: Single", () => {

        const widgetId = "ww0";
        const eventWidgetId = "ww1";

        assertSingleSelection(widgetId, eventWidgetId, null, null);

        cy.selectDropdownFromInput(widgetId, "Egypt");
        assertSingleSelection(widgetId, eventWidgetId, "Egypt", "Egypt");

        cy.selectDropdownFromInput(widgetId, "China");
        assertSingleSelection(widgetId, eventWidgetId, "China", "China");

        // Clear Selection from Dropdown
        cy.clearDropdown(widgetId);
        cy.assertEventValue(eventWidgetId, null);

        cy.selectDropdownFromInput(widgetId, "Egypt");
        assertSingleSelection(widgetId, eventWidgetId, "Egypt", "Egypt");

        // Clear Selection from User Menu
        cy.clickUserMenuClearSelection(widgetId);
        cy.assertEventValue(eventWidgetId, null);

        cy.selectDropdownFromInput(widgetId, "Iran");
    });

    it("ww1: Multiple button behavior", () => {

        const widgetId = "ww2";
        const eventWidgetId = "ww3";

        assertMultiSelection(widgetId, eventWidgetId, [], null);

        const selections = ["Indonesia", "China", "India"];

        selections.forEach((selection) => {
            cy.selectDropdownFromInput(widgetId, selection);
        });

        assertMultiSelection(widgetId, eventWidgetId, selections, selections.join(", "));

        // Clear Selection from Dropdown
        cy.clearDropdown(widgetId);
        cy.assertEventValue(eventWidgetId, null);

        cy.selectDropdownFromInput(widgetId, "Egypt");
        assertMultiSelection(widgetId, eventWidgetId, ["Egypt"], "Egypt");

        // Clear Selection from User Menu
        cy.clickUserMenuClearSelection(widgetId);
        cy.assertEventValue(eventWidgetId, null);

        cy.selectDropdownFromInput(widgetId, "Japan");
    });

    it("ww4: Initial selection", () => {

        const widgetId = "ww4";
        const eventWidgetId = "ww5";

        assertSingleSelection(widgetId, eventWidgetId, "South Africa", "South Africa");

        // Clear Selection from Dropdown
        cy.clearDropdown(widgetId);
        cy.assertEventValue(eventWidgetId, null);

        cy.selectDropdownFromInput(widgetId, "Egypt");
        assertSingleSelection(widgetId, eventWidgetId, "Egypt", "Egypt");
    });

    it("ww27: Multi: Empty Behavior - Select All", () => {

        const widgetId = "ww27";
        const eventWidgetId = "ww28";

        assertMultiSelection(widgetId, eventWidgetId, COUNTRIES, COUNTRIES.join(", "));

        cy.selectDropdownFromInput(widgetId, "Egypt");
        assertMultiSelection(widgetId, eventWidgetId, COUNTRIES.slice(1), COUNTRIES.slice(1).join(", "));

        cy.clearDropdown(widgetId);
        assertMultiSelection(widgetId, eventWidgetId, COUNTRIES, COUNTRIES.join(", "));
    });

    it("ww27: Multi: Empty Behavior - Select All [clear selection]", () => {

        const widgetId = "ww27";
        const eventWidgetId = "ww28";

        assertMultiSelection(widgetId, eventWidgetId, COUNTRIES, COUNTRIES.join(", "));

        cy.selectDropdownFromInput(widgetId, "Egypt");
        assertMultiSelection(widgetId, eventWidgetId, COUNTRIES.slice(1), COUNTRIES.slice(1).join(", "));

        cy.clickUserMenuClearSelection(widgetId);
        assertMultiSelection(widgetId, eventWidgetId, COUNTRIES, COUNTRIES.join(", "));

    });

    it("ww8: Empty Behavior - Default Member", () => {

        const widgetId = "ww8";
        const eventWidgetId = "ww9";

        assertSingleSelection(widgetId, eventWidgetId, null, "All Regions");

        cy.selectDropdownFromInput(widgetId, "Egypt");
        assertSingleSelection(widgetId, eventWidgetId, "Egypt", "Egypt");

        cy.clearDropdown(widgetId);
        assertSingleSelection(widgetId, eventWidgetId, null, "All Regions");

    });

    it("ww10: Empty Behavior - Do not allow empty", () => {

        const widgetId = "ww10";
        const eventWidgetId = "ww11";

        assertSingleSelection(widgetId, eventWidgetId, "Egypt", "Egypt");

        cy.selectDropdownFromPopup(widgetId, "China");
        assertSingleSelection(widgetId, eventWidgetId, "China", "China");

        cy.clearDropdown(widgetId);
        assertSingleSelection(widgetId, eventWidgetId, "Egypt", "Egypt");

    });

    it("ww10: Empty Behavior - Do not allow empty [clear selection]", () => {

        const widgetId = "ww10";
        const eventWidgetId = "ww11";

        assertSingleSelection(widgetId, eventWidgetId, "Egypt", "Egypt");

        cy.selectDropdownFromPopup(widgetId, "China");
        assertSingleSelection(widgetId, eventWidgetId, "China", "China");

        cy.clickUserMenuClearSelection(widgetId);
        assertSingleSelection(widgetId, eventWidgetId, "Egypt", "Egypt");

    });

    it("ww12: Connected", () => {

        let queryCount = 10;

        const widgetId_top = "ww12";
        const widgetId_middle = "ww14";
        const widgetId_bottom = "ww18";
        const eventWidgetId = "ww13";

        assertMultiSelection(widgetId_top, eventWidgetId, [], "--");

        cy.getWidget(widgetId_middle, "data-cy-waiting");
        cy.getWidget(widgetId_bottom, "data-cy-waiting");
        cy.waitForQueryCount(++queryCount);

        // click in top
        cy.selectDropdownFromPopup(widgetId_top, "Africa");
        cy.waitForQueryCount(++queryCount);

        cy.assertDropdownOptions(widgetId_middle, ["Egypt", "South Africa"]);

        assertMultiSelection(widgetId_top, eventWidgetId, ["Africa"], "Africa--");
        cy.getWidget(widgetId_bottom, "data-cy-waiting");

        // click in middle
        cy.selectDropdownFromPopup(widgetId_middle, "South Africa");
        cy.waitForQueryCount(++queryCount);

        cy.assertDropdownOptions(widgetId_bottom, ["Durban", "Johannesburg", "Pretoria"]);

        assertMultiSelection(widgetId_top, eventWidgetId, ["Africa"], "Africa-South Africa-Durban");
        assertMultiSelection(widgetId_middle, eventWidgetId, ["South Africa"], "Africa-South Africa-Durban");
        assertMultiSelection(widgetId_bottom, eventWidgetId, ["Durban"], "Africa-South Africa-Durban");

        // click in middle adding Egypt
        cy.selectDropdownFromPopup(widgetId_middle, "Egypt");
        cy.waitForQueryCount(++queryCount);

        cy.assertDropdownOptions(widgetId_bottom, ["Alexandria", "Cairo", "Durban", "Johannesburg", "Pretoria"]);

        assertMultiSelection(widgetId_top, eventWidgetId, ["Africa"], "Africa-South Africa, Egypt-Durban");
        assertMultiSelection(widgetId_middle, eventWidgetId, ["South Africa", "Egypt"], "Africa-South Africa, Egypt-Durban");
        assertMultiSelection(widgetId_bottom, eventWidgetId, ["Durban"], "Africa-South Africa, Egypt-Durban");

    });

    it("ww15: Connected", () => {

        const widgetId_top = "ww15";
        const widgetId_bottom = "ww16";
        const eventWidgetId = "ww17";

        assertMultiSelection(widgetId_top, eventWidgetId, [], null);
        assertMultiSelection(widgetId_bottom, eventWidgetId, [], null);

        cy.selectDropdownFromPopup(widgetId_top, "China");
        assertMultiSelection(widgetId_top, eventWidgetId, ["China"], "China");
        assertMultiSelection(widgetId_bottom, eventWidgetId, ["China"], "China");

        cy.selectDropdownFromPopup(widgetId_bottom, "India");
        assertMultiSelection(widgetId_top, eventWidgetId, ["China", "India"], "China, India");
        assertMultiSelection(widgetId_bottom, eventWidgetId, ["China", "India"], "China, India");

        cy.clearDropdown(widgetId_bottom);
        assertMultiSelection(widgetId_top, eventWidgetId, [], null);
        assertMultiSelection(widgetId_bottom, eventWidgetId, [], null);

    });

    it("ww19: Selection from embedded", () => {

        const widgetId = "ww19";
        const eventWidgetId = "ww20";

        assertSingleSelection(widgetId, eventWidgetId,
            "Last week of May",
            "Last week of May",
            "[Time].[Time].[day].[24 May 2021]:[Time].[Time].[day].[31 May 2021]"
        );

    });

    it("ww21: Selection from embedded Simple", () => {

        const widgetId = "ww21";
        const eventWidgetId = "ww22";

        assertSingleSelection(widgetId, eventWidgetId,
            "Last week of May",
            "Last week of May",
            "Last week of May"
        );

    });

    it("ww23: Selection from embedded with caption", () => {

        const widgetId = "ww23";
        const eventWidgetId = "ww24";

        assertSingleSelection(widgetId, eventWidgetId,
            "Last week of May",
            "Last week of May",
            "[Time].[Time].[day].[24 May 2021]:[Time].[Time].[day].[31 May 2021]"
        );

    });

    it("ww25: Selection and sorting", () => {

        const widgetId = "ww25";
        const eventWidgetId = "ww26";

        assertSingleSelection(widgetId, eventWidgetId,
            "China",
            "China",
            "[Geography].[Geography].[Country].&[CN]"
        );

        cy.assertDropdownOptions(widgetId,
            [...COUNTRIES].sort((a, b) => a.localeCompare(b))
        );

    });

});
