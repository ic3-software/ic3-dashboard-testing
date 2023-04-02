export {};

function checkInitialSelection() {
    cy.assertTableRowCount("ww8", 2)
    cy.assertButtonSelected("ww9", "Africa");
    cy.assertButtonsSelected("ww10", ["Q1", "Q2", "Q3", "Q4"]);
    cy.assertButtonsSelected("ww0", ["Silver", "Gold"]);
    cy.assertCheckboxSelected("ww2", "Personal", "Platinum");
    cy.assertDatePickerRangeFrom("ww3", "02 Apr 2022")
    cy.assertDatePickerRangeTo("ww3", "15 Sep 2022")
    cy.assertDropdownMultiSelection("ww5", ["AQ946SWPKEUDA", "AQ039PRYWTZEZ"])
    cy.assertTreeSelection("ww7", "control-icons", ["2018 Apr", "2018 May"])
    cy.assertDropdownMultiSelection("ww4", ["Personal", "Server", "Platinum"])
    cy.assertSliderSelected("ww6", "North America", "Oceania", "South America")
    cy.assertFilterPanelCount("ww12", 1)
}

function checkEmpty() {
    cy.assertTableRowCount("ww8", 4);
    cy.assertButtonsSelected("ww9");
    cy.assertButtonsSelected("ww10");
    cy.assertButtonsSelected("ww0");
    cy.assertCheckboxSelected("ww2");
    cy.assertDatePickerRangeFrom("ww3", "")
    cy.assertDatePickerRangeTo("ww3", "")
    cy.assertDropdownMultiSelection("ww5", [])
    cy.assertDropdownMultiSelection("ww4", [])
    cy.assertTreeSelection("ww7", "control-icons", [])
    cy.assertSliderSelected("ww6",)
    cy.assertFilterPanelCount("ww12", 0)
}

describe("Filters/ApplicationNotificationsAllFilters", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/ApplicationNotificationsAllFilters", true, false);
        cy.waitForQueryCount(11);
    });

    it("ww0: check clear selection", () => {

        checkInitialSelection();

        cy.selectButton("ww11", "Clear Selection");

        checkEmpty();

        cy.selectButton("ww11", "Reset Selection");

        checkInitialSelection();


    });

});
