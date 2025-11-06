describe("Print/PrintScrollIntoView", () => {

    beforeEach(() => {
        cy.login();
    });

    it("Assert all widgets visible after print", () => {

        cy.openViewerTestReport("Print/PrintScrollIntoView", false, false, true);
        cy.waitForQueryCount(5, 8);

        cy.clickPrintButton("ww0");

        cy.readPdfFromDownload("PrintScrollIntoView.pdf")
            .pdfAssertNumberOfPages(2)
            .pdfTextShould("contain", "ww1 Table ic3_print_test_ic3")
            .pdfTextShould("contain", "ww2 Table ic3_print_test_ic3")
            .pdfTextShould("contain", "ww3 Table ic3_print_test_ic3")
            .pdfTextShould("contain", "ww4 Table ic3_print_test_ic3")
            .pdfTextShould("contain", "ww5 Table ic3_print_test_ic3")
            .pdfTextShould("contain", "ww6 Table ic3_print_test_ic3")
            .pdfTextShould("contain", "ww7 Table ic3_print_test_ic3")
            .pdfTextShould("contain", "ww8 Table ic3_print_test_ic3")
        ;

        cy.get(".ic3App-payload").scrollTo("bottom");

        // Assert last widget on the dashboard renders
        cy.assertWidgetHeader("ww8", "ww8 Table ic3_print_test_ic3");

    });

});
