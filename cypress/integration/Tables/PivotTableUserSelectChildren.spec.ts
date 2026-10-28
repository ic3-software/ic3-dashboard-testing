export {};

describe("Tables/Pivot Table User Select Children", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Pivot Table User Select Children");
        cy.waitForQueryCount(1);
    });

    it("user select drilldown - children", () => {

        const widgetId = "ww0";

        cy.assertPivotTableLeftHeader(widgetId, 1, 0, "Africa");
        cy.assertPivotTableLeftHeader(widgetId, 1, 1, "Consumer");

        cy.drilldownPivotTableLeftHeader(widgetId, 1, 1 /* Africa / Consumer */);
        cy.clickDrilldownMenu(widgetId, ["Children"]);
        cy.waitForQueryCount(2);

        // children are expanded below Africa / Consumer
        cy.assertPivotTableLeftHeader(widgetId, 0, 1, "Business");
        cy.assertPivotTableLeftHeader(widgetId, 1, 1, "Consumer");

        [// Fake names
            "D.M.S. Allen",
            "W. Toure",
            "I.J.C. Saeed",
            "E.L.V. Barrios",
            "G. Sayed",
            "Y.I.E. Ou yang",
            "I.X. Zhong",
            "A.P. Gayakwad",
            "L.Y. Kimura",
            "G. Banza",
            "Z.H. Mane",
            "U.F. Sani",
            "V.L. Akbar",
            "K. Zhan",
            "D.C. Johnson",
            "K. Im",
            "A.N.X. Mei",
        ].forEach((name, idx) => {
            cy.assertPivotTableLeftHeader(widgetId, 2 + idx, 0, "Africa");
            cy.assertPivotTableLeftHeader(widgetId, 2 + idx, 1, name);
        });

        cy.assertPivotTableLeftHeader(widgetId, 19, 0, "Asia");
        cy.assertPivotTableLeftHeader(widgetId, 19, 1, "Business");

    });

});
