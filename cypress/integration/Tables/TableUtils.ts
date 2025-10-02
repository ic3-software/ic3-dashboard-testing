export function assertTableColumnWidth(cy: Cypress.cy & CyEventEmitter, widgetId: string, headerTitle: string, sizePx: number) {
    cy.getTableHeader(widgetId, headerTitle).invoke('width').then(w => Math.floor(w)).should('eq', sizePx)
}

export function assertTableColumnWidthZoomed(cy: Cypress.cy & CyEventEmitter, widgetId: string, headerTitle: string, sizePx: number) {
    cy.getTableHeaderZoomed(widgetId, headerTitle).invoke('width').then(w => Math.floor(w)).should('eq', sizePx)
}

export function resizeTableColumnWidth(cy: Cypress.cy & CyEventEmitter, widgetId: string, headerTitle: string, sizePx: number) {
    cy.resizeTableColumnWidth(widgetId, headerTitle, sizePx);
}