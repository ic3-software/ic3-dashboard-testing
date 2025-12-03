export {};

describe("Filters/FilteringTheFilterPanel", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/FilteringTheFilterPanel");
        cy.waitForQueryCount(2);
    });

    it("Simple filter", () => {

        const wPanel = "ww0";
        const wButtonArticle = "ww1";

        cy.panelFilterAdd(wPanel, "Article", 0);
        cy.selectButton(wButtonArticle, "Gold");
        cy.waitForQueryCount(2);

        cy.assertFilterPanelSimpleItemsActive(wPanel, 0 ,["Gold"], ["Personal", "Server", "Silver", "Platinum"]);

    });

    it("Level filter", () => {

        const wPanel = "ww0";
        const wButtonContinent = "ww2";

        cy.panelFilterAdd(wPanel, "Country", 0);
        cy.selectButton(wButtonContinent, "Europe");

        cy.assertFilterPanelSelectionItems(wPanel, 0, ["Belgium", "France", "Germany", "Italy", "Netherlands", "Poland",
            "Russia", "Spain", "Switzerland", "United Kingdom"]);

        cy.clickOutside();
        cy.selectButton(wButtonContinent, "Africa");

        cy.assertFilterPanelSelectionItems(wPanel, 0, ["Egypt", "South Africa"]);

    });

    it("Single filter", () => {

        const wPanel = "ww3";
        const wButtonArticle = "ww1";
            const wButtonContinent = "ww2";

        cy.selectButton(wButtonArticle, "Silver");
        cy.selectButton(wButtonContinent, "Oceania");

        cy.assertSinglePanelFilterSelectionItems(wPanel, ["Black raspberry Ltd.", "Wild carrot Corp.", "Boxwood Ltd."]);

    });

});
