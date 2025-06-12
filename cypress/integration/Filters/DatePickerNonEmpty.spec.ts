export {};

describe("Filters/Datepicker Non Empty", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Date Picker Non Empty", true, false);
        cy.waitForQueryCount(2);
    });

    it("empty queries fire an empty event", () => {
        cy.assertTableValue("ww3", 0, 1, "€9,014,850");
        cy.selectButton("ww2", "all");
        cy.assertTableValue("ww3", 0, 1, "€1,200");
    });

});
