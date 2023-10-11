describe("Print/Print Table Missing Rows", () => {

    beforeEach(() => {
        cy.login();
        cy.openPrintInBrowserTestReport("Print/PrintTableMissingRows1");
        cy.waitForQueryCount(1);
    });

    it("Print In Browser", () => {

        cy.assertTableRowCount("ww0", 20);
        cy.assertTableCellContent("ww0", 0, 0, "Argentina");
        cy.assertTableCellContent("ww0", 19, 0, "Poland");

    })

    it("Print PDF", () => {

        cy.clickPrintButton("ww2");

        cy.readPdfFromDownload("PrintTableMissingRows1.pdf")
            .pdfAssertNumberOfPages(1)
            .pdfTextShould("contain", "Argentina")
            .pdfTextShould("contain", "Poland")
        ;

    })

})
