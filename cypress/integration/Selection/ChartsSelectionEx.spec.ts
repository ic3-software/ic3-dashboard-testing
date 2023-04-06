export {};

const YEARS = [
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
];

const PRODUCTS = [
    "License",
    "Support",
];

function tuple(...items: string[]) {
    return "(" + items.join(",") + ")";
}

function tupleE(...items: string[]) {
    return "(" + items.join(",") + ")";
}

function eventValueI(item: Item): string {

    if (item.product === undefined) {
        return YEARS[item.year];
    }

    return tupleE(PRODUCTS[item.product], YEARS[item.year]);
}

function eventValue(items: Item[]): string {

    if (items.length === 0) {
        return "";
    }

    return items.map(i => eventValueI(i)).join(", ");
}

function eventMdxI(item: Item): string {

    function yearUniqueName(year: number): string {
        return `[Time].[Time].[Year].&[${YEARS[year]}-01-01]`;
    }

    if (item.product === undefined) {
        return yearUniqueName(item.year);
    }

    function productUniqueName(product: number): string {
        return `[Product].[Product].[Category].&[${product + 1}]`;
    }

    return tuple(productUniqueName(item.product), yearUniqueName(item.year));
}

function eventMdx(items: Item[]): string {

    if (items.length === 0) {
        return "";
    }

    const mdx = items.map(i => eventMdxI(i)).join(",");

    if (items.length > 1) {
        return "{" + mdx + "}";
    }

    return mdx;
}

function assertSelection(widgetId: string, eventWidgetId: string, items: Item[]) {

    // ensure not to have a hovering effect before asserting the bar colors
    cy.clickWidgetHeader(widgetId);

    items.forEach(item => {
        cy.assertSelectedSingleChartBarInGroup(widgetId, item.product ?? 0, item.year);
    })

    cy.assertEventValue(eventWidgetId, eventValue(items));
    cy.assertEventMdx(eventWidgetId, eventMdx(items));

}

interface Item {
    year: number;
    product?: number;
}


describe("Selection/Charts Selection", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Selection/Charts Selection");
        cy.waitForQueryCount(6);
    });

    it("ww8: Column with sync selection", () => {

        const widgetId_top = "ww8";
        const widgetId_bottom = "ww10";
        const eventWidgetId = "ww9";

        assertSelection(widgetId_top, eventWidgetId, []);
        assertSelection(widgetId_bottom, eventWidgetId, []);

        cy.log("selecting 2018 from top")
        cy.selectSingleChartBarInGroup(widgetId_top, 0, 0);
        assertSelection(widgetId_top, eventWidgetId, [{year: 0}]);
        assertSelection(widgetId_bottom, eventWidgetId, [{year: 0}]);

        // clear selection from TOP
        cy.selectSingleChartBarInGroup(widgetId_top, 0, 0);
        assertSelection(widgetId_top, eventWidgetId, []);
        assertSelection(widgetId_bottom, eventWidgetId, []);

        cy.log("selecting 2019 from bottom")
        cy.selectSingleChartBarInGroup(widgetId_bottom, 0, 1);
        assertSelection(widgetId_top, eventWidgetId, [{year: 1}]);
        assertSelection(widgetId_bottom, eventWidgetId, [{year: 1}]);

        // clear selection from BOTTOM
        cy.selectSingleChartBarInGroup(widgetId_top, 0, 1);
        assertSelection(widgetId_top, eventWidgetId, []);
        assertSelection(widgetId_bottom, eventWidgetId, []);

    });


});
