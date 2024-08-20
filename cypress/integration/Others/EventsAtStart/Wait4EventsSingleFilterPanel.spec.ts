describe("Others/EventsAtStart/Wait4EventsAtStart", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/EventsAtStart/EventAtStartSingleFP");
    });

    const expected = 1;

    it("check 1 queries only (from the table)", () => {
        cy.waitForPrintStatus();
        cy.waitForQueryCount(expected);
        cy.wait(1000);
        cy.waitForQueryCount(expected);
    });

})