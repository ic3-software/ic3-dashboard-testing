import {assertButtonsSelection} from "../Filters/FilterUtils";

// const europeanCountries = [
//     "Belgium",
//     "France",
//     "Germany",
//     "Italy",
//     "Netherlands",
//     "Poland",
//     "Russia",
// ];
//
// const northAmericaCountries = ["Canada", "Mexico", "United States"];


describe("Others/FiltersOnQueryChange", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/FiltersOnQueryChange", true, false);
    });

    const expected = 1;

    it("Start Test", () => {
        cy.waitForQueryCount(expected);
    });

    it("Test filters initial selection on new Query", () => {

        cy.selectButton("ww0", "Europe");
        cy.waitForQueryCount(expected + 4);

        assertButtonsSelection("ww2", "ww3", [], [], null);
        assertButtonsSelection("ww4", "ww5", [], ["Belgium"], "Belgium");
        assertButtonsSelection("ww8", "ww9", [], ["Russia"], "Russia");
        assertButtonsSelection("ww6", "ww7", [], ["Belgium"], "Belgium");

        cy.selectButton("ww2", "Germany");
        cy.selectButton("ww4", "Germany");
        cy.selectButton("ww8", "Germany");
        cy.selectButton("ww6", "Germany");

        cy.waitForQueryCount(expected + 4);

        assertButtonsSelection("ww2", "ww3", [], ["Germany"], "Germany");
        assertButtonsSelection("ww4", "ww5", [], ["Germany"], "Germany");
        assertButtonsSelection("ww6", "ww7", [], ["Germany"], "Germany");
        assertButtonsSelection("ww8", "ww9", [], ["Germany"], "Germany");

        cy.selectButton("ww0", "North America");
        cy.waitForQueryCount(expected + 4 + 4);

        assertButtonsSelection("ww2", "ww3", [], [], null);
        assertButtonsSelection("ww4", "ww5", [], [], null);
        assertButtonsSelection("ww8", "ww9", [], ["United States"], "United States");
        assertButtonsSelection("ww6", "ww7", [], ["Canada"], "Canada");

    });

})


