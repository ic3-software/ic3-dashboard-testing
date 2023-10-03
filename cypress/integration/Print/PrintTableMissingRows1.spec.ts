describe("Print/Print Table Missing Rows", () => {

    beforeEach(() => {
        cy.login();
        cy.openPrintInBrowserTestReport("Print/PrintTableMissingRows1");
        cy.waitForQueryCount(1);
    });

    it("Print In Browser", () => {

        cy.assertTableRowCount("ww0", 31);
        cy.assertTableCellContent("ww0", 0, 0, "Argentina");
        cy.assertTableCellContent("ww0", 30, 0, "United States");

    })

    it("Print PDF", () => {

        cy.clickPrintButton("ww2");

        cy.readPdfFromDownload("PrintTableMissingRows1.pdf")
            .pdfAssertNumberOfPages(2)
            .pdfTextShould("contain", "Argentina")
            .pdfTextShould("contain", "United States")
        ;

    })

})
