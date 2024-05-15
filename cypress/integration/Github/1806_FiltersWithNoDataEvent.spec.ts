function test(firstButtonFilter: string, table: string, noDataFilter: string, filterToTest: () => void,) {
    // start with the table waiting
    cy.assertWidgetWaiting(table);
    // click to generate the event we are waiting
    filterToTest();
    // assert the event is generated
    cy.assertTableRowCount(table, 1)
    // now we will remove data from the filter, MDX query of the filter returns empty
    cy.selectButton(firstButtonFilter, "Asia");
    // check the filter is in NoData state
    noDataFilter && cy.assertWidgetNoData(noDataFilter);
    // assert the table is waiting for event -> NoData generated a clear event
    cy.assertWidgetWaiting(table);
}

describe("Github/filters on NO DATA", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("GitHub/1806 - filters on NO DATA", true, false);
        cy.waitForQueryCount(10);
    });

    it("Dropdown", () => {

        // special one, ther is no 'No Data'
        test("ww6", "ww8", "", () => {
            cy.selectDropdownFromPopup("ww7", "Africa")
        });

        test("ww9", "ww11", "ww10", () => {
            cy.selectButton("ww10", "Africa")
        });

        test("ww12", "ww14", "ww1", () => {
            cy.selectCheckbox("ww1", "Africa");
        });

        test("ww0", "ww3", "ww2", () => {
            cy.selectSlider("ww2", "Africa");
        });

        test("ww4", "ww13", "ww5", () => {
            cy.selectTree("ww5", "control-icons", "Africa");
        });

    });

});


export {};
