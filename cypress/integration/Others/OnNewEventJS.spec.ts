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


describe("Others/OnNewEventJS", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/OnNewEventJS", true, false);
    });

    it("API test", () => {

        cy.waitForQueryCount(2);

        // check sending new events
        cy.selectButton("ww1", "2021");
        cy.assertEventValue("ww2", "Clicked 2021");

        cy.selectButton("ww1", "2022");
        cy.assertEventValue("ww2", "Clicked 2022");

        // changing header title
        cy.selectButton("ww1", "2020");
        cy.assertWidgetHeader("ww0", "And a monkey clicked 2020");

        cy.log("VISIBILITY")
        cy.assertWidgetVisible("ww0", true);

        // changing widget visibility
        cy.log("2018:HIDE")
        cy.selectButton("ww1", "2018");
        cy.assertWidgetVisible("ww0", false);

        // events have been stopped, so no new queries
        cy.waitForQueryCount(2);

        // add visibility + pass original event
        cy.log("2019:SHOW")
        cy.selectButton("ww1", "2019");
        cy.assertWidgetVisible("ww0", true);

        cy.waitForQueryCount(3);

    });

})


