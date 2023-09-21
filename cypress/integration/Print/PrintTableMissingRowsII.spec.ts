function createPrintingURL(path: string): Partial<VisitOptions> & { url: string } {

    return {
        url: Cypress.config().baseUrl === "http://localhost:3000" ? "/viewer" : "/icCube/report/viewer",

        qs: {
            // ic3appLocalUrl: "dft",
            //
            // ic3dataSource: JSON.stringify({
            //     url: Cypress.config().baseUrl + "/icCube/gvi"
            // }),

            ic3report: path,

            ic3printParams: JSON.stringify({

                fitToPage: "true",
                scale: 1.0,

                // A4

                pageSizeName: "A4",
                pageOrientation: "portrait",

                pageSizeUnits: "mm",
                pageWidth: 210,
                pageHeight: 297,

                marginTop: 0.0,
                marginLeft: 0.0,
                marginRight: 0.0,
                marginBottom: 0.0,
            })
        }
    }
}


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
