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

function assertSingleSelection(widgetId: string, eventWidgetId: string, treeMode: any, selection: string | null, event: string | null, mdx?: string) {

    cy.assertTreeWithAutocompleteSingleSelection(widgetId, treeMode, selection);

    cy.assertEventValue(eventWidgetId, event);

    if (mdx !== undefined) {

        cy.assertEventMdx(eventWidgetId, mdx);

    }

}

function assertMultiSelection(widgetId: string, eventWidgetId: string, treeMode: any, selection: string[], event: string | null, mdx?: string) {

    cy.assertTreeWithAutocompleteMultiSelection(widgetId, treeMode, selection);

    cy.assertEventValue(eventWidgetId, event);

    if (mdx !== undefined) {

        cy.assertEventMdx(eventWidgetId, mdx);

    }

}


describe("Filters/Tree with Autocomplete Behavior", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Tree with Autocomplete Behavior", true, false);
        cy.waitForQueryCount(10);
    });

    it("ww0: Checkbox - Single", () => {

        const widgetId = "ww0";
        const eventWidgetId = "ww1";

        const treeMode = "control-icons";

        assertSingleSelection(widgetId, eventWidgetId, treeMode, null, null);

        cy.selectTreeWithAutocompleteFromPopup(widgetId, treeMode, ["Africa"]);
        assertSingleSelection(widgetId, eventWidgetId, treeMode, "Africa", "Africa");

        cy.selectTreeWithAutocompleteFromPopup(widgetId, treeMode, ["Egypt"]);
        assertSingleSelection(widgetId, eventWidgetId, treeMode, "Egypt", "Egypt");

        cy.clickUserMenuClearSelection(widgetId);
        assertSingleSelection(widgetId, eventWidgetId, treeMode, null, null);

    })

    it("ww2: Checkbox Multiple", () => {

        const widgetId = "ww2";
        const eventWidgetId = "ww3";

        const treeMode = "control-icons";

        assertMultiSelection(widgetId, eventWidgetId, treeMode, [], null);

        const selections = ["Alexandria", "Cairo"];

        cy.selectTreeWithAutocompleteFromPopup(widgetId, treeMode, selections, true);
        assertMultiSelection(widgetId, eventWidgetId, treeMode, selections, selections.join(", "));

        cy.clickUserMenuClearSelection(widgetId);
        assertMultiSelection(widgetId, eventWidgetId, treeMode, [], null);

    })

    it("ww4: Checkbox - Initial Selection", () => {

        const widgetId = "ww4";
        const eventWidgetId = "ww5";

        const treeMode = "control-icons";

        assertSingleSelection(widgetId, eventWidgetId, treeMode, "South Africa", "South Africa");

    })

    it("ww19: Multi: Empty Behavior - Select all", () => {

        const widgetId = "ww20";
        const eventWidgetId = "ww19";

        const treeMode = "control-icons";

        // Since it's compacted selection, "Australia", "Canberra", "Sydney" are not shown as a selected chip.
        const selections = ["Oceania"];

        assertMultiSelection(widgetId, eventWidgetId, treeMode, selections, "Oceania");

        cy.selectTreeWithAutocompleteFromPopup(widgetId, treeMode, ["Oceania", "Australia", "Canberra", "Sydney"], true);
        // Selection now is empty -> should select all == Oceania.
        assertMultiSelection(widgetId, eventWidgetId, treeMode, selections, "Oceania");

    });

    it("ww19: Multi: Empty Behavior - Select all [clear selection]", () => {

        const widgetId = "ww20";
        const eventWidgetId = "ww19";

        const treeMode = "control-icons";

        assertMultiSelection(widgetId, eventWidgetId, treeMode, ["Oceania"], "Oceania");

        cy.selectTreeWithAutocompleteFromPopup(widgetId, treeMode, ["Oceania"], true);
        assertMultiSelection(widgetId, eventWidgetId, treeMode, ["Australia"], "Australia");

        // Clear selection from user menu: select all items again
        cy.clickUserMenuClearSelection(widgetId);
        assertMultiSelection(widgetId, eventWidgetId, treeMode, ["Oceania"], "Oceania");

    });

    it("ww8: Empty Behavior - Default Member", () => {

        const widgetId = "ww8";
        const eventWidgetId = "ww9";

        const treeMode = "control-icons";

        assertSingleSelection(widgetId, eventWidgetId, treeMode, null, "All Regions");

        cy.selectTreeWithAutocompleteFromPopup(widgetId, treeMode, ["Africa"]);
        assertSingleSelection(widgetId, eventWidgetId, treeMode, "Africa", "Africa");

        cy.selectTreeWithAutocompleteFromPopup(widgetId, treeMode, ["Africa"]);
        assertSingleSelection(widgetId, eventWidgetId, treeMode, null, "All Regions");

        cy.selectTreeWithAutocompleteFromPopup(widgetId, treeMode, ["Africa"]);
        assertSingleSelection(widgetId, eventWidgetId, treeMode, "Africa", "Africa");

        // Clear selection from user menu: select All Regions again
        cy.clickUserMenuClearSelection(widgetId);
        assertSingleSelection(widgetId, eventWidgetId, treeMode, null, "All Regions");

    });

    it("ww10: Empty Behavior - Do not allow empty", () => {

        const widgetId = "ww10";
        const eventWidgetId = "ww11";

        const treeMode = "control-icons";

        assertSingleSelection(widgetId, eventWidgetId, treeMode, "Africa", "Africa");

        cy.selectTreeWithAutocompleteFromPopup(widgetId, treeMode, ["Egypt"]);
        assertSingleSelection(widgetId, eventWidgetId, treeMode, "Egypt", "Egypt");

        cy.selectTreeWithAutocompleteFromPopup(widgetId, treeMode, ["Egypt"]);
        assertSingleSelection(widgetId, eventWidgetId, treeMode, "Africa", "Africa");

        cy.selectTreeWithAutocompleteFromPopup(widgetId, treeMode, ["Egypt"]);
        assertSingleSelection(widgetId, eventWidgetId, treeMode, "Egypt", "Egypt");

        // Clear selection from user menu: select Africa again
        cy.clickUserMenuClearSelection(widgetId);
        assertSingleSelection(widgetId, eventWidgetId, treeMode, "Africa", "Africa");

    });

    it("ww12: Connected Checkboxes", () => {

        let queryCount = 10;

        const widgetId_top = "ww12";
        const widgetId_middle = "ww14";
        const widgetId_bottom = "ww18";
        const eventWidgetId = "ww13";

        const treeMode = "control-icons";

        assertMultiSelection(widgetId_top, eventWidgetId, treeMode, [], "--");

        cy.getWidget(widgetId_middle, "data-cy-waiting");
        cy.getWidget(widgetId_bottom, "data-cy-waiting");
        cy.waitForQueryCount(queryCount);

        // click in top
        cy.log("select Africa")
        cy.selectTreeWithAutocompleteFromPopup(widgetId_top, treeMode, ["Africa"], true);
        cy.waitForQueryCount(++queryCount);

        assertMultiSelection(widgetId_top, eventWidgetId, treeMode, ["Africa"], "Africa--");
        cy.getWidget(widgetId_bottom, "data-cy-waiting");

        // click in middle
        cy.log("select South Africa")
        cy.selectTreeWithAutocompleteFromPopup(widgetId_middle, treeMode, ["South Africa"], true);
        cy.waitForQueryCount(++queryCount);

        // dunno if that makes sense... Africa bottom is being selected...

        assertMultiSelection(widgetId_top, eventWidgetId, treeMode, ["Africa"], "Africa-South Africa-Africa");
        assertMultiSelection(widgetId_middle, eventWidgetId, treeMode, ["South Africa"], "Africa-South Africa-Africa");
        assertMultiSelection(widgetId_bottom, eventWidgetId, treeMode, ["Africa"], "Africa-South Africa-Africa");

    });

    it("ww15: Connected Checkboxes", () => {

        let queryCount = 10;

        const widgetId_top = "ww15";
        const widgetId_bottom = "ww16";
        const eventWidgetId = "ww17";

        const treeMode = "control-icons";

        assertMultiSelection(widgetId_top, eventWidgetId, treeMode, ["Africa"], "Africa");
        assertMultiSelection(widgetId_bottom, eventWidgetId, treeMode, ["Africa"], "Africa");

        cy.log("select Asia top")
        cy.selectTreeWithAutocompleteFromPopup(widgetId_top, treeMode, ["Asia"], true);
        cy.waitForQueryCount(queryCount);
        cy.log("assert Africa,Asia top")
        assertMultiSelection(widgetId_top, eventWidgetId, treeMode, ["Africa", "Asia"], "Africa, Asia");
        cy.log("assert Africa, Asia bottom")
        assertMultiSelection(widgetId_bottom, eventWidgetId, treeMode, ["Africa", "Asia"], "Africa, Asia");

        cy.log("select Africa bottom")
        cy.selectTreeWithAutocompleteFromPopup(widgetId_bottom, treeMode, ["Africa"], true);
        cy.waitForQueryCount(queryCount);
        assertMultiSelection(widgetId_top, eventWidgetId, treeMode, ["Asia"], "Asia");
        assertMultiSelection(widgetId_bottom, eventWidgetId, treeMode, ["Asia"], "Asia");

    });

});
