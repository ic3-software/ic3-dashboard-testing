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


describe("Others/onReportLoadedEvent", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Others/onReportLoadedEvent");
        cy.waitForPrintStatus()

    });

    it("test MDX filter", () => {

        cy.assertTableColCount("ww0", 2);

        cy.assertEventWithText("ww1", "myEvent" , "onReportLoadedEvent")
        cy.assertEventWithText("ww1", "id1" , "1")
        cy.assertEventWithText("ww1", "id2" , "1")

        cy.refreshDashboard();
        cy.wait(100);
        cy.waitForPrintStatus();
        cy.assertEventWithText("ww1", "id1" , "2");
        cy.assertEventWithText("ww1", "id2" , "1")

        cy.refreshDashboard();
        cy.wait(100);
        cy.waitForPrintStatus();
        cy.assertEventWithText("ww1", "id1" , "3");
        cy.assertEventWithText("ww1", "id2" , "1")

    });

})


