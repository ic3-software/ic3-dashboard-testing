describe("Print/PortraitLandscapeScale", () => {

    beforeEach(() => {
        cy.login();
    });

    it("Assert scale in the embedded report is correct", () => {

        cy.openPrintInBrowserTestReport("Print/PortraitLandscapeScale", undefined, undefined, "portrait");
        cy.waitForQueryCount(0);

        assertSizing("ww5");

    });

    it("Assert scale in the embedded report is correct", () => {

        cy.openPrintInBrowserTestReport("Print/PortraitLandscapeScale", undefined, undefined, "landscape");
        cy.waitForQueryCount(0);

        assertSizing("ww5");

    });

});

function assertSizing(widget: string) {
    // print scale = 0.64
    // correct size = 100 * 0.64
    cy.getWidget(widget)
        .should('have.css', 'height').should(height => {
        expect(height).to.include('px');
        expect(parseInt(height, 10)).to.be.within(63.99,64.01);  // Adres rounding issues.
    })
}
