export {};

describe("Filters/Filter Panel Off Screen", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/Filter Panel Off Screen");
        cy.waitForQueryCount(1);
    });

    it("regression test: off screen filter panel fires global event", () => {

        cy.assertTableValue("ww0", 0, 0, "Personal");

    })

});
