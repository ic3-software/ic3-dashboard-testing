export {};

/**
 * Dashboards file explorer (console "open dashboard") in shared:/Tests/Editor (at least 5 files).
 *
 * The rows are accessed by position : not depending on the actual content of the folder.
 */

const ROWS = ".MuiDialog-root .MuiDataGrid-row";

function clickRow(index: number, options?: Partial<Cypress.ClickOptions>) {
    cy.get(ROWS).eq(index).click(options);
}

function assertSelectedRows(indexes: number[]) {

    cy.get(ROWS + ".Mui-selected").should("have.length", indexes.length);

    indexes.forEach(index => cy.get(ROWS).eq(index).should("have.class", "Mui-selected"));

}

function openFileExplorerInTestsEditorFolder() {

    cy.visit("/icCube/report/console");

    // Note: no actions (delete, move, ...) in the console file explorer.
    cy.get('[data-cy="action-openReport"]').click();
    cy.get(".MuiDialog-root .MuiDataGrid-root").should("exist");

    cy.get('.MuiDialog-root .ic3FileExplorerSidebar-folderHeading[data-path^="shared:"]').first().click();
    cy.contains(ROWS, "Tests").dblclick();
    cy.contains(ROWS, "Editor").dblclick();
    cy.contains(ROWS, "Empty Report").should("exist");

    assertSelectedRows([]);

}

describe("Editor/FileExplorerMultiSelection", () => {

    beforeEach(() => {
        cy.login();
        openFileExplorerInTestsEditorFolder();
    });

    it("Click, Ctrl+Click, Shift+Click, Ctrl+Shift+Click", () => {

        // Click : selects the file only
        clickRow(0);
        assertSelectedRows([0]);

        clickRow(1);
        assertSelectedRows([1]);

        // Ctrl+Click : toggles the file
        clickRow(3, {ctrlKey: true});
        assertSelectedRows([1, 3]);

        clickRow(1, {ctrlKey: true});
        assertSelectedRows([3]);

        // Shift+Click : selects the files from the last clicked one (both directions)
        clickRow(0);
        clickRow(2, {shiftKey: true});
        assertSelectedRows([0, 1, 2]);

        clickRow(4);
        clickRow(3, {shiftKey: true});
        assertSelectedRows([3, 4]);

        // Ctrl+Shift+Click : adds the files from the last clicked one
        clickRow(0);
        clickRow(1, {ctrlKey: true});
        clickRow(3, {ctrlKey: true});
        clickRow(4, {ctrlKey: true, shiftKey: true});
        assertSelectedRows([0, 1, 3, 4]);

    });

    it("Changing folder resets the selection", () => {

        clickRow(0);
        clickRow(1, {ctrlKey: true});
        assertSelectedRows([0, 1]);

        cy.get('.MuiDialog-root .ic3FileExplorerSidebar-folderHeading[data-path^="shared:"]').first().click();
        cy.contains(ROWS, "Tests").should("exist");

        assertSelectedRows([]);

    });

});
