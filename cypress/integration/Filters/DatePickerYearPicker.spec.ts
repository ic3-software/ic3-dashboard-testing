import {DateUtils} from "./DateUtils";
import {assertDate, assertDates} from "./DatePickerAssertUtils";

export {};

describe("Filters/DatePicker Year Picker", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Year picker", true, false);
        cy.waitForQueryCount(2);
    });

    it("ww0: range - default shortcut", () => {
        const widgetId = "ww0";
        const eventWidgetId = "ww1";
        const tableWidgetId = "ww2";

        assertDate(widgetId, eventWidgetId, tableWidgetId, null, null, null);

        // Data range goes from 1 jan 2018 to 15 Sep 2022.
        // Allowed range goes from 1 jan 2017 to 15 Sep 2023.

        cy.selectDatePickerFromInput(widgetId, "2017");
        assertDate(widgetId, eventWidgetId, tableWidgetId, "2017", "2017", DateUtils.mdxYear("DateTime(2017,1,1)"), "");
        cy.selectDatePickerFromInput(widgetId, "2018");
        assertDate(widgetId, eventWidgetId, tableWidgetId, "2018", "2018", DateUtils.mdxYear("DateTime(2018,1,1)"), "01 Jan 2018", "31 Dec 2018");
        cy.selectDatePickerFromInput(widgetId, "2019");
        assertDate(widgetId, eventWidgetId, tableWidgetId, "2019", "2019", DateUtils.mdxYear("DateTime(2019,1,1)"), "01 Jan 2019", "31 Dec 2019");
        cy.selectDatePickerFromInput(widgetId, "2020");
        assertDate(widgetId, eventWidgetId, tableWidgetId, "2020", "2020", DateUtils.mdxYear("DateTime(2020,1,1)"), "01 Jan 2020", "31 Dec 2020");
        cy.selectDatePickerFromInput(widgetId, "2021");
        assertDate(widgetId, eventWidgetId, tableWidgetId, "2021", "2021", DateUtils.mdxYear("DateTime(2021,1,1)"), "01 Jan 2021", "31 Dec 2021");
        cy.selectDatePickerFromInput(widgetId, "2022");
        assertDate(widgetId, eventWidgetId, tableWidgetId, "2022", "2022", DateUtils.mdxYear("DateTime(2022,1,1)"), "01 Jan 2022", "15 Sep 2022");
        cy.selectDatePickerFromInput(widgetId, "2023");
        assertDate(widgetId, eventWidgetId, tableWidgetId, "2023", "2023", DateUtils.mdxYear("DateTime(2023,1,1)"), "");
    });

    it("ww0: range - default shortcut", () => {
        const widgetId = "ww6";
        const eventWidgetId = "ww7";
        const tableWidgetId = "ww8";

        assertDates(widgetId, eventWidgetId, tableWidgetId,
            null, null, null, null,
            null
        );

        // Data range goes from 1 jan 2018 to 15 Sep 2022.
        // Allowed range goes from 1 jan 2017 to 15 Sep 2023.

        {  // Testcase large range than data
            cy.selectDatePickerRangeFromFromInput(widgetId, "2017");
            cy.selectDatePickerRangeToFromInput(widgetId, "2023");
            assertDates(widgetId, eventWidgetId, tableWidgetId,
                "2017", "2017", "2023", "2023",
                DateUtils.rangeMdxYear(new Date(2017, 0, 1), new Date(2023, 0, 1)),
                "01 Jan 2018", "15 Sep 2022"
            );
        }

        {  // Testcase range outside data
            cy.selectDatePickerRangeFromFromInput(widgetId, "2016");
            cy.selectDatePickerRangeToFromInput(widgetId, "2017");
            assertDates(widgetId, eventWidgetId, tableWidgetId,
                "2016", "2016", "2017", "2017",
                DateUtils.rangeMdxYear(new Date(2016, 0, 1), new Date(2017, 0, 1)),
                "", ""
            );
        }

        {  // Testcase range on border
            cy.selectDatePickerRangeFromFromInput(widgetId, "2022");
            cy.selectDatePickerRangeToFromInput(widgetId, "2023");
            assertDates(widgetId, eventWidgetId, tableWidgetId,
                "2022", "2022", "2023", "2023",
                DateUtils.rangeMdxYear(new Date(2022, 0, 1), new Date(2023, 0, 1)),
                "01 Jan 2022", "15 Sep 2022"
            );
        }

    });

});
