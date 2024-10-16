export {};

describe("Tables/Pivot Table Events", () => {

    const pivot = "ww0";
    const cellEvent = "ww7";
    const rowEvent = "ww2";
    const rowMemberEvent = "ww4";
    const colEvent = "ww5";
    const colMemberEvent = "ww6";

    function assertEventValues(vals: {
        cell?: { event: string, mdx: string }
        row?: { event: string, mdx: string }
        rowMember?: { event: string, mdx: string }
        col?: { event: string, mdx: string }
        colMember?: { event: string, mdx: string }
    }) {
        cy.assertEventValue(cellEvent, vals.cell?.event ?? "");
        cy.assertEventMdx(cellEvent, vals.cell?.mdx ?? "");
        cy.assertEventValue(rowEvent, vals.row?.event ?? "");
        cy.assertEventMdx(rowEvent, vals.row?.mdx ?? "");
        cy.assertEventValue(rowMemberEvent, vals.rowMember?.event ?? "");
        cy.assertEventMdx(rowMemberEvent, vals.rowMember?.mdx ?? "");
        cy.assertEventValue(colEvent, vals.col?.event ?? "");
        cy.assertEventMdx(colEvent, vals.col?.mdx ?? "");
        cy.assertEventValue(colMemberEvent, vals.colMember?.event ?? "");
        cy.assertEventMdx(colMemberEvent, vals.colMember?.mdx ?? "");
    }

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Pivot Table Events");
        cy.waitForQueryCount(1);

    })

    it("row-clicks", () => {

        // All empty
        assertEventValues({});

        cy.selectPivotTableLeftHeader(pivot, 0, 0);
        assertEventValues({
            row: {
                event: "2018, Business, France",
                mdx: "([Time].[Time].[Year].&[2018-01-01],[Customer].[Customer].[Type].&[BUSINESS],[Geography].[Geography].[Country].&[FR])"
            },
            rowMember: {event: "2018", mdx: "[Time].[Time].[Year].&[2018-01-01]"}
        });

        cy.selectPivotTableLeftHeader(pivot, 2, 2);
        assertEventValues({
            row: {
                event: "2018, Consumer, United States",
                mdx: "([Time].[Time].[Year].&[2018-01-01],[Customer].[Customer].[Type].&[CONSUMER],[Geography].[Geography].[Country].&[US])"
            },
            rowMember: {event: "United States", mdx: "[Geography].[Geography].[Country].&[US]"}
        });

        cy.selectPivotTableLeftHeader(pivot, 7, 1);
        assertEventValues({
            row: {
                event: "2019, Consumer, South Africa",
                mdx: "([Time].[Time].[Year].&[2019-01-01],[Customer].[Customer].[Type].&[CONSUMER],[Geography].[Geography].[Country].&[ZA])"
            },
            rowMember: {event: "Consumer", mdx: "[Customer].[Customer].[Type].&[CONSUMER]"}
        });

    });

    it("column-clicks", () => {

        // All empty
        assertEventValues({});

        cy.selectPivotTableTopHeader(pivot, 0, 0);
        assertEventValues({
            col: {event: "License, #Customers", mdx: "([Product].[Category].[Category].&[1],[Measures].[#Customers])"},
            colMember: {event: "License", mdx: "[Product].[Category].[Category].&[1]"}
        });

        cy.selectPivotTableTopHeader(pivot, 1, 1);
        assertEventValues({
            col: {event: "License, #Sales", mdx: "([Product].[Category].[Category].&[1],[Measures].[#Sales])"},
            colMember: {event: "#Sales", mdx: "[Measures].[#Sales]"}
        });

        cy.selectPivotTableTopHeader(pivot, 1, 2);
        assertEventValues({
            col: {event: "Support, #Customers", mdx: "([Product].[Category].[Category].&[2],[Measures].[#Customers])"},
            colMember: {event: "#Customers", mdx: "[Measures].[#Customers]"}
        });

    });

    it("cell-clicks", () => {

        // All empty
        assertEventValues({});

        cy.selectPivotTableCell(pivot, 0, 0);
        assertEventValues({
            cell: {
                event: "2018, Business, France, License, #Customers",
                mdx: "([Time].[Time].[Year].&[2018-01-01],[Customer].[Customer].[Type].&[BUSINESS],[Geography].[Geography].[Country].&[FR],[Product].[Category].[Category].&[1],[Measures].[#Customers])"
            },
            row: {
                event: "2018, Business, France",
                mdx: "([Time].[Time].[Year].&[2018-01-01],[Customer].[Customer].[Type].&[BUSINESS],[Geography].[Geography].[Country].&[FR])"
            },
            col: {event: "License, #Customers", mdx: "([Product].[Category].[Category].&[1],[Measures].[#Customers])"}
        });

        cy.selectPivotTableCell(pivot, 2, 2);
        assertEventValues({
            cell: {
                event: "2018, Consumer, United States, Support, #Customers",
                mdx: "([Time].[Time].[Year].&[2018-01-01],[Customer].[Customer].[Type].&[CONSUMER],[Geography].[Geography].[Country].&[US],[Product].[Category].[Category].&[2],[Measures].[#Customers])"
            },
            row: {
                event: "2018, Consumer, United States",
                mdx: "([Time].[Time].[Year].&[2018-01-01],[Customer].[Customer].[Type].&[CONSUMER],[Geography].[Geography].[Country].&[US])"
            },
            col: {event: "Support, #Customers", mdx: "([Product].[Category].[Category].&[2],[Measures].[#Customers])"}
        });

    });

});
