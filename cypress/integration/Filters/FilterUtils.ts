export function assertButtonsSelection(widgetId: string, eventWidgetId: string, available: string[], selection: string[], event: string | null, mdx?: string) {

    cy.assertButtonsSelected(widgetId, selection);

    {
        const selectionS = new Set<string>(selection);
        available.forEach(c => {
            if (!selectionS.has(c)) {
                cy.assertButtonNotSelected(widgetId, c);
            }
        });
    }

    eventWidgetId && cy.assertEventValue(eventWidgetId, event);

    if (mdx !== undefined) {

        cy.assertEventMdx(eventWidgetId, mdx);

    }

}