export {};

function assertDate(widgetId: string, eventWidgetId: string, date: string | null, dateAsString: string) {

    cy.assertDatePicker(widgetId, date);

    cy.assertDateEventValue(eventWidgetId, dateAsString);

}

describe("Filters/DatePicker Clear", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Datepicker Clear", true, false);
        cy.waitForQueryCount(1);
    });

    it("ww0: Date Picker Clear Event", () => {

        const widgetId = "ww0";
        const eventWidgetId = "ww1";

        assertDate(widgetId, eventWidgetId, "15 Sep 2022", "15 Sep 2022");

        cy.selectDatePickerFromInput(widgetId, "01 Sep 2021");
        assertDate(widgetId, eventWidgetId, "01 Sep 2021", "01 Sep 2021");

        // Clear date picker
        cy.clickUserMenuClearSelection(widgetId);
        // Earlier selected date should remain
        assertDate(widgetId, eventWidgetId, null, "");

        cy.clickUserMenuToInitialState(widgetId);
        assertDate(widgetId, eventWidgetId, "15 Sep 2022", "15 Sep 2022");

    });

});
