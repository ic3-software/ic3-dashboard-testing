describe("Others/EventsAtStart/EventsAtStartDatePicker", () => {

    beforeEach(() => {
        cy.login();

        cy.openViewerTestReport("Others/EventsAtStart/EventsAtStartDatePicker");
        cy.waitForQueryCount(6 * 2);
        cy.wait(1000);
        cy.waitForQueryCount(6 * 2);

    });

    it("1", () => {
        cy.assertTableCellContent("ww1", 0, 1, "€20,000");
        cy.assertTableCellContent("ww3", 1, 1, "€1,200");
        cy.assertTableCellContent("ww5", 0, 1, "€8,581,700");
        cy.assertTableCellContent("ww7", 1, 1, "€1,200");

        cy.assertTableCellContent("ww9", 0, 1, "€8,581,700");
        cy.assertTableCellContent("ww11", 0, 1, "€8,581,700");

    });

})