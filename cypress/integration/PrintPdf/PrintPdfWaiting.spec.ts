describe("PrintPdf/PrintPdf Table", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("PrintPdf/PrintPdf Waiting Widgets");
    });

    it("Print PDF", () => {

        cy.selectButton("ww1", "print-report");

        cy.readPdfFromDownload("PrintPdf Waiting Widgets.pdf")
            .pdfAssertNumberOfPages(1)  //
    });

})
;
