export {};


describe("Selection/Filter By and Selection", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("GitHub/680 - Charts loosing selection");
        cy.waitForQueryCount(2);
    });

    it("ww0: check interconnection", () => {

        const chart0 = "ww1";
        const table1 = "ww0";

        const event0 = "ww2";
        const event1 = "ww3";

        cy.clickTableCell(table1, 0, 0);  // 2018
        cy.waitForQueryCount(3);
        cy.assertEventValue(event1, "2018");
        cy.assertTableSingleRowSelected(table1, 0, 4);

        cy.selectSingleChartBarInGroup(chart0, 0, 1);
        cy.waitForQueryCount(4);
        cy.assertEventValue(event0, "Europe");
        cy.assertSelectedSingleChartBarInGroup(chart0, 0, 1);


        // Click asia
        cy.selectSingleChartBarInGroup(chart0, 0, 0);
        cy.waitForQueryCount(5);
        cy.assertEventValue(event0, "Asia");
        cy.assertSelectedSingleChartBarInGroup(chart0, 0, 0);
        cy.assertTableSingleRowSelected(table1, 0, 4);


        // click in the table and check that the selection in the chart is stil there
        cy.clickTableCell(table1, 1, 0);  // 2019
        cy.waitForQueryCount(6);
        cy.assertEventValue(event1, "2019");
        cy.assertTableSingleRowSelected(table1, 1, 4);
        cy.assertSelectedSingleChartBarInGroup(chart0, 0, 1);


        // unselect chart
        cy.selectSingleChartBarInGroup(chart0, 0, 1);
        cy.waitForQueryCount(7);
        cy.assertEventValue(event0, "");
        cy.assertTableSingleRowSelected(table1, 1, 4);


        cy.clickTableCell(table1, 1, 0);  // 2019
        cy.waitForQueryCount(8);
        cy.assertEventValue(event1, "");
        cy.assertTableSingleRowSelected(table1, -1, 4);


    });


});
