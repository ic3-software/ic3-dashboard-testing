import {DateUtils} from "./DateUtils";

export {};

describe("Filters/DatePicker Range Event", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Date Picker Edge Cases", true, false);
        cy.waitForQueryCount(10);
    });

    it("ww0: range single level", () => {

        const from = new Date(2017, 0, 4);
        const to = new Date(2017, 0, 10);
        const table = "ww2";
        const picker = "ww0";

        cy.assertDatePickerRangeFrom(picker, DateUtils.dateEvent(from));
        cy.assertDatePickerRangeTo(picker, DateUtils.dateEvent(to));

        cy.assertTableRowCount(table, 1);
        cy.assertTableValue(table, 0, 0, "2017-01-10");

    });

    it("ww3: two levels single picker", () => {

        const table1 = "ww5";
        const table2 = "ww6";
        const picker = "ww3";

        cy.assertDatePicker(picker, "1 Feb 2007");

        cy.assertWidgetNoData(table1);
        cy.assertWidgetNoData(table2);

    });

    it("ww7: two levels range picker", () => {

        const table1 = "ww9";
        const table2 = "ww10";
        const picker = "ww7";

        cy.assertDatePickerRangeFrom(picker, DateUtils.dateEvent(new Date(2016, 0, 1)));
        cy.assertDatePickerRangeTo(picker, DateUtils.dateEvent(new Date(2017, 0, 1)));

        cy.assertWidgetNoData(table1);
        cy.assertWidgetNoData(table2);

    });

    it("ww11: two levels range picker", () => {

        const table = "ww13";
        const picker = "ww11";

        cy.assertDatePicker(picker, "1 Jan 2002");

        cy.assertWidgetNoData(table);

    });

});
