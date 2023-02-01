describe("Others/EventsAtStartGlobalFilter", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/EventsAtStartGlobalFilter");
    });

    const expected = 2;

    it("Check we only fire two MDX queries (we are waiting for the global event to be generated)", () => {
        cy.waitForPrintStatus();
        cy.waitForQueryCount(expected);
        cy.wait(1000);
        cy.waitForQueryCount(expected);
    });

    it("Additional sanity tests", () => {

        const wPanel = "ww1";
        cy.panelFilterRemove(wPanel, 0);
        cy.waitForQueryCount(expected + 2);

        cy.panelFilterAdd(wPanel, "Continent");
        cy.panelFilterSelectOperatorFromInput(wPanel, 0, "Contains");
        cy.panelFilterSetTextFieldValue(wPanel, 0, "Am");

        cy.waitForQueryCount(expected + 2 + 2);

    });

})