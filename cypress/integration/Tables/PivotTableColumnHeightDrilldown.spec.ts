export {};

describe("Tables/Pivot Table Column Height Drilldown", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Pivot Table Column Height Drilldown");
        cy.waitForQueryCount(3);
    });

    it("ww1: top header text is fully visible by default", () => {

        const widgetId = "ww1";

        cy.assertPivotTableTopHeader(widgetId, 0, 0, "All Products");
        cy.assertPivotTableTopHeader(widgetId, 0, 1, "License");
        cy.assertPivotTableTopHeader(widgetId, 0, 2, "Support");

        [-1, 0, 1, 2].forEach(col => cy.assertPivotTableTopHeaderFullyVisible(widgetId, 0, col));

    });

    it("ww0: last line of long top header text is fully visible", () => {

        const widgetId = "ww0";

        cy.assertPivotTableTopHeader(widgetId, 0, 3, " Alexandria1 toto Alexandria2 Alexandria3333333333 Alexandria4 Alexandria5 Alexandria66666666666666666 Alexandria7");
        cy.assertPivotTableTopHeader(widgetId, 0, 9, "Brussels toto Brussels Brussels hello");

        [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(col => cy.assertPivotTableTopHeaderFullyVisible(widgetId, 0, col));

    });

    it("ww0: top header text is fully visible after collapsing Africa", () => {

        const widgetId = "ww0";

        cy.assertPivotTableTopHeader(widgetId, 0, 1, "Africa");

        cy.drilldownPivotTableTopHeader(widgetId, 0, 1 /* Africa */);

        // Egypt and Alexandria... are collapsed
        cy.assertPivotTableTopHeader(widgetId, 0, 2, "Asia");
        cy.assertPivotTableTopHeader(widgetId, 0, 3, "Indonesia");
        cy.assertPivotTableTopHeader(widgetId, 0, 4, "Jakarta");
        cy.assertPivotTableTopHeader(widgetId, 0, 7, "Brussels toto Brussels Brussels hello");

        [-1, 0, 1, 2, 3, 4, 5, 6, 7].forEach(col => cy.assertPivotTableTopHeaderFullyVisible(widgetId, 0, col));

    });

    it("ww2: year row enlarges and product row keeps its height after drilldown on 2019", () => {

        const widgetId = "ww2";
        const tolerance = 1; // px (rounding)

        const headerCell = (row: number, col: number) => cy.getWidget(widgetId)
            .find(`.ic3WidgetBox-content .ic3-pt-header div[data-vr='${row}'][data-vc='${col}']`);

        // row 0 : Year, row 1 : Product
        cy.assertPivotTableTopHeader(widgetId, 0, 0, "2018");
        cy.assertPivotTableTopHeader(widgetId, 0, 1, "2019");
        cy.assertPivotTableTopHeader(widgetId, 1, 1, "All Products");

        headerCell(0, 1).then($cell => cy.wrap($cell[0].getBoundingClientRect().height).as("yearRowHeight"));
        headerCell(1, 1).then($cell => cy.wrap($cell[0].getBoundingClientRect().height).as("productRowHeight"));

        cy.drilldownPivotTableTopHeader(widgetId, 0, 1 /* 2019 */);
        cy.waitForQueryCount(4);

        cy.assertPivotTableTopHeader(widgetId, 0, 1, "2019");
        cy.assertPivotTableTopHeader(widgetId, 0, 2, "2019 Q1");
        cy.assertPivotTableTopHeader(widgetId, 0, 5, "2019 Q4");
        cy.assertPivotTableTopHeader(widgetId, 0, 6, "2020");
        cy.assertPivotTableTopHeader(widgetId, 1, 2, "All Products");

        // the year row enlarges because of the drilldown (all its cells sharing the same new height)
        cy.get<number>("@yearRowHeight").then(yearRowHeight => {
            headerCell(0, 1).should($cell => {
                expect($cell[0].getBoundingClientRect().height, "year row height after drilldown")
                    .to.be.greaterThan(yearRowHeight + tolerance);
            }).then($drilled => {
                const drilledYearRowHeight = $drilled[0].getBoundingClientRect().height;
                [0, 2, 5, 6].forEach(col => headerCell(0, col).should($cell => {
                    expect($cell[0].getBoundingClientRect().height, `year row height (col ${col})`)
                        .to.be.within(drilledYearRowHeight - tolerance, drilledYearRowHeight + tolerance);
                }));
            });
        });

        // the product row keeps its height

        cy.get<number>("@productRowHeight").then(productRowHeight => {
            [0, 1, 2, 5, 6].forEach(col => headerCell(1, col).should($cell => {
                expect($cell[0].getBoundingClientRect().height, `product row height (col ${col})`)
                    .to.be.within(productRowHeight - tolerance, productRowHeight + tolerance);
            }));
        });

        [-1, 0, 1, 2, 3, 4, 5, 6].forEach(col => cy.assertPivotTableTopHeaderFullyVisible(widgetId, 0, col));
        [0, 1, 2, 5, 6].forEach(col => cy.assertPivotTableTopHeaderFullyVisible(widgetId, 1, col));

    });

});
