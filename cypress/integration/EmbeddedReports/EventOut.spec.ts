export {};

describe("Embedded Reports/eventsOut", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Embedded Reports/event-forwarder/eventsOut");
        cy.waitForQueryCount(2);
    });

    it("Basics", () => {

        cy.assertTableRowCount("ww1", 6);
        cy.assertTableValue("ww1", 1, 1, "345,050.00");

        cy.selectButton("_ww0:ww0", "Personal");
        cy.assertTableValue("ww1", 1, 1, "82,200.00");

        cy.selectButton("_ww0:ww0", "Server");
        cy.assertTableValue("ww1", 1, 1, "19,000.00");
    });

});
