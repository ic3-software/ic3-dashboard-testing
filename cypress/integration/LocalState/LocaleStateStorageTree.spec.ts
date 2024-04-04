describe("Local State/Tree", () => {

    const dashboard = "Local State/Tree";
    const header = "Tree [Stats].[Stats-Article].[All Articles]";
    const wid = "ww9";

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);
        cy.clearAllLocalStorage();
    });

    it("Save/Restore State", () => {

        // First create the state
        cy.selectTree(wid, "control-icons", 'All Articles');

        // Assert the state
        cy.assertWidgetHeader(wid, header);

        // Then refresh page
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);

        // Assert state is kept
        cy.assertWidgetHeader(wid, header);

    });

});