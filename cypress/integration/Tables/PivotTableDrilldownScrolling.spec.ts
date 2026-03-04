export {};

describe("Tables/PivotTableDrilldownScrolling", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/PivotTableDrilldownScrolling");
        cy.waitForQueryCount(1);

    })

    it("Scroll after drilldown works", () => {

        cy.drilldownPivotTableLeftHeader("ww0", 1, 0);

        // Scroll to the end in the pivot table
        cy.scrollPivotTable("ww0", 999);

        // Assert 6 visible rows in DOM
        cy.getWidget("ww0")
            .find(`.ic3WidgetBox-content .ic3-pt-left-header div.ic3-pt-row`)
            .should('have.length', 6);

        cy.assertPivotTableLeftHeader("ww0", 12, 0 , "Thailand");
        cy.assertPivotTableLeftHeader("ww0", 13, 0 , "Turkey");
        cy.assertPivotTableLeftHeader("ww0", 14, 0 , "Europe");
        cy.assertPivotTableLeftHeader("ww0", 15, 0 , "North America");
        cy.assertPivotTableLeftHeader("ww0", 16, 0 , "Oceania");
        cy.assertPivotTableLeftHeader("ww0", 17, 0 , "South America");

    });

});
