describe("PrintPdf/EmptyPage", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("PrintPdf/EmptyPage");
        cy.waitForQueryCount(0);
    });

    it("Print PDF", () => {

        cy.selectButton("ww0", "print-report");

        cy.readPdfFromDownload("EmptyPage.pdf")

            .pdfAssertNumberOfPages(1)  //
    });

})
;
