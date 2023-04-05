export {};

describe("Drilldown/Drilldowns MDX Pivot Table Last Level", () => {

    const pivot = "ww0";
    const pivot2 = "ww1";


    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Drilldown/Drilldowns MDX Pivot Table Last Level");
        cy.waitForQueryCount(2);

    })

    it("drilldowns", () => {

        cy.assertPivotTableRowCount(pivot, 2);
        cy.assertPivotTableRowCount(pivot2, 2);

        // standard MDX hierarchy
        {
            // drilldown
            cy.drilldownPivotTableLeftHeader(pivot, 0, 0);
            cy.waitForQueryCount(3);
            cy.assertPivotTableRowCount(pivot, 4);

            //collapse
            cy.drilldownPivotTableLeftHeader(pivot, 0, 0);
            cy.assertPivotTableRowCount(pivot, 2);

            for (let i = 1; i <= 6; i++) {
                cy.drilldownPivotTableLeftHeader(pivot, 0, 0);
                cy.assertPivotTableRowCount(pivot, 2 + (i % 2) * 2);
            }
            cy.waitForQueryCount(3);


        }
        // MDX defined drilldown on the last level
        {
            // drilldown
            cy.drilldownPivotTableLeftHeader(pivot2, 0, 0);
            cy.waitForQueryCount(4);
            cy.assertPivotTableRowCount(pivot2, 4);

            //collapse
            cy.drilldownPivotTableLeftHeader(pivot2, 0, 0);
            cy.assertPivotTableRowCount(pivot2, 2);

            for (let i = 1; i <= 6; i++) {
                cy.drilldownPivotTableLeftHeader(pivot2, 0, 0);
                cy.assertPivotTableRowCount(pivot2, 2 + (i % 2) * 2);
            }
            cy.waitForQueryCount(4);

        }

    });

});
