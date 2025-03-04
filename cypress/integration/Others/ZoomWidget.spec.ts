export {};

describe("Others/Zoom in out", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/zoom in out");
        cy.waitForQueryCount(2);
    });

    it("keep scrollbar position when zooming out", () => {

        // Scroll all the way down to ww1.
        cy.get(".ic3App-payload").scrollTo('bottom');
        cy.get(".ic3App-payload").invoke('scrollTop').then(scrollY => {
            cy.clickUserMenuZoom("ww1");
            cy.waitForQueryCount(2);
            cy.closeZoomedWidget("ww1");
            cy.get(".ic3App-payload").invoke('scrollTop').should('be.greaterThan', scrollY! - 50);
        });

    })

});
