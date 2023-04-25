export {};

describe("Tables/Table Date Time Column From Drillthrough", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Date Time Drillthrough");
        cy.waitForQueryCount(1);
    });

    it("base", () => {

        // Assert table renders without errors.
        cy.assertTableColCount("ww0", 3);

    });


});
