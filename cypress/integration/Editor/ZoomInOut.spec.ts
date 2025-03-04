export {};

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
                cy.get('button[data-cy="toolbar-zoomIn"]').click();
                cy.get('button[data-cy="toolbar-zoomValue"]').invoke('text').should('equal', '90%');
                cy.get('#app-payload > .ic3App-dashboard').invoke('outerWidth').should('be.closeTo', Number(outerWidth), 0.5);

                cy.get('button[data-cy="toolbar-zoomValue"]').click();
                cy.get('button[data-cy="toolbar-zoomValue"]').invoke('text').should('equal', '100%');
                cy.get('#app-payload > .ic3App-dashboard').invoke('outerWidth').should('equal', outerWidth);

                cy.get('button[data-cy="toolbar-zoomOut"]').click();
                cy.get('button[data-cy="toolbar-zoomValue"]').invoke('text').should('equal', '110%');
                cy.get('#app-payload > .ic3App-dashboard').invoke('outerWidth').should('be.closeTo', Number(outerWidth), 0.5);
            });
    });

    it("zoom in and out height", () => {

        cy.get('button[data-cy="toolbar-zoomValue"]').click();

        cy.get('#app-payload > .ic3App-dashboard').invoke('outerHeight')
            .then(outerHeight => {
                cy.get('button[data-cy="toolbar-zoomIn"]').click();
                cy.get('button[data-cy="toolbar-zoomValue"]').invoke('text').should('equal', '90%');
                cy.get('#app-payload > .ic3App-dashboard').invoke('outerHeight').should('be.closeTo', Number(outerHeight), 0.5);

                cy.get('button[data-cy="toolbar-zoomValue"]').click();
                cy.get('button[data-cy="toolbar-zoomValue"]').invoke('text').should('equal', '100%');
                cy.get('#app-payload > .ic3App-dashboard').invoke('outerHeight').should('equal', outerHeight);

                cy.get('button[data-cy="toolbar-zoomOut"]').click();
                cy.get('button[data-cy="toolbar-zoomValue"]').invoke('text').should('equal', '110%');
                cy.get('#app-payload > .ic3App-dashboard').invoke('height').should('be.closeTo', Number(outerHeight), 0.5);
            });
    });

});
