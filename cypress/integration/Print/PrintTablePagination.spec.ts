describe("Print/PrintTablePagination", () => {

    beforeEach(() => {
        cy.login();
    });

    it("pagination correct from state", () => {

        cy.openPrintInBrowserTestReport("Print/PrintTablePagination");
        cy.waitForQueryCount(1);

        cy.getWidget("ww0").find("button[title='Go to next page']").click();

        cy.clickPrintButton("ww1");

        cy.readPdfFromDownload("PrintTablePagination.pdf")
            .pdfAssertNumberOfPages(1)
            .pdfTextShould("contain", "E.O. Abe")
            .pdfTextShould("contain", "101–200 of 245")
        ;

    });

});
