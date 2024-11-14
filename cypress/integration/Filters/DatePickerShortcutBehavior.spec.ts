import {DateUtils} from "./DateUtils";
import {assertDate, assertDates} from "./DatePickerAssertUtils";

export {};

describe("Filters/DatePicker Shortcut Behavior", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/DatePicker Shortcut Behavior", true, false);
        cy.waitForQueryCount(6);
    });

    it("ww0: range - default shortcut", () => {
        const widgetId = "ww0";
        const eventWidgetId = "ww1";
        const tableWidgetId = "ww2";

        const today = new Date();

        const from = new Date(today.getTime())
        from.setDate(from.getDate() - 1);

        const to = from;

        assertDates(widgetId, eventWidgetId, tableWidgetId,
            DateUtils.dateEvent(from), DateUtils.dateEvent(from), from,
            DateUtils.dateEvent(to), DateUtils.dateEvent(to), to
        );
    });

    it("ww4: range - manually set shortcut", () => {

        const widgetId = "ww4";
        const eventWidgetId = "ww5";
        const tableWidgetId = "ww6";

        cy.datePickerChooseShortcut(widgetId, "Yesterday");

        const today = new Date();

        const from = new Date(today.getTime())
        from.setDate(from.getDate() - 1);

        const to = from;

        assertDates(widgetId, eventWidgetId, tableWidgetId,
            DateUtils.dateEvent(from), DateUtils.dateEvent(from), from,
            DateUtils.dateEvent(to), DateUtils.dateEvent(to), to
        );

    });

    it("ww8: date - default shortcut", () => {
        const widgetId = "ww8";
        const eventWidgetId = "ww9";
        const tableWidgetId = "ww10";

        const from = new Date(2020, 8, 23);

        assertDate(widgetId, eventWidgetId, tableWidgetId, DateUtils.dateEvent(from), DateUtils.dateEvent(from), DateUtils.mdx(DateUtils.dateMdx(from)));
    });

    it("ww12: date - manually set shortcut", () => {

        const widgetId = "ww12";
        const eventWidgetId = "ww13";
        const tableWidgetId = "ww14";

        cy.datePickerChooseShortcut(widgetId, "Last month");

        const from = new Date(2020, 7, 30);

        assertDate(widgetId, eventWidgetId, tableWidgetId, DateUtils.dateEvent(from), DateUtils.dateEvent(from), DateUtils.mdx(DateUtils.dateMdx(from)));

    });

});
