export {};


describe("Filters/DatePicker Query", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/DatePicker Query", true, false);
        cy.waitForQueryCount(4);
    });

    it("ww0: Date Picker - hierarchy", () => {
        cy.assertDatePickerRangeFrom("ww0", "5 Aug 2019");
        cy.assertDatePickerRangeTo("ww0", "11 Oct 2033");
    });

    it("ww1: Date Picker - measures", () => {
        cy.assertDatePickerRangeFrom("ww1", "5 Aug 2019");
        cy.assertDatePickerRangeTo("ww1", "11 Oct 2033");
    });

    it("ww2: Date Picker - multiple hierarchies", () => {
        cy.assertDatePickerRangeFrom("ww2", "5 Aug 2019");
        cy.assertDatePickerRangeTo("ww2", "4 Jan 2025");
    });

    it("ww3: Date Picker - two dates levels", () => {
        cy.assertDatePickerRangeFrom("ww3", "1 Jan 2020");
        cy.assertDatePickerRangeTo("ww3", "31 Mar 2023");
    });

    it("ww4: Date Picker - csv", () => {
        cy.assertDatePickerRangeFrom("ww4", "1 Jan 2020");
        cy.assertDatePickerRangeTo("ww4", "31 Jan 2020");
    });

});
