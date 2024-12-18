export {};

describe("Tables/Pivot Table Scrolling", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Pivot Table Scrolling");
        cy.waitForQueryCount(1);

    })

    it("Scrolls the page down if scrollbar is at bottom", () => {

        // Scroll to the end in the pivot table (scroll a few times to mimic mouse)
        cy.scrollPivotTable("ww0", 100);
        cy.scrollPivotTable("ww0", 100);
        cy.scrollPivotTable("ww0", 100);
        cy.scrollPivotTable("ww0", 100);
        cy.get("#app-payload").then(el => el[0].scrollTop).should('equal', 0);

        cy.wait(500);

        // Now scroll again. This scrolls the web-page.
        cy.scrollPivotTable("ww0", 100);
        cy.wait(10);
        cy.get("#app-payload").then(el => el[0].scrollTop).should('equal', 100);

    });

    it("Scrolls the page up if scrollbar is at top", () => {

        // Scroll down first
        cy.get("#app-payload").realMouseWheel({deltaY: 100, scrollBehavior: false});
        cy.scrollPivotTable("ww0", 100);
        cy.wait(10);
        cy.get("#app-payload").then(el => el[0].scrollTop).should('equal', 100);

        // Same test but scrolling up
        cy.scrollPivotTable("ww0", -100);
        cy.scrollPivotTable("ww0", -100);
        cy.scrollPivotTable("ww0", -100);
        cy.scrollPivotTable("ww0", -100);
        cy.wait(10);
        cy.get("#app-payload").then(el => el[0].scrollTop).should('equal', 100);
        cy.wait(500);
        cy.scrollPivotTable("ww0", -100);
        cy.wait(10);
        cy.get("#app-payload").then(el => el[0].scrollTop).should('equal', 0);

    });

});
