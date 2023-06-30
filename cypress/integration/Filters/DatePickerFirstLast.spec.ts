import {DateUtils} from "./DateUtils";

export {};

function assertDate(widgetId: string, eventWidgetId: string, date: string | null, event: string | null, mdx: string | null) {

    cy.assertDatePicker(widgetId, date);

    cy.assertDateEventValue(eventWidgetId, event);
    cy.assertEventMdx(eventWidgetId, mdx);

}

function assertDateRange(widgetId: string, eventWidgetId: string, dateF: string | null, dateT: string | null, event: string | null, mdx: string | null) {
    cy.assertDatePickerRangeFrom(widgetId, dateF);
    cy.assertDatePickerRangeTo(widgetId, dateT);
    cy.assertEventValue(eventWidgetId, event);
    cy.assertEventMdx(eventWidgetId, mdx);
}

describe("Filters/DatePicker First Last", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/DatePicker First Last", true, false);
        cy.waitForQueryCount(4);
    });

    it("ww0: Date Picker - first", () => {

        const widgetId = "ww0";
        const eventWidgetId = "ww1";
        assertDate(widgetId, eventWidgetId, "5 Aug 2019", "5 Aug 2019", DateUtils.mdxFromDate(new Date(2019, 7, 5)));

    });

    it("ww0: Date Picker - last", () => {

        const widgetId = "ww4";
        const eventWidgetId = "ww5";
        assertDate(widgetId, eventWidgetId, "11 Oct 2033", "11 Oct 2033", DateUtils.mdxFromDate(new Date(2033, 9, 11)));

    });

    it("ww0: Range Picker - first", () => {

        const widgetId = "ww2";
        const eventWidgetId = "ww3";
        assertDateRange(widgetId, eventWidgetId, "05 Aug 2019", "05 Aug 2019", "5 Aug 2019 - 5 Aug 2019", DateUtils.rangeMdx(new Date(2019, 7, 5), new Date(2019, 7, 5)));

    });

    it("ww0: Range Picker - last", () => {

        const widgetId = "ww6";
        const eventWidgetId = "ww7";
        assertDateRange(widgetId, eventWidgetId, "10 Jul 2022", "11 Oct 2033", "10 Jul 2022 - 11 Oct 2033", DateUtils.rangeMdx(new Date(2022, 6, 10), new Date(2033, 9, 11)));

    });

});
