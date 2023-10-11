describe("Print/Print Table Missing Rows", () => {

    beforeEach(() => {
        cy.login();
        cy.openPrintInBrowserTestReport("Print/PrintTableMissingRows3");
        cy.waitForQueryCount(1);
    });

    it("Print In Browser", () => {

        cy.assertTableRowCount("ww0", 29);
        cy.assertTableCellContent("ww0", 0, 0, "Argentina");
        cy.assertTableCellContent("ww0", 28, 0, "Turkey");

    })

    it("Print PDF", () => {

        cy.clickPrintButton("ww2");

        cy.readPdfFromDownload("PrintTableMissingRows3.pdf")
            .pdfAssertNumberOfPages(1)
            .pdfTextShould("contain", "Argentina")
            .pdfTextShould("contain", "Turkey")
        ;

    })

})
