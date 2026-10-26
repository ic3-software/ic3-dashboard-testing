export {};

function widgetRect(widgetId: string): Cypress.Chainable<DOMRect> {
    return cy.get('[data-cy="widget-box-' + widgetId + '"]').then($el => $el[0].getBoundingClientRect());
}

/**
 * M-15: Shift + arrow => 1px move at 100% zoom; the keyboard move is completed after a 500ms timeout.
 */
function assertKeyboardMoveOnePixel(keys: string, dx: number, dy: number) {

    cy.get('[data-cy="widget-box-ww0"]').click();
    cy.get('[data-cy="widget-box-ww0"]').should("have.class", "ic3-widget-box-selected");

    widgetRect("ww0").then(before => {

        cy.get("body").type("{shift}" + keys);
        cy.wait(1000);

        cy.get(".widget-box-keyboard-drag").should("not.exist");

        widgetRect("ww0").then(after => {
            expect(after.left).to.be.closeTo(before.left + dx, 0.5);
            expect(after.top).to.be.closeTo(before.top + dy, 0.5);
        });

    });
}

describe("Editor/Zoom in out", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Editor/Zoom in");
        cy.waitForQueryCount(1);
    });

    /*
    Width and height of the dashboard-div remains the same when zooming in and out. Only scale changes.
     */

    it("zoom in and out width", () => {

        cy.get('#app-payload > .ic3App-dashboard').invoke('outerWidth')
            .then(outerWidth => {
                cy.clickOpenMoreTopMenu();

                cy.get('[data-cy="toolbar-zoomIn"]').click();
                cy.get('[data-cy="toolbar-zoomIn"]').click();
                cy.get('[data-cy="toolbar-zoomValue"]').invoke('text').should('equal', '90%');
                cy.get('#app-payload > .ic3App-dashboard').invoke('outerWidth').should('be.closeTo', Number(outerWidth), 0.5);

                cy.get('[data-cy="toolbar-zoomValue"]').click();
                cy.get('[data-cy="toolbar-zoomValue"]').invoke('text').should('equal', '100%');
                cy.get('#app-payload > .ic3App-dashboard').invoke('outerWidth').should('equal', outerWidth);

                cy.get('[data-cy="toolbar-zoomOut"]').click();
                cy.get('[data-cy="toolbar-zoomOut"]').click();
                cy.get('[data-cy="toolbar-zoomValue"]').invoke('text').should('equal', '110%');
                cy.get('#app-payload > .ic3App-dashboard').invoke('outerWidth').should('be.closeTo', Number(outerWidth), 0.5);

                cy.clickOutside();
            });
    });

    it("zoom in and out height", () => {

        cy.get('#app-payload > .ic3App-dashboard').invoke('outerHeight')
            .then(outerHeight => {

                cy.clickOpenMoreTopMenu();

                cy.get('[data-cy="toolbar-zoomIn"]').click();
                cy.get('[data-cy="toolbar-zoomIn"]').click();
                cy.get('[data-cy="toolbar-zoomValue"]').invoke('text').should('equal', '90%');
                cy.get('#app-payload > .ic3App-dashboard').invoke('outerHeight').should('be.closeTo', Number(outerHeight), 0.5);

                cy.get('[data-cy="toolbar-zoomValue"]').click();
                cy.get('[data-cy="toolbar-zoomValue"]').invoke('text').should('equal', '100%');
                cy.get('#app-payload > .ic3App-dashboard').invoke('outerHeight').should('equal', outerHeight);

                cy.get('[data-cy="toolbar-zoomOut"]').click();
                cy.get('[data-cy="toolbar-zoomOut"]').click();
                cy.get('[data-cy="toolbar-zoomValue"]').invoke('text').should('equal', '110%');
                cy.get('#app-payload > .ic3App-dashboard').invoke('height').should('be.closeTo', Number(outerHeight), 0.5);

                cy.clickOutside();
            });
    });

    it("M-15: Shift+ArrowLeft moves the widget 1px to the left", () => {
        assertKeyboardMoveOnePixel("{leftarrow}", -1, 0);
    });

    it("M-15: Shift+ArrowUp moves the widget 1px up", () => {
        assertKeyboardMoveOnePixel("{uparrow}", 0, -1);
    });

    it("M-15: Shift+ArrowRight moves the widget 1px to the right (control)", () => {
        assertKeyboardMoveOnePixel("{rightarrow}", 1, 0);
    });

});
