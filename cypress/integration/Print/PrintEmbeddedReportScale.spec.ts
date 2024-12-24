describe("Print/Print Embedded Report Scale", () => {

    beforeEach(() => {
        cy.login();
        cy.openPrintInBrowserTestReport("Print/PrintEmbeddedReportScale");
        cy.waitForQueryCount(0);
    });

    it("Assert scale in the embedded report is correct", () => {

        const widget = "ww1";
        const widgetInEmbedded= "_ww0:ww0";

        assertSizing(widget);
        assertSizing(widgetInEmbedded);

    });

});

function assertSizing(widget: string) {
    // print scale = 0.64
    // correct size = 100 * 0.64
    cy.getWidget(widget).find("#cy-red-box")
        .should('have.css', 'height').should(height => {
        expect(height).to.include('px');
        expect(parseInt(height, 10)).to.be.within(63.99,64.01);  // Adres rounding issues.
    })
}
