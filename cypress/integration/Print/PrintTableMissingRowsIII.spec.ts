describe("Print/Print Table Missing Rows", () => {

    beforeEach(() => {
        cy.login();
        cy.openPrintInBrowserTestReport("Print/Print Table Missing Rows III");
        cy.waitForQueryCount(1);
    });

    it("Print In Browser", () => {

        cy.assertTableRowCount("ww0", 31);
        cy.assertTableCellContent("ww0", 0, 0, "Argentina");
        cy.assertTableCellContent("ww0", 30, 0, "United States");

    })

    it("Print PDF", () => {

        cy.clickPrintButton("ww2");

        cy.readPdfFromDownload("Print Table Missing Rows.pdf")
            .pdfAssertNumberOfPages(1)
            .pdfTextShould("contain", "Argentina")
            .pdfTextShould("contain", "United States")
        ;

    })

})
