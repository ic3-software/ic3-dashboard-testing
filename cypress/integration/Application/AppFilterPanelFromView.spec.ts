export {};

function assertTableIsNotFiltered(wTable: string) {

    cy.assertTableValue(wTable, 0, 1, "€29,500");
    cy.assertTableValue(wTable, 1, 1, "€12,000");
    cy.assertTableValue(wTable, 2, 1, "€67,750");
    cy.assertTableValue(wTable, 3, 1, "€31,000");
    cy.assertTableValue(wTable, 4, 1, "€6,000");
    cy.assertTableValue(wTable, 5, 1, "€2,000");

}

function assertTableIsFilteredAsia(wTable: string) {

    cy.assertTableValue(wTable, 0, 0, "Asia");
    cy.assertTableValue(wTable, 0, 1, "€12,000");

}

describe("Application/AppFilterPanelFromView", () => {

    beforeEach(() => {
        cy.login();
        cy.clearLocalStorage();
        cy.openAppTestReport("FilterPanel & view");
    });

    it("test save & load view", () => {

        const wPanel = "!appFilterPanel";
        cy.waitForQueryCount(1);

        assertTableIsNotFiltered("ww0");

        // Set geography to asia
        cy.panelFilterAdd(wPanel, "Geography");
        cy.panelFilterSetSelection(wPanel, 0, ["Asia"]);
        assertTableIsFilteredAsia("ww0");

        // Save view
        cy.panelFilterSaveView(wPanel, "foo");

        // Refresh page: assert local state restored.
        cy.reload();
        cy.waitForQueryCount(1);
        assertTableIsNotFiltered("ww0");

        // Now restore view
        cy.panelFilterLoadView(wPanel, "foo");
        assertTableIsFilteredAsia("ww0");

    });

});
