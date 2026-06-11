describe("Print/printGridLayoutI", () => {

    beforeEach(() => {
        cy.login();
    });

    it("Assert grid layout expands the rows correctly with invisible widgets", () => {

        cy.openPrintInBrowserTestReport("Print/printGridLayoutI", undefined, undefined, "portrait");
        cy.waitForQueryCount(0);

        // sizes to full width because ww14 and ww13 are invisible
        cy.assertWidgetWidthP("ww12", 1121);

        // divide space of invisible widgets equally for this row
        cy.assertWidgetWidthP("ww2", 320);
        cy.assertWidgetWidthP("ww7", 275);
        cy.assertWidgetWidthP("ww8", 229);
        cy.assertWidgetWidthP("ww9", 275);

    });

});
