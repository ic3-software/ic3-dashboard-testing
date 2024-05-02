describe("Others/EventsAtStart/EventsAtStartOnNoData", () => {

    beforeEach(() => {
        cy.login();
    });

    const expected = 4;

    // Combo Filters
    it("1", () => {
        cy.openViewerTestReport("Others/EventsAtStart/EventsAtStart-1");
        cy.waitForQueryCount(4);
        cy.wait(1000);
        cy.waitForQueryCount(4);
    });

    // Tricky scenario, the one in the middle is waiting for an event that is not going to happen; the third one is generated
    it("2", () => {
        cy.openViewerTestReport("Others/EventsAtStart/EventsAtStart-2", true, false);
        cy.waitForQueryCount(3);
        cy.wait(1000);
        cy.waitForQueryCount(3);
    });

    // First event is not fired as we are getting an empty result, the show goes on
    it("3", () => {
        cy.openViewerTestReport("Others/EventsAtStart/EventsAtStart-3");
        cy.waitForQueryCount(4);
        cy.wait(1000);
        cy.waitForQueryCount(4);
    });


})