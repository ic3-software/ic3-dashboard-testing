export {};

describe("Embedded Reports/Event from in to out", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("shared:/Tests/Embedded Reports/event-in-to-out/master");
        cy.waitForQueryCount(1);
    });

    it("Basics", () => {

        cy.assertEventValue("ww1", '');
        cy.selectButton("_ww0:ww0", "2020");
        cy.assertEventValue("ww1", '2020');

    });

});
