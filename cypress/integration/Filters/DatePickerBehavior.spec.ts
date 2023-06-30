import {DateUtils} from "./DateUtils";

export {};

function assertDate(widgetId: string, eventWidgetId: string, tableWidgetId: string, date: string | null, event: string | null, mdx: string | null) {

    cy.assertDatePicker(widgetId, date);

    cy.assertDateEventValue(eventWidgetId, event);
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
        assertDate(widgetId, eventWidgetId, tableWidgetId, "01 Sep 2021", "01 Sep 2021", DateUtils.mdx("DateTime(2021,9,1)"));

        cy.selectDatePickerFromInput(widgetId, "03 Sep 2021");
        cy.waitForQueryCount(++queryCount);
        assertDate(widgetId, eventWidgetId, tableWidgetId, "03 Sep 2021", "03 Sep 2021", DateUtils.mdx("DateTime(2021,9,3)"));

    });

    it("ww4: Date Picker with Default Date", () => {

        const widgetId = "ww4";
        const eventWidgetId = "ww5";
        const tableWidgetId = "ww6";

        const today = new Date();
        const initial = new Date(today.setDate(today.getDate() - 7));

        assertDate(widgetId, eventWidgetId, tableWidgetId, DateUtils.dateEvent(initial), DateUtils.dateEvent(initial), DateUtils.mdx(DateUtils.dateMdx(initial)));

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

        cy.log("date-today:" + DateUtils.dateEvent(today));
        cy.selectDatePickerFromInput(widgetId, DateUtils.dateEvent(today));
        cy.waitForQueryCount(++queryCount);
        assertDate(widgetId, eventWidgetId, tableWidgetId, DateUtils.dateEvent(today), DateUtils.dateEvent(today), DateUtils.mdx(DateUtils.dateMdx(today)));

        cy.log("date-from:" + DateUtils.dateEvent(from));
        cy.selectDatePickerFromInput(widgetId, DateUtils.dateEvent(from));
        cy.waitForQueryCount(++queryCount);
        assertDate(widgetId, eventWidgetId, tableWidgetId, DateUtils.dateEvent(from), DateUtils.dateEvent(from), DateUtils.mdx(DateUtils.dateMdx(from)));

        cy.log("date-to:" + DateUtils.dateEvent(to));
        cy.selectDatePickerFromInput(widgetId, DateUtils.dateEvent(to));
        cy.waitForQueryCount(++queryCount);
        assertDate(widgetId, eventWidgetId, tableWidgetId, DateUtils.dateEvent(to), DateUtils.dateEvent(to), DateUtils.mdx(DateUtils.dateMdx(to)));

        {
            const invalid = new Date(from.getTime());
            invalid.setDate(invalid.getDate() - 1);

            cy.log("invalid-date:" + DateUtils.dateEvent(invalid));
            cy.selectDatePickerFromInput(widgetId, DateUtils.dateEvent(invalid));

            assertDate(widgetId, eventWidgetId, tableWidgetId, DateUtils.dateEvent(invalid), DateUtils.dateEvent(to), DateUtils.mdx(DateUtils.dateMdx(to)));

        }

        {
            const invalid = new Date(to.getTime());
            invalid.setDate(invalid.getDate() + 1);

            cy.log("invalid-date:" + DateUtils.dateEvent(invalid));
            cy.selectDatePickerFromInput(widgetId, DateUtils.dateEvent(invalid));

            assertDate(widgetId, eventWidgetId, tableWidgetId, DateUtils.dateEvent(invalid), DateUtils.dateEvent(to), DateUtils.mdx(DateUtils.dateMdx(to)));
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
        assertDate(widgetId, eventWidgetId, tableWidgetId, "01/09/2021", "01 Sep 2021", DateUtils.mdx("DateTime(2021,9,1)"));

    });

    it("ww16: No Query", () => {

        let queryCount = 6;

        const widgetId = "ww16";
        const eventWidgetId = "ww17";
        const tableWidgetId = "ww18";

        const initial = "15 Sep 2020";

        cy.selectDatePickerFromInput(widgetId, initial);
        cy.waitForQueryCount(queryCount);
        assertDate(widgetId, eventWidgetId, tableWidgetId, initial, initial, DateUtils.mdxOld("2020-09-15"));

        const from = "01 Sep 2020";

        cy.selectDatePickerFromInput(widgetId, from);
        cy.waitForQueryCount(++queryCount);
        assertDate(widgetId, eventWidgetId, tableWidgetId, from, from, DateUtils.mdxOld("2020-09-01"));

        const to = "30 Sep 2020";

        cy.selectDatePickerFromInput(widgetId, to);
        cy.waitForQueryCount(++queryCount);
        assertDate(widgetId, eventWidgetId, tableWidgetId, to, to, DateUtils.mdxOld("2020-09-30"));

    });

});
