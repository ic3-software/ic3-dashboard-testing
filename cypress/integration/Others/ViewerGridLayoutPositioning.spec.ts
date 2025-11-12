describe("Others/ViewerGridLayoutPositioning", () => {

    beforeEach(() => {
        cy.login();
    });

    it("Assert grid layout expands the rows correctly with invisible widgets", () => {

        cy.openViewerTestReport("Others/viewerGridLayout", undefined, undefined);
        cy.waitForQueryCount(0);

        // sizes to full width because ww14 and ww13 are invisible
        assertSizing("ww12", 1504);

        // divide space of invisible widgets equally for this row
        assertSizing("ww2", 432);
        assertSizing("ww7", 370);
        assertSizing("ww8", 307);
        assertSizing("ww9", 370);

    });

});

function assertSizing(widget: string, expected: number) {
    cy.getWidget(widget)
        .assertCssPx('width', expected, 0.05)
    ;
}
