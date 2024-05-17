import {DateUtils} from "./DateUtils";

export {};

function assertDate(widgetId: string, eventWidgetId: string, date: string | null, mdx: string) {

    cy.assertDatePicker(widgetId, date);

    cy.assertEventMdx(eventWidgetId, mdx);

}

function assertRange(widgetId: string, eventWidgetId: string, dateF: string | null, dateT: string | null, mdx: string) {

    cy.assertDatePickerRangeFrom(widgetId, dateF);
    cy.assertDatePickerRangeTo(widgetId, dateT);

    cy.assertEventMdx(eventWidgetId, mdx);

}

describe("Filters/DatePicker State", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Datepicker state", true, false);
        cy.waitForQueryCount(4);
    });

    it("ww0: Range Picker Show/Hide data", () => {

        const widgetId = "ww0";
        const eventWidgetId = "ww5";

        assertRange(widgetId, eventWidgetId, null, null, "");

        // TODO range picker Cypress test not working.
        // cy.selectDatePickerRangeFromFromInput(widgetId, "01 Sep 2021");
        // cy.selectDatePickerRangeToFromInput(widgetId, "07 Sep 2021");
        // assertRange(widgetId, eventWidgetId,
        //     "01 Sep 2021", "07 Sep 2021",
        //     "{[Time].[Time].lastLevel.&[2021-09-01]:[Time].[Time].lastLevel.&[2021-09-07]}"
        // );

        // Show then hide data to trigger state load from redux
        cy.clickUserMenuShowData(widgetId);
        cy.assertShowDataTableCellContent(widgetId, 0, 0, "");
        cy.assertShowDataTableCellContent(widgetId, 1, 0, "");
        cy.clickUserMenuShowData(widgetId);

        // TODO range picker Cypress test not working.
        // // Earlier selected date should remain
        // assertRange(widgetId, eventWidgetId,
        //     "01 Sep 2021", "07 Sep 2021",
        //     "{[Time].[Time].lastLevel.&[2021-09-01]:[Time].[Time].lastLevel.&[2021-09-07]}"
        // );

    });

    it("ww2: Range Picker Show/Hide data initial date", () => {

        const widgetId = "ww2";
        const eventWidgetId = "ww6";

        assertRange(widgetId, eventWidgetId, "05 Jan 2022", "15 Jan 2022", DateUtils.rangeMdx(new Date(2022, 0, 5), new Date(2022, 0, 15)));

        // TODO range picker Cypress test not working.
        // cy.selectDatePickerRangeFromFromInput(widgetId, "01 Sep 2021");
        // cy.selectDatePickerRangeToFromInput(widgetId, "07 Sep 2021");
        // assertRange(widgetId, eventWidgetId,
        //     "01 Sep 2021", "07 Sep 2021",
        //     "{[Time].[Time].lastLevel.&[2021-09-01]:[Time].[Time].lastLevel.&[2021-09-07]}"
        // );

        // Show then hide data to trigger state load from redux
        cy.clickUserMenuShowData(widgetId);
        cy.assertShowDataTableCellContent(widgetId, 0, 0, "2022-01-05");
        cy.assertShowDataTableCellContent(widgetId, 1, 0, "2022-01-15");
        cy.clickUserMenuShowData(widgetId);

        // TODO range picker Cypress test not working.
        // // Earlier selected date should remain
        // assertRange(widgetId, eventWidgetId,
        //     "01 Sep 2021", "07 Sep 2021",
        //     "{[Time].[Time].lastLevel.&[2021-09-01]:[Time].[Time].lastLevel.&[2021-09-07]}"
        // );

    });

    it("ww1: Date Picker Show/Hide data", () => {

        const widgetId = "ww1";
        const eventWidgetId = "ww7";

        assertDate(widgetId, eventWidgetId, null, "");

        cy.selectDatePickerFromInput(widgetId, "01 Sep 2021");
        assertDate(widgetId, eventWidgetId, "01 Sep 2021", "test.&[2021-09-01]");

        // Show then hide data to trigger state load from redux
        cy.clickUserMenuShowData(widgetId);
        cy.assertShowDataTableCellContent(widgetId, 0, 0, "2021-09-01");
        cy.clickUserMenuShowData(widgetId);

        // Earlier selected date should remain
        assertDate(widgetId, eventWidgetId, "01 Sep 2021", "test.&[2021-09-01]");

    });

    it("ww3: Date Picker Show/Hide data initial date", () => {

        const widgetId = "ww3";
        const eventWidgetId = "ww8";

        assertDate(widgetId, eventWidgetId, "04 Jan 2023", "test.&[2023-01-04]");

        cy.selectDatePickerFromInput(widgetId, "01 Sep 2021");
        assertDate(widgetId, eventWidgetId, "01 Sep 2021", "test.&[2021-09-01]");

        // Show then hide data to trigger state load from redux
        cy.clickUserMenuShowData(widgetId);
        cy.assertShowDataTableCellContent(widgetId, 0, 0, "2021-09-01");
        cy.clickUserMenuShowData(widgetId);

        // Earlier selected date should remain
        assertDate(widgetId, eventWidgetId, "01 Sep 2021", "test.&[2021-09-01]");

    });

});
