import {DateUtils} from "./DateUtils";

export {};


describe("Filters/DatePicker Shortcuts", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/DatePicker Shortcuts", true, false);
        cy.waitForQueryCount(6);
    });

    it("ww0: Date Picker - last week", () => {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        cy.assertDatePicker("ww0", DateUtils.dateEvent(lastWeek));
    });

    it("ww1: Range Picker - last month", () => {
        const startOfMonth = new Date();
        startOfMonth.setMonth(startOfMonth.getMonth()-1);
        startOfMonth.setDate(1);
        const endOfMonth = new Date();
        endOfMonth.setDate(0);
        cy.assertDatePickerRangeFrom("ww1", DateUtils.dateEvent(startOfMonth));
        cy.assertDatePickerRangeTo("ww1", DateUtils.dateEvent(endOfMonth));
    });

    it("ww2: Date Picker - anchor last week", () => {
        cy.assertDatePicker("ww2", "27 Sep 2033");
    });

    it("ww3: Range Picker - anchor last month", () => {
        cy.assertDatePickerRangeFrom("ww3", "1 Sep 2033");
        cy.assertDatePickerRangeTo("ww3", "30 Sep 2033");
    });

    it("ww4: Date Picker - anchor query last week", () => {
        cy.assertDatePicker("ww4", "27 Nov 2022");
    });

    it("ww5: Range Picker - anchor query last month", () => {
        cy.assertDatePickerRangeFrom("ww5", "1 Nov 2022");
        cy.assertDatePickerRangeTo("ww5", "30 Nov 2022");
    });

});
