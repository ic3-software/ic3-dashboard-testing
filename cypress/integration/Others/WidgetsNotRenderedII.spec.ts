describe("Others/WidgetsNotRenderedII", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/WidgetsNotRenderedII", undefined, false, true);
        cy.waitForQueryCount(3);
    });

    it("The table ww0 renders", () => {
        cy.assertTableRowCount("ww0", 5);
    })

})