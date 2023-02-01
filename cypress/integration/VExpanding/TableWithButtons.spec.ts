describe("VExpanding/RepetitionDesktop", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("VExpanding/TableWithButtons");
        cy.waitForQueryCount(2);
    });

    it("Change Buttons Selection", () => {

        const buttonsId = "ww0";
        const tableId = "ww1";

        cy.assertButtonSelected(buttonsId, "Africa");
        cy.assertTableRowCount(tableId, 15)

        cy.selectButton(buttonsId, "Europe");
        cy.waitForQueryCount(3);

        cy.assertButtonSelected(buttonsId, "Europe");
        cy.assertTableRowCount(tableId, 75)

        cy.selectButton(buttonsId, "Africa");
        cy.waitForQueryCount(4);

        cy.assertButtonSelected(buttonsId, "Africa");
        cy.assertTableRowCount(tableId, 15)

    })

});
