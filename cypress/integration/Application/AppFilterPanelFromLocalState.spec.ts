export {};

function assertTableIsNotFiltered(wTable: string) {

    cy.assertTableValue(wTable, 0, 1, "€29,500");
    cy.assertTableValue(wTable, 1, 1, "€12,000");
    cy.assertTableValue(wTable, 2, 1, "€67,750");
    cy.assertTableValue(wTable, 3, 1, "€31,000");
    cy.assertTableValue(wTable, 4, 1, "€6,000");
    cy.assertTableValue(wTable, 5, 1, "€2,000");

}

function assertTableIsFilteredMonth(wTable: string) {

    cy.assertTableValue(wTable, 0, 1, "");
    cy.assertTableValue(wTable, 1, 1, "€250");
    cy.assertTableValue(wTable, 2, 1, "€2,250");
    cy.assertTableValue(wTable, 3, 1, "");
    cy.assertTableValue(wTable, 4, 1, "");
    cy.assertTableValue(wTable, 5, 1, "");

}

function assertTableIsFilteredAsia(wTable: string) {

    cy.assertTableValue(wTable, 0, 0, "Asia");
    cy.assertTableValue(wTable, 0, 1, "€12,000");

}

describe("Application/AppFilterPanelFromLocalState", () => {

    beforeEach(() => {
        cy.login();
        cy.clearLocalStorage();
        cy.openAppTestReport("FilterPanel & local state");
    });

    it("test loads from local state", () => {

        const wPanel = "!appFilterPanel";
        cy.waitForQueryCount(1);

        assertTableIsFilteredMonth("ww0");

        // Reset filter
        cy.panelFilterRemove(wPanel, 0);
        cy.waitForQueryCount(2);
        assertTableIsNotFiltered("ww0");

        // Refresh page: assert local state restored.
        cy.reload();
        cy.waitForQueryCount(1);
        assertTableIsNotFiltered("ww0");

        // Set geography to asia
        cy.panelFilterAdd(wPanel, "Geography");
        cy.panelFilterSetSelection(wPanel, 0, ["Asia"]);
        assertTableIsFilteredAsia("ww0");

        // Refresh page: assert local state restored.
        cy.reload();
        cy.waitForQueryCount(1);
        assertTableIsFilteredAsia("ww0");


    });

});
