describe("Filters/Dropdown search behavior", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Dropdown search behavior", true, false);
        cy.waitForQueryCount(4);
    });

    it("SINGLE SELECT", () => {

        ["ww2", "ww3"].forEach(widgetId => {

            assertBasicSearchBehavior(widgetId);

            // Selecting an option resets the search
            cy.selectDropdownFromInput(widgetId, "Z.B. Fang");

            // Opening again after selection shows all options
            cy.assertDropdownOptions(widgetId, [
                "Fairymoss Azolla caroliniana Inc.",
                "Z.B. Fang",
                "Durian Ltd.",
                "Angel trumpet (Brugmansia suaveolens) Corp."
            ]);
            cy.assertDropdownSingleSelection(widgetId, "Z.B. Fang");

        });

    });

    it("MULTI SELECT", () => {

        ["ww1", "ww0"].forEach(widgetId => {

            assertBasicSearchBehavior(widgetId);

            // Selecting an option does NOT reset the search
            cy.selectDropdownFromInput(widgetId, "Fa");
            cy.closeDropdown(widgetId);

            // Opening again after selection shows the searched options
            cy.assertDropdownOptions(widgetId, [
                "Fairymoss Azolla caroliniana Inc.",
                "Z.B. Fang"
            ]);
            cy.assertDropdownSingleSelection(widgetId, "Fa");

        });

    });

});

function assertBasicSearchBehavior(widgetId:string) {
    // Searching shows 2 options
    cy.assertDropdownOptions(widgetId, [
        "Fairymoss Azolla caroliniana Inc.",
        "Z.B. Fang"
    ], "Fa");

    // Closing and opening again shows the same result
    cy.assertDropdownOptions(widgetId, [
        "Fairymoss Azolla caroliniana Inc.",
        "Z.B. Fang"
    ]);
    cy.assertDropdownSingleSelection(widgetId, "Fa");

    // Now clicking away resets the dropdown and resets the search
    cy.clickOutside();
    cy.assertDropdownOptions(widgetId, [
        "Fairymoss Azolla caroliniana Inc.",
        "Z.B. Fang",
        "Durian Ltd.",
        "Angel trumpet (Brugmansia suaveolens) Corp."
    ]);
    cy.assertDropdownSingleSelection(widgetId, "");
}