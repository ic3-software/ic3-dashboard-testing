describe("Others/ViewerGridLayoutPositioning", () => {

    beforeEach(() => {
        cy.login();
    });

    it("Assert grid layout expands the rows correctly with invisible widgets", () => {

        cy.openViewerTestReport("Others/viewerGridLayout", undefined, undefined);
        cy.waitForQueryCount(0);

        // sizes to full width because ww14 and ww13 are invisible
        cy.assertWidgetWidth("ww12", 1504);

        // divide space of invisible widgets equally for this row
        cy.assertWidgetWidth("ww2", 432);
        cy.assertWidgetWidth("ww7", 370);
        cy.assertWidgetWidth("ww8", 307);
        cy.assertWidgetWidth("ww9", 370);

    });

});
