export function assertDates(widgetId: string, eventWidgetId: string, tableWidgetId: string, dateF: string | null,
                            eventF: string | null, dateT: string | null, eventT: string | null,
                            mdx: string | null, tableF?: string, tableT?: string) {

    cy.assertDatePickerRangeFrom(widgetId, dateF);
    cy.assertDatePickerRangeTo(widgetId, dateT);

    const event = (eventF || eventT) ? (Cypress.migrateDate(eventF) + " - " + Cypress.migrateDate(eventT)) : null;

    cy.assertEventValue(eventWidgetId, event);
    cy.assertEventMdx(eventWidgetId, mdx);

    const tableFromValueToAssert = tableF ?? eventF;
    const tableToValueToAssert = tableT ?? eventT;

    assertTableData(tableWidgetId, !eventF && !eventT, tableFromValueToAssert == "" && tableToValueToAssert == "",
        tableFromValueToAssert, tableToValueToAssert);

}

export function assertDate(widgetId: string, eventWidgetId: string, tableWidgetId: string, date: string | null,
                           event: string | null, mdx: string | null, table1?: any, table2?: any) {

    cy.assertDatePicker(widgetId, date);

    cy.assertDateEventValue(eventWidgetId, event);
    cy.assertEventMdx(eventWidgetId, mdx);

    assertTableData(tableWidgetId, !event, table1 == "", table1 ?? event, table2);

}

function assertTableData(tableWidgetId: string, waiting: boolean, noData: boolean, table1: any, table2: any) {

    if (waiting) {

        cy.getWidget(tableWidgetId, "data-cy-waiting");

    } else if (noData) {

        cy.assertWidgetNoData(tableWidgetId);

    } else {

        const tableFromValueToAssert = table1;

        if (tableFromValueToAssert) {

            if (tableFromValueToAssert.startsWith("0")) {
                cy.assertTableValue(tableWidgetId, 0, 0, tableFromValueToAssert.substring(1));
            } else {
                cy.assertTableValue(tableWidgetId, 0, 0, tableFromValueToAssert);
            }

        }

        const tableToValueToAssert = table2;

        if (tableToValueToAssert) {

            if (tableToValueToAssert.startsWith("0")) {
                cy.assertTableValue(tableWidgetId, 1, 0, tableToValueToAssert.substring(1));
            } else {
                cy.assertTableValue(tableWidgetId, 1, 0, tableToValueToAssert);
            }

        }

    }

}