describe("PrintPdf/PrintPdf Table", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("PrintPdf/PrintPdf Table");
        cy.waitForQueryCount(0);
    });

    it("Print PDF", () => {

        cy.selectButton("ww1", "print-report");

        cy.readPdfFromDownload("PrintPdf Table.pdf")

            .pdfAssertOccurrences("\nTable\n", 1)  //
            .pdfAssertOccurrences("\nTable 2\n", 1)  //
            // table 1
            .pdfTextShould('contain', '8717bbf45cCDbEe')  //first visible row
            .pdfTextShould('contain', '421fAB9a3b98F30')   //last visible row
            // table 2 - footer and pagination
            .pdfTextShould('contain', 'DFAB00C01CcF860')  //first visible row
            .pdfTextShould('contain', 'eEF6Cf6C10b1446')   //last visible row
            .pdfAssertNumberOfPages(1)  //
    });

})
;
