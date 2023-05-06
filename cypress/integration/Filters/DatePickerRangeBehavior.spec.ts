export {};

function assertDates(widgetId: string, eventWidgetId: string, tableWidgetId: string, dateF: string | null, eventF: string | null, mdxF: string | null, dateT: string | null, eventT: string | null, mdxT: string | null) {

    cy.assertDatePickerRangeFrom(widgetId, dateF);
    cy.assertDatePickerRangeTo(widgetId, dateT);

    const event = (eventF || eventT) ? (Cypress.migrateDate(eventF) + " - " + Cypress.migrateDate(eventT)) : null;
    const mdx = (mdxF || mdxT) ? ("{" + mdxF + ":" + mdxT + "}") : null;

    cy.assertEventValue(eventWidgetId, event);
    cy.assertEventMdx(eventWidgetId, mdx);

    if (!eventF && !eventT) {

        cy.getWidget(tableWidgetId, "data-cy-waiting");

    } else if (eventF) {

        if (eventF.startsWith("0")) {
            cy.assertTableValue(tableWidgetId, 0, 0, eventF.substring(1));
        } else {
            cy.assertTableValue(tableWidgetId, 0, 0, eventF);
        }

    } else if (eventT) {

        if (eventT.startsWith("0")) {
            cy.assertTableValue(tableWidgetId, 1, 0, eventT.substring(1));
        } else {
            cy.assertTableValue(tableWidgetId, 1, 0, eventT);
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
        cy.openViewerTestReport("Filters/DatePicker Range Behavior", true, false);
        cy.waitForQueryCount(5);
    });

    it("ww0: Date Picker", () => {

        let queryCount = 5;

        const widgetId = "ww0";
        const eventWidgetId = "ww1";
        const tableWidgetId = "ww2";

        assertDates(widgetId, eventWidgetId, tableWidgetId,
            null, null, null,
            null, null, null
        );

        // Intermediate input values are not triggered (=> asserted by a single query being sent)
        cy.selectDatePickerRangeFromFromInput(widgetId, "01 Sep 2021");
        cy.selectDatePickerRangeToFromInput(widgetId, "07 Sep 2021");
        cy.waitForQueryCount(++queryCount);
        assertDates(widgetId, eventWidgetId, tableWidgetId,
            "01 Sep 2021", "01 Sep 2021", mdx("2021-09-01"),
            "07 Sep 2021", "07 Sep 2021", mdx("2021-09-07")
        );
    });

    it("ww4: Date Picker with Default Date", () => {

        const widgetId = "ww4";
        const eventWidgetId = "ww5";
        const tableWidgetId = "ww6";

        const today = new Date();

        const from = new Date(today.getTime())
        from.setDate(from.getDate() - 7);

        const to = new Date(today.getTime());
        to.setDate(to.getDate() + 7);

        assertDates(widgetId, eventWidgetId, tableWidgetId,
            dateEvent(from), dateEvent(from), mdx(dateMdx(from)),
            dateEvent(to), dateEvent(to), mdx(dateMdx(to))
        );

    });

    it("ww12: Date Picker with Partial Default", () => {

        const widgetId = "ww12";
        const eventWidgetId = "ww13";
        const tableWidgetId = "ww14";

        const today = new Date();

        const from = new Date(today.getTime())
        from.setDate(from.getDate() - 7);

        assertDates(widgetId, eventWidgetId, tableWidgetId,
            dateEvent(from), null, null,
            null, null, null
        );

    });

    it("ww8: Date Picker with Bound", () => {

        let queryCount = 5;

        const widgetId = "ww8";
        const eventWidgetId = "ww9";
        const tableWidgetId = "ww10";

        const today = new Date();

        const from = new Date(today.getTime())
        from.setDate(from.getDate() - 7);

        const to = new Date(today.getTime());
        to.setDate(to.getDate() + 7);

        assertDates(widgetId, eventWidgetId, tableWidgetId,
            null, null, null,
            null, null, null
        );

        cy.log("date-from:" + dateEvent(from));
        cy.selectDatePickerRangeFromFromInput(widgetId, dateEvent(from));
        assertDates(widgetId, eventWidgetId, tableWidgetId,
            dateEvent(from), null, null,
            null, null, null
        );

        cy.log("date-to:" + dateEvent(to));
        cy.selectDatePickerRangeToFromInput(widgetId, dateEvent(to));
        cy.waitForQueryCount(++queryCount);
        assertDates(widgetId, eventWidgetId, tableWidgetId,
            dateEvent(from), dateEvent(from), mdx(dateMdx(from)),
            dateEvent(to), dateEvent(to), mdx(dateMdx(to))
        );

        {
            const invalid = new Date(from.getTime());
            invalid.setDate(invalid.getDate() - 1);

            cy.log("a-invalid-date:" + dateEvent(invalid));
            cy.selectDatePickerRangeFromFromInput(widgetId, dateEvent(invalid));
            cy.waitForQueryCount(queryCount);

            assertDates(widgetId, eventWidgetId, tableWidgetId,
                dateEvent(invalid), dateEvent(from), mdx(dateMdx(from)) /* input clear'd */,
                dateEvent(to), dateEvent(to), mdx(dateMdx(to)) /* input clear'd */
            );
        }

        // cy.selectDatePickerRangeFromFromInput(widgetId, dateEvent(from));
        // cy.waitForQueryCount(queryCount);
        // assertDates(widgetId, eventWidgetId, tableWidgetId,
        //     dateEvent(from), dateEvent(from), mdx(dateMdx(from)),
        //     dateEvent(to), dateEvent(to), mdx(dateMdx(to))
        // );
        //
        // {
        //     const invalid = new Date(to.getTime());
        //     invalid.setDate(invalid.getDate() + 1);
        //
        //     cy.log("b-invalid-date:" + dateEvent(invalid));
        //     cy.selectDatePickerRangeToFromInput(widgetId, dateEvent(invalid));
        //     cy.waitForQueryCount(queryCount);
        //
        //     assertDates(widgetId, eventWidgetId, tableWidgetId,
        //         dateEvent(from), dateEvent(from), mdx(dateMdx(from)),
        //         dateEvent(to), dateEvent(to), mdx(dateMdx(to))
        //     );
        // }

    });


});
