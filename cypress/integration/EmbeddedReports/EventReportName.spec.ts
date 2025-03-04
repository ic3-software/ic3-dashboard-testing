export {};

describe("Embedded Reports/event-forwarder", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Embedded Reports/report-name-event/embedding");
        cy.waitForQueryCount(0);
    });

    it("Basics", () => {

        cy.assertEventWithText("default:ww1", "report-name", "embedding");

        cy.assertEventWithText("_ww0:ww0", "report-name", "dashboard embedded");

    });

});
