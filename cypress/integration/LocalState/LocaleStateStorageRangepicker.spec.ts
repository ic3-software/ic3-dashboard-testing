import {DateUtils} from "../Filters/DateUtils";

describe("Local State/Range picker", () => {

    const today = new Date();
    const todayMinus6 = new Date(today.getFullYear(), today.getMonth(), today.getDay() - 6);  // like first day of month minus one day

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