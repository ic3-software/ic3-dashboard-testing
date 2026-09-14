function assertTable(wTable: string) {
    cy.assertTableValue(wTable, 0, 1, "250.00");
    cy.assertTableValue(wTable, 5, 1, "250.00");
}

describe("Others/Invisible Widgets", () => {

    beforeEach(() => {
        cy.login();
    });

    it("Viewer", () => {

        cy.openViewerTestReport("Others/Invisible Gadget");
        cy.waitForQueryCount(2);

        assertTable("ww1")

    })

    it("Editor", () => {

        cy.openEditorTestReport("Others/Invisible Gadget");
        cy.waitForQueryCount(2);

       assertTable("ww1")

    })

    it("Printing", () => {

        cy.openPrintInBrowserTestReport("Others/Invisible Gadget");
        cy.waitForQueryCount(2);

        assertTable("ww1")

    })

})