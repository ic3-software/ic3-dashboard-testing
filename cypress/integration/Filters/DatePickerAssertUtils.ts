export function assertDates(widgetId: string, eventWidgetId: string, tableWidgetId: string, dateF: string | null, eventF: string | null, mdxF: string | null, dateT: string | null, eventT: string | null, mdxT: string | null) {

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

export function assertDate(widgetId: string, eventWidgetId: string, tableWidgetId: string, date: string | null, event: string | null, mdx: string | null) {

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