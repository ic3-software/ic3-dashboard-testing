import {DateUtils} from "./DateUtils";

export function assertDates(widgetId: string, eventWidgetId: string, tableWidgetId: string, dateF: string | null,
                            eventF: string | null, mdxF: Date | null, dateT: string | null, eventT: string | null,
                            mdxT: Date | null, tableF?: string, tableT?: string) {

    cy.assertDatePickerRangeFrom(widgetId, dateF);
    cy.assertDatePickerRangeTo(widgetId, dateT);

    const event = (eventF || eventT) ? (Cypress.migrateDate(eventF) + " - " + Cypress.migrateDate(eventT)) : null;
    const mdx = (mdxF || mdxT) ? DateUtils.rangeMdx(mdxF!, mdxT!) : null;

    cy.assertEventValue(eventWidgetId, event);
    cy.assertEventMdx(eventWidgetId, mdx);

    if (!eventF && !eventT) {

        cy.getWidget(tableWidgetId, "data-cy-waiting");

    } else {

        const tableFromValueToAssert = tableF ?? eventF;

        if (tableFromValueToAssert) {

            if (tableFromValueToAssert.startsWith("0")) {
                cy.assertTableValue(tableWidgetId, 0, 0, tableFromValueToAssert.substring(1));
            } else {
                cy.assertTableValue(tableWidgetId, 0, 0, tableFromValueToAssert);
            }

        }

        const tableToValueToAssert = tableT ?? eventT;

        if (tableToValueToAssert) {

            if (tableToValueToAssert.startsWith("0")) {
                cy.assertTableValue(tableWidgetId, 1, 0, tableToValueToAssert.substring(1));
            } else {
                cy.assertTableValue(tableWidgetId, 1, 0, tableToValueToAssert);
            }

        }

        if (tableFromValueToAssert == "" && tableToValueToAssert == "") {
            cy.assertWidgetNoData(tableWidgetId);
        }

    }


}

export function assertDate(widgetId: string, eventWidgetId: string, tableWidgetId: string, date: string | null,
                           event: string | null, mdx: string | null, noData?: boolean) {

    cy.assertDatePicker(widgetId, date);

    cy.assertDateEventValue(eventWidgetId, event);
    cy.assertEventMdx(eventWidgetId, mdx);

    if (!event) {

        cy.getWidget(tableWidgetId, "data-cy-waiting");

    } else {

        if (noData) {
            cy.assertWidgetNoData(tableWidgetId);
        } else if (event.startsWith("0")) {
            cy.assertTableValue(tableWidgetId, 0, 0, event.substr(1));
        } else {
            cy.assertTableValue(tableWidgetId, 0, 0, event);
        }

    }
}