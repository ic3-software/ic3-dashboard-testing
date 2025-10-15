describe("Print/PrintTableAutoExpandWhenPrinting", () => {

    beforeEach(() => {
        cy.login();
    });

    it("in viewer widgets DO NOT expand", () => {

        cy.openViewerTestReport("Print/PrintTableAutoExpandWhenPrinting");
        cy.waitForQueryCount(2);

        cy.getWidget("ww0").should("have.css", "height", '200px');
        cy.getWidget("ww1").should("have.css", "height", '200px');
        cy.getWidget("ww2").should("have.css", "height", '200px');

    })

    it("in printing widgets DO expand", () => {

        cy.openPrintInBrowserTestReport("Print/PrintTableAutoExpandWhenPrinting");
        cy.waitForQueryCount(2);

        cy.getWidget("ww0").invoke( "height").should("be.greaterThan", 250);
        cy.getWidget("ww1").invoke( "height").should("be.greaterThan", 250);
        cy.getWidget("ww2").invoke( "height").should("be.greaterThan", 250);

    })

})
