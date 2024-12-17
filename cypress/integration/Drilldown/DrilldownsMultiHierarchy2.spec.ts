export {};

function assertLeftHeader(widgetId: string, col: number, labels: string[]) {

    // col: 0 => year      and T cell column
    // col: 1 => product   and P cell column
    // col: 2 => continent and G cell column

    cy.assertPivotTableLeftHeader(widgetId, -1, col, labels);
    cy.assertPivotTableCell(widgetId, -1, col, labels);

}

describe("Drilldown/Drilldowns MultiHierarchy II", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Drilldown/Drilldowns MultiHierarchy II");
        cy.waitForQueryCount(1);
    });

    it("ww1: Regression", () => {

        const widgetId = "ww1";

        cy.reload() /* moving the test around */;
        let queryCount = 1;

        cy.assertPivotTableRowCount(widgetId, 8);
        assertLeftHeader(widgetId, 0, ["2018", "2018", "2018", "2018", "2019", "2019", "2019", "2019"]);
        assertLeftHeader(widgetId, 1, ["License", "License", "Support", "Support", "License", "License", "Support", "Support"]);
        assertLeftHeader(widgetId, 2, ["Africa", "Asia", "Africa", "Asia", "Africa", "Asia", "Africa", "Asia"]);

        cy.log("drilldown: 2018|License|Africa");
        cy.drilldownPivotTableLeftHeader(widgetId, 0, 2);
        cy.waitForQueryCount(++queryCount);
        cy.assertPivotTableRowCount(widgetId, 10);

        assertLeftHeader(widgetId, 0, ["2018", "2018", "2018", "2018", "2018", "2018", "2019", "2019", "2019", "2019"]);
        assertLeftHeader(widgetId, 1, ["License", "License", "License", "License", "Support", "Support", "License", "License", "Support", "Support"]);
        assertLeftHeader(widgetId, 2, ["Africa", "Egypt", "South Africa", "Asia", "Africa", "Asia", "Africa", "Asia", "Africa", "Asia"]);

        cy.log("drilldown: 2018|License");
        cy.drilldownPivotTableLeftHeader(widgetId, 0, 1);
        cy.waitForQueryCount(++queryCount);
        cy.assertPivotTableRowCount(widgetId, 18);


        assertLeftHeader(widgetId, 0, [
            "2018",
            "2018",
            "2018",
            "2018",
            "2018",
            "2018",
            "2018",
            "2018",
            "2018",
            "2018",
            "2018",
            "2018",
            "2018",
            "2018",
            "2019",
            "2019",
            "2019",
            "2019",
        ]);
        assertLeftHeader(widgetId, 1, [
            "License",
            "License",
            "License",
            "License",
            "Personal",
            "Personal",
            "Personal",
            "Personal",
            "Server",
            "Server",
            "Server",
            "Server",
            "Support",
            "Support",
            "License",
            "License",
            "Support",
            "Support",
        ]);
        assertLeftHeader(widgetId, 2, [
            "Africa",
            "Egypt",
            "South Africa",
            "Asia",
            "Africa",
            "Egypt",
            "South Africa",
            "Asia",
            "Africa",
            "Egypt",
            "South Africa",
            "Asia",
            "Africa",
            "Asia",
            "Africa",
            "Asia",
            "Africa",
            "Asia",
        ]);

        cy.log("drilldown: 2018|License");
        cy.drilldownPivotTableLeftHeader(widgetId, 0, 1);

        cy.log("drilldown: 2018|License|Africa");
        cy.drilldownPivotTableLeftHeader(widgetId, 0, 2);

        cy.waitForQueryCount(queryCount);
        cy.assertPivotTableRowCount(widgetId, 8);
        assertLeftHeader(widgetId, 0, ["2018", "2018", "2018", "2018", "2019", "2019", "2019", "2019"]);
        assertLeftHeader(widgetId, 1, ["License", "License", "Support", "Support", "License", "License", "Support", "Support"]);
        assertLeftHeader(widgetId, 2, ["Africa", "Asia", "Africa", "Asia", "Africa", "Asia", "Africa", "Asia"]);
    })

});
