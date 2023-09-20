describe("PrintPdf/EmptyPage A4", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("PrintPdf/EmptyPage A4");
        cy.waitForQueryCount(0);
    });

    it("Print PDF", () => {

        cy.selectButton("ww0", "print-report");

        cy.readPdfFromDownload("EmptyPage A4.pdf")

            .pdfAssertNumberOfPages(1)  //
    });

})
;
