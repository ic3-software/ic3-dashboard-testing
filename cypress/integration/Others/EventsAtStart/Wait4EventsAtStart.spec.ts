describe("Others/EventsAtStart/Wait4EventsAtStart", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/EventsAtStart/Wait4EventsAtStart");
    });

    const expected = 5;

    it("check 5 queries only", () => {
        cy.waitForPrintStatus();
        cy.waitForQueryCount(expected);
        cy.wait(1000);
        cy.waitForQueryCount(expected);
    });

    it("click and check queries", () => {
        cy.selectButton("ww6", "Gold");
        cy.waitForQueryCount(expected + 3);
    });

})