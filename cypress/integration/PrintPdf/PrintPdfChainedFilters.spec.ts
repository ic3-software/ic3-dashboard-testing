describe("PrintPdf/PrintPdf Table", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("PrintPdf/PrintPdf chained filters");
    });

    it("Print PDF", () => {

        cy.selectButton("ww4", "print-report");

        cy.readPdfFromDownload("PrintPdf chained filters.pdf")

            .pdfAssertOccurrences("\nTable\n", 1)  //

            // table 2 - footer and pagination
            .pdfTextShould('contain', 'Europe')  //first visible row
            .pdfTextShould('contain', 'Amount')   //last visible row
            .pdfTextShould('contain', '€20,000')   //last visible row
            .pdfAssertNumberOfPages(1)  //
    });

})
;
