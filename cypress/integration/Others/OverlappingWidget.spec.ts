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


describe("Others/Overlapping Widgets", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/Overlapping Widgets", true, false);
    });

    it("not overlapping", () => {

        cy.waitForQueryCount(2);

        cy.getWidget("ww0");
        cy.getWidget("ww1");

        // widgets with the same rectangle should not be embedded
        cy.get('.ic3WidgetBox-embedded').should('not.exist');
    });

})
