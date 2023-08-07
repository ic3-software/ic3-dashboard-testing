describe("PrintPdf/PrintPdf Table", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("PrintPdf/PrintPdf Table");
        cy.waitForQueryCount(0);
    });

    it("Print PDF", () => {

        cy.selectButton("ww1", "print-report");

        cy.wait(5000).readPdfFromDownload("PrintPdf Table.pdf")

            .assertOccurrences("\nTable\n", 1)  //
            .assertOccurrences("\nTable 2\n", 1)  //
            // table 1
            .should('contain', '8717bbf45cCDbEe')  //first visible row
            .should('contain', '421fAB9a3b98F30')   //last visible row
            // table 2 - footer and pagination
            .should('contain', 'DFAB00C01CcF860')  //first visible row
            .should('contain', 'eEF6Cf6C10b1446')   //last visible row
    });

})
;
