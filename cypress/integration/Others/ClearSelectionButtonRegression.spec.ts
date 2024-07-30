describe("Others/Clear button", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/Clear selection button", true, false);
        cy.waitForQueryCount(1);
    });

    it("ww0: Buttons - Single", () => {

        cy.assertEventValue("ww1", "");

        cy.clickTableCell("ww0", 1, 0);
        cy.assertEventValue("ww1", "Asia");

        // Click clear
        cy.getWidget("ww2").find("[data-cy=ic-button]").click();

        // The event should not empty from clearing the selection, because the table does not have any selection.
        cy.assertEventValue("ww1", "Asia");

    });

});