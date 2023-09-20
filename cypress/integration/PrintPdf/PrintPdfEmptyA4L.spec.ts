describe("PrintPdf/EmptyPage A4L", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("PrintPdf/EmptyPage A4L");
        cy.waitForQueryCount(0);
    });

    it("Print PDF", () => {

        cy.selectButton("ww0", "print-report");

        cy.readPdfFromDownload("EmptyPage A4L.pdf")

            .pdfAssertNumberOfPages(1)  //
    });

})
;
