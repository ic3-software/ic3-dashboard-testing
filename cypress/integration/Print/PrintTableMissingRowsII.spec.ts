describe("Print/Print Table Missing Rows II", () => {

    beforeEach(() => {
        cy.login();
        cy.openPrintInBrowserTestReport("Print/Print Table Missing Rows II");
        cy.waitForQueryCount(1);
    });

    it("Print In Browser", () => {

        cy.assertTableRowCount("ww0", 10);
        cy.assertTableCellContent("ww0", 0, 9, "Argentina");
        cy.assertTableCellContent("ww0", 9, 9, "Germany");

    })

    it("Print PDF", () => {

        cy.clickPrintButton("ww2");

        cy.readPdfFromDownload("Print Table Missing Rows.pdf")
            .pdfAssertNumberOfPages(1)
            .pdfTextShould("contain", "Argentina")
            .pdfTextShould("contain", "Germany")
        ;

    })

})
