import {DateUtils} from "./DateUtils";
import {assertDates} from "./DatePickerAssertUtils";

export {};

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
            null, null
        );

        // Intermediate input values are not triggered (=> asserted by a single query being sent)
        cy.selectDatePickerRangeFromFromInput(widgetId, "01 Sep 2021");
        cy.selectDatePickerRangeToFromInput(widgetId, "07 Sep 2021");
        cy.waitForQueryCount(++queryCount);
        assertDates(widgetId, eventWidgetId, tableWidgetId,
            "01 Sep 2021", "01 Sep 2021",
            "07 Sep 2021", "07 Sep 2021", DateUtils.rangeMdx(new Date(2021, 8 /*Sep*/, 1), new Date(2021, 8 /*Sep*/, 7))
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
            DateUtils.dateEvent(from), DateUtils.dateEvent(from),
            DateUtils.dateEvent(to), DateUtils.dateEvent(to), DateUtils.rangeMdx(from, to)
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
            DateUtils.dateEvent(from), null, null,
            null, null
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
            null, null
        );

        cy.log("date-from:" + DateUtils.dateEvent(from));
        cy.selectDatePickerRangeFromFromInput(widgetId, DateUtils.dateEvent(from));
        assertDates(widgetId, eventWidgetId, tableWidgetId,
            DateUtils.dateEvent(from), null, null,
            null, null
        );

        cy.log("date-to:" + DateUtils.dateEvent(to));
        cy.selectDatePickerRangeToFromInput(widgetId, DateUtils.dateEvent(to));
        cy.waitForQueryCount(++queryCount);
        assertDates(widgetId, eventWidgetId, tableWidgetId,
            DateUtils.dateEvent(from), DateUtils.dateEvent(from),
            DateUtils.dateEvent(to), DateUtils.dateEvent(to), DateUtils.rangeMdx(from, to)
        );

        {
            const invalid = new Date(from.getTime());
            invalid.setDate(invalid.getDate() - 1);

            cy.log("a-invalid-date:" + DateUtils.dateEvent(invalid));
            cy.selectDatePickerRangeFromFromInput(widgetId, DateUtils.dateEvent(invalid));
            cy.waitForQueryCount(queryCount);

            assertDates(widgetId, eventWidgetId, tableWidgetId,
                DateUtils.dateEvent(invalid), DateUtils.dateEvent(from),
                DateUtils.dateEvent(to), DateUtils.dateEvent(to), DateUtils.rangeMdx(from, to /* input clear'd */)
            );
        }

        cy.selectDatePickerRangeFromFromInput(widgetId, DateUtils.dateEvent(from));
        cy.waitForQueryCount(queryCount);
        assertDates(widgetId, eventWidgetId, tableWidgetId,
            DateUtils.dateEvent(from), DateUtils.dateEvent(from),
            DateUtils.dateEvent(to), DateUtils.dateEvent(to), DateUtils.rangeMdx(from, to)
        );

        {
            const dateOutsideAllowedRange = new Date(to.getTime());
            dateOutsideAllowedRange.setDate(dateOutsideAllowedRange.getDate() + 1);

            cy.log("b-invalid-date:" + DateUtils.dateEvent(dateOutsideAllowedRange));
            cy.selectDatePickerRangeToFromInput(widgetId, DateUtils.dateEvent(dateOutsideAllowedRange));

            assertDates(widgetId, eventWidgetId, tableWidgetId,
                DateUtils.dateEvent(from), DateUtils.dateEvent(from),
                DateUtils.dateEvent(dateOutsideAllowedRange), DateUtils.dateEvent(to), DateUtils.rangeMdx(from, to)
            );
        }

    });


});
