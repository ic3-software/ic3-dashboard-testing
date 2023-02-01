export {};

const YEARS = ["2022", "2021", "2020", "2019", "2018"];

const YEARS_AS_CHILD_NO = {
    "2018": 1
}

const QUARTERS = {
    "2018": ["2018 Q4", "2018 Q3", "2018 Q2", "2018 Q1"]
}

const QUARTERS_AS_CHILD_NO = {
    "2018 Q1": 1
}

const MONTHS = {
    "2018 Q1": ["2018 Mar", "2018 Feb", "2018 Jan"]
}

const MONTHS_AS_CHILD_NO = {
    "2018 Jan": 1
}

const DAYS = {
    "2018 Jan": ["1 Jan 2018", "7 Jan 2018", "13 Jan 2018", "19 Jan 2018", "25 Jan 2018", "31 Jan 2018"]
}

const DAYS_AS_CHILD_NO = {
    "1 Jan 2018": 1
}


function assertChartYAxis(widgetId: string, labels: string[]) {

    labels.forEach(label => {
        cy.getWidget(widgetId)
            .find(`g[aria-label='${label}']`)
        ;
    });

    // cy.getWidget(widgetId)
    //     .find(`g[aria-label*='20']`)
    //     .should("have.length", labels.length)
    // ;

}

function selectChart(widgetId: string, child: number, role: string = "menuitem") {

    cy.getWidget(widgetId)
        .find("svg")
        .find(`g[role='${role}']:nth-child(${child})`)
        .click({force: true})
    ;

}

function assertChartDrilldown(widgetId: string, yAxisLabels: string[], event: string | null, mdx: string | null) {

    assertChartYAxis(widgetId, yAxisLabels);

}


describe("Drilldown/Drilldowns Default Behavior", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Drilldown/Drilldowns Default Behavior");
        cy.waitForQueryCount(2);
    });

    it("ww0: has drilldown but it is disabled from \"defaults\"", () => {

        let queryCount = 2;

        const widgetId = "ww0";

        assertChartDrilldown(widgetId, YEARS, null, null)

        selectChart(widgetId, YEARS_AS_CHILD_NO["2018"]);
        cy.waitForQueryCount(queryCount);
        assertChartDrilldown(widgetId, YEARS, null, null)

    })

    it("ww2: missing drilldown but it is enabled from \"defaults\"", () => {

        let queryCount = 2;

        const widgetId = "ww2";

        cy.assertPivotTableLeftHeader(widgetId, 0, 0, "2018");
        cy.assertPivotTableLeftHeader(widgetId, 1, 0, "2019");

        // drilldown 2018
        cy.log("drilldown: 2018")
        cy.drilldownPivotTableLeftHeader(widgetId, 0, 0 /* 2018 */);
        cy.waitForQueryCount(++queryCount);
        cy.assertPivotTableLeftHeader(widgetId, 0, 0, "2018");
        cy.assertPivotTableLeftHeader(widgetId, 1, 0, "2018 Q1");

    })

});
