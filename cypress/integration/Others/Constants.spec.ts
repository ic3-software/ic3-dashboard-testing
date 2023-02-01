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


describe("Others/Constants", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/Constants", true, false);
    });

    it("Test we get what we expect", () => {

        cy.waitForQueryCount(1);

        cy.assertTableRowCount("ww0", 1);
        cy.assertEventValue("ww1", "Hola");
        cy.getWidget("ww2", "data-cy-waiting");

    });

})


