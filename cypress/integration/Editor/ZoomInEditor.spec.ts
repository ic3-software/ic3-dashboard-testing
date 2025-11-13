export {};

describe("Editor/ZoomInEditor", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Editor/Zoom in");
        cy.waitForQueryCount(1);
    });

    it("zoom in and refresh editor", () => {

        cy.switchEditorToQuickViewMode();
        cy.clickUserMenuZoom("ww0");
        cy.refreshDashboard();
        cy.assertTableValue("ww0", 0, 0, "Amount");

    });

});
