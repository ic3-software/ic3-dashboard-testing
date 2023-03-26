export {};

function assertDate(widgetId: string, eventWidgetId: string, tableWidgetId: string, date: string | null, event: string | null, mdx: string | null) {

    cy.assertDatePicker(widgetId, date);

    cy.assertEventValue(eventWidgetId, event);
    cy.assertEventMdx(eventWidgetId, mdx);

    if (!event) {

        cy.getWidget(tableWidgetId, "data-cy-waiting");

    } else {

        if (event.startsWith("0")) {
            cy.assertTableValue(tableWidgetId, 0, 0, event.substr(1));
        } else {
            cy.assertTableValue(tableWidgetId, 0, 0, event);
        }

    }


}

function mdx(date: string): string {
    return `[Time].[Time].[Day].&[${date}]`;
}

function dateEvent(date: Date): string {

    const y = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(date);
    const m = new Intl.DateTimeFormat('en', {month: 'short'}).format(date);
    const d = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(date);

    return `${d} ${m} ${y}`;

}

function dateMdx(date: Date): string {


    const y = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(date);
    const m = new Intl.DateTimeFormat('en', {month: '2-digit'}).format(date);
    const d = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(date);

    return `${y}-${m}-${d}`;

}

describe("Filters/DatePicker Behavior", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/DatePicker Behavior", true, false);
        cy.waitForQueryCount(6);
    });

    it("ww0: Date Picker", () => {

        let queryCount = 6;

        const widgetId = "ww0";
        const eventWidgetId = "ww1";
        const tableWidgetId = "ww2";

        assertDate(widgetId, eventWidgetId, tableWidgetId, null, null, null);

        // Intermediate input values are not triggered (=> asserted by a single query being sent)
        cy.selectDatePickerFromInput(widgetId, "01 Sep 2021");
        cy.waitForQueryCount(++queryCount);
        assertDate(widgetId, eventWidgetId, tableWidgetId, "01 Sep 2021", "01 Sep 2021", mdx("2021-09-01"));

        cy.selectDatePickerFromInput(widgetId, "03 Sep 2021");
        cy.waitForQueryCount(++queryCount);
        assertDate(widgetId, eventWidgetId, tableWidgetId, "03 Sep 2021", "03 Sep 2021", mdx("2021-09-03"));

    });

    it("ww4: Date Picker with Default Date", () => {

        const widgetId = "ww4";
        const eventWidgetId = "ww5";
        const tableWidgetId = "ww6";

        const today = new Date();
        const initial = new Date(today.setDate(today.getDate() - 7));

        assertDate(widgetId, eventWidgetId, tableWidgetId, dateEvent(initial), dateEvent(initial), mdx(dateMdx(initial)));

    });

    it("ww8: Date Picker with Bounds", () => {

        let queryCount = 6;

        const widgetId = "ww8";
        const eventWidgetId = "ww9";
        const tableWidgetId = "ww10";

        const today = new Date();
        today.setFullYear(today.getFullYear() - 3);

        const from = new Date(today.getTime())
        from.setDate(from.getDate() - 7);

        const to = new Date(today.getTime());
        to.setDate(to.getDate() + 7);

        cy.log("date-today:" + dateEvent(today));
        cy.selectDatePickerFromInput(widgetId, dateEvent(today));
        cy.waitForQueryCount(++queryCount);
        assertDate(widgetId, eventWidgetId, tableWidgetId, dateEvent(today), dateEvent(today), mdx(dateMdx(today)));

        cy.log("date-from:" + dateEvent(from));
        cy.selectDatePickerFromInput(widgetId, dateEvent(from));
        cy.waitForQueryCount(++queryCount);
        assertDate(widgetId, eventWidgetId, tableWidgetId, dateEvent(from), dateEvent(from), mdx(dateMdx(from)));

        cy.log("date-to:" + dateEvent(to));
        cy.selectDatePickerFromInput(widgetId, dateEvent(to));
        cy.waitForQueryCount(++queryCount);
        assertDate(widgetId, eventWidgetId, tableWidgetId, dateEvent(to), dateEvent(to), mdx(dateMdx(to)));

        {
            const invalid = new Date(from.getTime());
            invalid.setDate(invalid.getDate() - 1);

            cy.log("invalid-date:" + dateEvent(invalid));
            cy.selectDatePickerFromInput(widgetId, dateEvent(invalid));

            assertDate(widgetId, eventWidgetId, tableWidgetId, dateEvent(invalid), null, null);

        }

        {
            const invalid = new Date(to.getTime());
            invalid.setDate(invalid.getDate() + 1);

            cy.log("invalid-date:" + dateEvent(invalid));
            cy.selectDatePickerFromInput(widgetId, dateEvent(invalid));

            assertDate(widgetId, eventWidgetId, tableWidgetId, dateEvent(invalid), null, null);
        }
    });

    it("ww12: Date Picker", () => {

        let queryCount = 6;

        const widgetId = "ww12";
        const eventWidgetId = "ww13";
        const tableWidgetId = "ww14";

        assertDate(widgetId, eventWidgetId, tableWidgetId, null, null, null);

        // Intermediate input values are not triggered (=> asserted by a single query being sent)
        cy.selectDatePickerFromInput(widgetId, "01/09/2021");
        cy.waitForQueryCount(++queryCount);
        assertDate(widgetId, eventWidgetId, tableWidgetId, "01/09/2021", "01 Sep 2021", mdx("2021-09-01"));

    });

    it("ww16: No Query", () => {

        let queryCount = 7;

        const widgetId = "ww16";
        const eventWidgetId = "ww17";
        const tableWidgetId = "ww18";

        const initial = "15 Sep 2020";

        cy.selectDatePickerFromInput(widgetId, initial);
        cy.waitForQueryCount(queryCount);
        assertDate(widgetId, eventWidgetId, tableWidgetId, initial, initial, mdx("2020-09-15"));

        const from = "01 Sep 2020";

        cy.selectDatePickerFromInput(widgetId, from);
        cy.waitForQueryCount(++queryCount);
        assertDate(widgetId, eventWidgetId, tableWidgetId, from, from, mdx("2020-09-01"));

        const to = "30 Sep 2020";

        cy.selectDatePickerFromInput(widgetId, to);
        cy.waitForQueryCount(++queryCount);
        assertDate(widgetId, eventWidgetId, tableWidgetId, to, to, mdx("2020-09-30"));

    });

});
