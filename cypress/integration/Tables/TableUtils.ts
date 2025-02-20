export function getTableHeaderSelector(headerTitle: string, extra?: string): string {
    return ".MuiDataGrid-columnHeader[data-field='" + headerTitle + "'] " + (extra ?? "");
}

export function assertTableColumnWidth(cy: Cypress.cy & CyEventEmitter, widgetId: string, headerTitle: string, sizePx: number) {
    cy.getTableHeader(widgetId, headerTitle).invoke('width').then(w => Math.floor(w)).should('eq', sizePx)
}

export function dragTableColumnWidth(cy: Cypress.cy & CyEventEmitter, widgetId: string, headerTitle: string, sizePx: number) {
    cy.getWidget(widgetId).find(".MuiDataGrid-columnHeader[data-field='" + headerTitle + "'] .MuiDataGrid-columnSeparator--resizable")
        .move({force: true, deltaX: sizePx})
}