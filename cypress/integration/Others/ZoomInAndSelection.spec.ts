export {};


describe("Others/ZoomInAndSelection", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/ZoomInAndSelection", true, false);
        cy.waitForQueryCount(2);
    });

    it("Selection works when zooming and zooming out", () => {

        // Validate chart data
        cy.clickUserMenuShowData("ww1");
        cy.assertShowDataTableCellContent("ww1", 0, 1, "1,030");
        cy.clickUserMenuShowData("ww1");

        cy.clickUserMenuZoom("ww0");

        cy.getZoomedWidget("ww0").then(w => {
            cy.donutClickSlice(w, 1);
        });
        cy.clickUserMenuZoom("ww0", true);
        cy.donutAssertSliceSelected("ww0", 1);

        // Validate chart data
        cy.clickUserMenuShowData("ww1");
        cy.assertShowDataTableCellContent("ww1", 0, 1, "170");
        cy.clickUserMenuShowData("ww1");

    });

});
