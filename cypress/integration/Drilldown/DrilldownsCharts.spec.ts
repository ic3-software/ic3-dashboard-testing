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

const ARTICLES = {
    "2018": ["Server", "Silver", "Platinum", "Personal", "Gold"]
}

const ARTICLES_AS_CHILD_NO = {
    "Server": 1
}

const CONTINENTS = {
    "Server": ["Europe", "Asia", "Oceania", "South America", "Africa", "North America"]
}

const CONTINENTS_AS_CHILD_NO = {
    "Asia": 2
}


function assertChartYAxis(widgetId: string, labels: string[]) {

    cy.getWidget(widgetId).then($widget => {

        labels.forEach(label => {

            cy.wrap($widget).find(`g[aria-label='${label}']`)

        });

    })

}

function assertChartValueLabels(widgetId: string, labels: string[]) {

    cy.getWidget(widgetId).then($widget => {

        labels.forEach((label, idx) => {

            cy.wrap($widget).contains(`foreignObject>div:nth(${labels.length - idx - 1})`, label)

        });

    })

}

function selectChart(widgetId: string, child: number, role: string = "menuitem") {

    cy.getWidget(widgetId)
        .find(`svg g[role='${role}']:nth-child(${child})`)
        .click({force: true})
    ;

}

function assertChartDrilldown(widgetId: string, eventWidgetId: string, yAxisLabels: string[], event: string | null, mdx: string | null) {

    assertChartYAxis(widgetId, yAxisLabels);

    cy.assertEventValue(eventWidgetId, event);

    if (mdx !== undefined) {

        cy.assertEventMdx(eventWidgetId, mdx);

    }

}

function assertChartDrilldownEvent(eventWidgetId: string, event: string | null, mdx: string | null) {


    cy.assertEventValue(eventWidgetId, event);

    if (mdx !== undefined) {

        cy.assertEventMdx(eventWidgetId, mdx);

    }

}


describe("Drilldown/Drilldowns Charts", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Drilldown/Drilldowns Charts");
        cy.waitForQueryCount(4);
    });

    it("ww6: User Select Drilldown", () => {

        let queryCount = 4;

        const widgetId = "ww6";
        const eventWidgetId = "ww13";

        assertChartDrilldown(widgetId, eventWidgetId, YEARS, null, null)

        selectChart(widgetId, YEARS_AS_CHILD_NO["2018"]);
        cy.clickDrilldownMenu(widgetId, ["Geography", "Continent", "Members"]);
        cy.waitForQueryCount(++queryCount);
        assertChartDrilldown(widgetId, eventWidgetId, ["Africa", "Asia", "Europe", "North America", "Oceania", "South America"], "2018", "[Time].[Time].[Year].&[2018-01-01]");
        assertChartDrilldownEvent("ww5", "2018", "([Time].[Time].[Year].&[2018-01-01])")

        selectChart(widgetId, 2 /* Europe */);
        cy.clickDrilldownMenu(widgetId, [1, 3, 2]);
        cy.waitForQueryCount(++queryCount);
        assertChartDrilldown(widgetId, eventWidgetId, ["Personal", "Server", "Silver", "Gold", "Platinum"], "Europe", "[Geography].[Geography].[Continent].&[EU]");
        assertChartDrilldownEvent("ww5", "2018 > Europe", "([Time].[Time].[Year].&[2018-01-01],[Geography].[Geography].[Continent].&[EU])")

        cy.clickDrilldownBack(widgetId);
        cy.waitForQueryCount(++queryCount);
        assertChartDrilldownEvent("ww5", "2018", "([Time].[Time].[Year].&[2018-01-01])")

        cy.clickDrilldownBack(widgetId);
        cy.waitForQueryCount(++queryCount);
        assertChartDrilldownEvent("ww5", null, null)

    })

    it("ww3: Standard/Children Drilldown", () => {

        let queryCount = 4;

        const widgetId = "ww3";
        const eventWidgetId = "ww0";

        assertChartDrilldown(widgetId, eventWidgetId, YEARS, null, null)

        selectChart(widgetId, YEARS_AS_CHILD_NO["2018"]);
        cy.waitForQueryCount(++queryCount);
        assertChartDrilldown(widgetId, eventWidgetId, QUARTERS["2018"], "2018", "[Time].[Time].[Year].&[2018-01-01]");
        assertChartDrilldownEvent("ww1", "2018", "([Time].[Time].[Year].&[2018-01-01])")

        cy.clickDrilldownBack(widgetId);
        cy.waitForQueryCount(++queryCount);
        assertChartDrilldown(widgetId, eventWidgetId, YEARS, "2018", "[Time].[Time].[Year].&[2018-01-01]");
        assertChartDrilldownEvent("ww1", null, null)

        // deeper

        selectChart(widgetId, YEARS_AS_CHILD_NO["2018"]);
        cy.waitForQueryCount(++queryCount);
        assertChartDrilldown(widgetId, eventWidgetId, QUARTERS["2018"], "2018", "[Time].[Time].[Year].&[2018-01-01]");
        assertChartDrilldownEvent("ww1", "2018", "([Time].[Time].[Year].&[2018-01-01])")

        selectChart(widgetId, QUARTERS_AS_CHILD_NO["2018 Q1"]);
        cy.waitForQueryCount(++queryCount);
        assertChartDrilldown(widgetId, eventWidgetId, MONTHS["2018 Q1"], "2018 Q1", "[Time].[Time].[Quarter].&[2018-01-01]");
        assertChartDrilldownEvent("ww1", "2018 > 2018 Q1", "([Time].[Time].[Year].&[2018-01-01],[Time].[Time].[Quarter].&[2018-01-01])")

        selectChart(widgetId, MONTHS_AS_CHILD_NO["2018 Jan"]);
        cy.waitForQueryCount(++queryCount);
        assertChartDrilldown(widgetId, eventWidgetId, DAYS["2018 Jan"], "2018 Jan", "[Time].[Time].[Month].&[2018-01-01]");
        assertChartDrilldownEvent("ww1", "2018 > 2018 Q1 > 2018 Jan", "([Time].[Time].[Year].&[2018-01-01],[Time].[Time].[Quarter].&[2018-01-01],[Time].[Time].[Month].&[2018-01-01])")

        selectChart(widgetId, DAYS_AS_CHILD_NO["1 Jan 2018"], "listitem");
        cy.waitForQueryCount(queryCount);
        assertChartDrilldown(widgetId, eventWidgetId, DAYS["2018 Jan"], "1 Jan 2018", "[Time].[Time].[Day].&[2018-01-01]");

        // back to the years

        cy.clickDrilldownBack(widgetId);
        cy.waitForQueryCount(++queryCount);
        assertChartDrilldownEvent("ww1", "2018 > 2018 Q1", "([Time].[Time].[Year].&[2018-01-01],[Time].[Time].[Quarter].&[2018-01-01])")

        cy.clickDrilldownBack(widgetId);
        cy.waitForQueryCount(++queryCount);
        assertChartDrilldownEvent("ww1", "2018", "([Time].[Time].[Year].&[2018-01-01])")

        cy.clickDrilldownBack(widgetId);
        cy.waitForQueryCount(++queryCount);
        assertChartDrilldownEvent("ww1", null, null)

        assertChartDrilldown(widgetId, eventWidgetId, YEARS, "1 Jan 2018", "[Time].[Time].[Day].&[2018-01-01]");
    })

    it("ww2: User Defined Drilldown", () => {

        let queryCount = 4;

        const widgetId = "ww2";
        const eventWidgetId = "ww10";

        assertChartDrilldown(widgetId, eventWidgetId, YEARS, null, null)

        selectChart(widgetId, YEARS_AS_CHILD_NO["2018"]);
        cy.waitForQueryCount(++queryCount);
        assertChartDrilldown(widgetId, eventWidgetId, ARTICLES["2018"], "2018", "[Time].[Time].[Year].&[2018-01-01]");
        assertChartDrilldownEvent("ww4", "2018", "([Time].[Time].[Year].&[2018-01-01])")

        cy.clickDrilldownBack(widgetId);
        cy.waitForQueryCount(++queryCount);
        assertChartDrilldown(widgetId, eventWidgetId, YEARS, "2018", "[Time].[Time].[Year].&[2018-01-01]");
        assertChartDrilldownEvent("ww1", null, null)

        // deeper

        cy.log("select:2018")
        selectChart(widgetId, YEARS_AS_CHILD_NO["2018"]);
        cy.waitForQueryCount(++queryCount);
        assertChartDrilldown(widgetId, eventWidgetId, ARTICLES["2018"], "2018", "[Time].[Time].[Year].&[2018-01-01]");
        assertChartDrilldownEvent("ww4", "2018", "([Time].[Time].[Year].&[2018-01-01])")

        cy.log("select:Server")
        selectChart(widgetId, ARTICLES_AS_CHILD_NO["Server"]);
        cy.waitForQueryCount(++queryCount);
        assertChartDrilldown(widgetId, eventWidgetId, CONTINENTS["Server"], "Server", "[Product].[Product].[Article].&[2]");
        assertChartDrilldownEvent("ww4", "2018 > Server", "([Time].[Time].[Year].&[2018-01-01],[Product].[Product].[Article].&[2])")

        cy.log("select:Asia")
        selectChart(widgetId, CONTINENTS_AS_CHILD_NO["Asia"]);
        cy.waitForQueryCount(++queryCount) /* guess because of user-defined */;
        assertChartDrilldown(widgetId, eventWidgetId, CONTINENTS["Server"], "Asia", "[Geography].[Geography].[Continent].&[AS]");
        assertChartDrilldownEvent("ww4", "2018 > Server > Asia", "([Time].[Time].[Year].&[2018-01-01],[Product].[Product].[Article].&[2],[Geography].[Geography].[Continent].&[AS])")

        // ensure all filterby are fine
        cy.clickUserMenuShowData(widgetId);
        cy.assertShowDataTableCellContent(widgetId, 1, 1, "€100,000")
        cy.clickUserMenuShowData(widgetId);

        // back to the years
        cy.log("back:years")

        cy.clickDrilldownLevel(widgetId, 0);
        cy.waitForQueryCount(++queryCount);

        assertChartDrilldown(widgetId, eventWidgetId, YEARS, "Asia", "[Geography].[Geography].[Continent].&[AS]");
    })

    it("ww15: Transformations", () => {

        let queryCount = 4;

        const widgetId = "ww15";
        const eventWidgetId = "ww17";

        const YEARS_EX = YEARS.map(y => "Y:" + y);

        assertChartYAxis(widgetId, YEARS_EX);
        assertChartValueLabels(widgetId, YEARS_EX);

        const QUARTERS_EX = {
            "2018": QUARTERS["2018"].map(y => "Y:" + y)
        }

        selectChart(widgetId, YEARS_AS_CHILD_NO["2018"]);
        cy.waitForQueryCount(++queryCount);
        assertChartYAxis(widgetId, QUARTERS_EX["2018"]);
        assertChartValueLabels(widgetId, QUARTERS_EX["2018"]);

        cy.clickDrilldownBack(widgetId);
        cy.waitForQueryCount(++queryCount);
        assertChartYAxis(widgetId, YEARS_EX);
        assertChartValueLabels(widgetId, YEARS_EX);
    })

});
