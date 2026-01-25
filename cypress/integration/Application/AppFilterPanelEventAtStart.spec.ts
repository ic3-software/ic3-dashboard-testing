export {};

describe("Application/FilterPanel & eventAtStart", () => {

    beforeEach(() => {
        cy.login();
        cy.openAppTestReport("FilterPanel & eventAtStart");
    });

    it("ww0: CI - Fire Compacted", () => {

        const expected = 1;
        cy.waitForQueryCount(1);
        cy.waitForQueryCount(3);

        const wPanel = "!appFilterPanel";
        cy.panelFilterRemove(wPanel, 0);
        cy.waitForQueryCount(expected + 1);

        cy.panelFilterAdd(wPanel, "Continent");
        cy.panelFilterSelectOperatorFromInput(wPanel, 0, "Contains");
        cy.panelFilterSetTextFieldValue(wPanel, 0, "Am");
        cy.waitForQueryCount(expected + 2);

    });

});
