describe("Print/printGridLayoutI", () => {

    beforeEach(() => {
        cy.login();
    });

    it("Assert grid layout expands the rows correctly with invisible widgets", () => {

        cy.openPrintInBrowserTestReport("Print/printGridLayoutI", undefined, undefined, "portrait");
        cy.waitForQueryCount(0);

        // sizes to full width because ww14 and ww13 are invisible
        assertSizing("ww12", 1121);

        // divide space of invisible widgets equally for this row
        assertSizing("ww2", 320);
        assertSizing("ww7", 275);
        assertSizing("ww8", 229);
        assertSizing("ww9", 275);

    });

});

function assertSizing(widget: string, expected: number) {
    // print scale = 0.64
    // correct size = expected * 0.64
    cy.getWidget(widget)
        .assertCssPx('width', expected * 0.64, 0.005)
    ;
}
