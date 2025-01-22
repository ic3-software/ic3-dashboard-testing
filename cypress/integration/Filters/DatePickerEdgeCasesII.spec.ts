import {DateUtils} from "./DateUtils";
import {assertDate, assertDates} from "./DatePickerAssertUtils";

export {};

describe("Filters/DatePicker Edge Cases II", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/DatePicker Edge Cases II", true, false);
        cy.waitForQueryCount(4);
    });

    it("ww0: Date Picker - no data if outside range", () => {

        const widgetId = "ww0";
        const eventWidgetId = "ww1";
        const tableWidgetId = "ww2";

        assertDate(widgetId, eventWidgetId, tableWidgetId, null, null, null, "");

        // The range of allowed dates goes from 1 jan 2018 to 15 Sep 2022.
        cy.selectDatePickerFromInput(widgetId, "31 Dec 2017");
        assertDate(widgetId, eventWidgetId, tableWidgetId, "31 Dec 2017", "31 Dec 2017", DateUtils.mdx("DateTime(2017,12,31)"), "");
        cy.selectDatePickerFromInput(widgetId, "01 Jan 2018");
        assertDate(widgetId, eventWidgetId, tableWidgetId, "01 Jan 2018", "01 Jan 2018", DateUtils.mdx("DateTime(2018,1,1)"));
        cy.selectDatePickerFromInput(widgetId, "02 Jan 2018");
        assertDate(widgetId, eventWidgetId, tableWidgetId, "02 Jan 2018", "02 Jan 2018", DateUtils.mdx("DateTime(2018,1,2)"));

        cy.selectDatePickerFromInput(widgetId, "14 Sep 2022");
        assertDate(widgetId, eventWidgetId, tableWidgetId, "14 Sep 2022", "14 Sep 2022", DateUtils.mdx("DateTime(2022,9,14)"));
        cy.selectDatePickerFromInput(widgetId, "15 Sep 2022");
        assertDate(widgetId, eventWidgetId, tableWidgetId, "15 Sep 2022", "15 Sep 2022", DateUtils.mdx("DateTime(2022,9,15)"));
        cy.selectDatePickerFromInput(widgetId, "16 Sep 2022");
        assertDate(widgetId, eventWidgetId, tableWidgetId, "16 Sep 2022", "16 Sep 2022", DateUtils.mdx("DateTime(2022,9,16)"), "");

    });

    it("ww3: Date Picker - selecting edge of range", () => {

        const widgetId = "ww3";
        const eventWidgetId = "ww4";
        const tableWidgetId = "ww5";

        assertDate(widgetId, eventWidgetId, tableWidgetId, null, null, null, true);

        // The range of allowed dates goes from 1 jan 2018 to 15 Sep 2022.
        cy.selectDatePickerFromInput(widgetId, "31 Dec 2017");
        // Keeps old state since 31 Dec 2017 is not allowed.
        assertDate(widgetId, eventWidgetId, tableWidgetId, "31 Dec 2017", null, null);
        cy.selectDatePickerFromInput(widgetId, "01 Jan 2018");
        assertDate(widgetId, eventWidgetId, tableWidgetId, "01 Jan 2018", "01 Jan 2018", DateUtils.mdx("DateTime(2018,1,1)"));
        cy.selectDatePickerFromInput(widgetId, "02 Jan 2018");
        assertDate(widgetId, eventWidgetId, tableWidgetId, "02 Jan 2018", "02 Jan 2018", DateUtils.mdx("DateTime(2018,1,2)"));

        cy.selectDatePickerFromInput(widgetId, "14 Sep 2022");
        assertDate(widgetId, eventWidgetId, tableWidgetId, "14 Sep 2022", "14 Sep 2022", DateUtils.mdx("DateTime(2022,9,14)"));
        cy.selectDatePickerFromInput(widgetId, "15 Sep 2022");
        assertDate(widgetId, eventWidgetId, tableWidgetId, "15 Sep 2022", "15 Sep 2022", DateUtils.mdx("DateTime(2022,9,15)"));
        cy.selectDatePickerFromInput(widgetId, "16 Sep 2022");
        // Keeps old state since 16 Sep 2022 is not allowed.
        assertDate(widgetId, eventWidgetId, tableWidgetId, "16 Sep 2022", "15 Sep 2022", DateUtils.mdx("DateTime(2022,9,15)"));

    });

    it("ww6: Range Picker - no data if outside range", () => {

        const widgetId = "ww6";
        const eventWidgetId = "ww7";
        const tableWidgetId = "ww8";

        assertDates(widgetId, eventWidgetId, tableWidgetId,
            null, null, null,
            null, null
        );

        // Data range goes from 1 jan 2018 to 15 Sep 2022.
        // Allowed range goes from 1 jan 2017 to 15 Sep 2023.

        {  // Testcase large range than data
            cy.selectDatePickerRangeFromFromInput(widgetId, "01 Jan 2017");
            cy.selectDatePickerRangeToFromInput(widgetId, "15 Sep 2023");
            assertDates(widgetId, eventWidgetId, tableWidgetId,
                "01 Jan 2017", "01 Jan 2017",
                "15 Sep 2023", "15 Sep 2023", DateUtils.rangeMdx(new Date(2017, 0, 1), new Date(2023, 8, 15)),
                "01 Jan 2018", "15 Sep 2022"
            );
        }

        {  // Testcase range outside data before
            cy.selectDatePickerRangeFromFromInput(widgetId, "01 Jan 2017");
            cy.selectDatePickerRangeToFromInput(widgetId, "02 Jan 2017");
            assertDates(widgetId, eventWidgetId, tableWidgetId,
                "01 Jan 2017", "01 Jan 2017",
                "02 Jan 2017", "02 Jan 2017", DateUtils.rangeMdx(new Date(2017, 0, 1), new Date(2017, 0, 2)),
                "", ""
            );
        }

        {  // Testcase range outside data after
            cy.selectDatePickerRangeFromFromInput(widgetId, "14 Sep 2023");
            cy.selectDatePickerRangeToFromInput(widgetId, "15 Sep 2023");
            assertDates(widgetId, eventWidgetId, tableWidgetId,
                "14 Sep 2023", "14 Sep 2023",
                "15 Sep 2023", "15 Sep 2023", DateUtils.rangeMdx(new Date(2023, 8, 14), new Date(2023, 8, 15)),
                "", ""
            );
        }

        {  // Testcase range outside to just within range before
            cy.selectDatePickerRangeFromFromInput(widgetId, "01 Jan 2017");
            cy.selectDatePickerRangeToFromInput(widgetId, "01 Jan 2018");
            assertDates(widgetId, eventWidgetId, tableWidgetId,
                "01 Jan 2017", "01 Jan 2017",
                "01 Jan 2018", "01 Jan 2018", DateUtils.rangeMdx(new Date(2017, 0, 1), new Date(2018, 0, 1)),
                "01 Jan 2018", "01 Jan 2018"
            );
        }

        {  // Testcase range outside to just within range after
            cy.selectDatePickerRangeFromFromInput(widgetId, "15 Sep 2022");
            cy.selectDatePickerRangeToFromInput(widgetId, "15 Sep 2023");
            assertDates(widgetId, eventWidgetId, tableWidgetId,
                "15 Sep 2022", "15 Sep 2022",
                "15 Sep 2023", "15 Sep 2023", DateUtils.rangeMdx(new Date(2022, 8, 15), new Date(2023, 8, 15)),
                "15 Sep 2022", "15 Sep 2022"
            );
        }

    });

    it("ww9: Range Picker - selecting edge of range", () => {

        const widgetId = "ww9";
        const eventWidgetId = "ww10";
        const tableWidgetId = "ww11";

        assertDates(widgetId, eventWidgetId, tableWidgetId,
            null, null, null,
            null, null
        );

        // Data range goes from 1 jan 2018 to 15 Sep 2022.
        // Allowed range goes from 1 jan 2017 to 15 Sep 2023.

        {  // Testcase exact data range
            cy.selectDatePickerRangeFromFromInput(widgetId, "01 Jan 2018");
            cy.selectDatePickerRangeToFromInput(widgetId, "15 Sep 2022");
            assertDates(widgetId, eventWidgetId, tableWidgetId,
                "01 Jan 2018", "01 Jan 2018",
                "15 Sep 2022", "15 Sep 2022", DateUtils.rangeMdx(new Date(2018, 0, 1), new Date(2022, 8, 15))
            );
        }

    });

});
