import {DateUtils} from "../Filters/DateUtils";

describe("Local State/Range picker", () => {

    const today = new Date();
    const todayMinus6 = new Date();
    todayMinus6.setDate(today.getDate() - 6);


    const dashboard = "Local State/Range picker";
    const header = "Range Picker " + DateUtils.dateMdx(todayMinus6) + " " + DateUtils.dateMdx(today) + " ";
    const wid = "ww3";

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);
        cy.clearAllLocalStorage();
    });

    it("Save/Restore State", () => {

        cy.log("Date today " + today)
        cy.log("Date -6 " + todayMinus6)
        // First create the state
        cy.datePickerChooseShortcut(wid, "Last 7 days");

        // Assert the state
        cy.assertWidgetHeader(wid, header);

        // Then refresh page
        cy.openViewerTestReport(dashboard);
        cy.waitForQueryCount(1);

        // Assert state is kept
        cy.assertWidgetHeader(wid, header);

    });

});