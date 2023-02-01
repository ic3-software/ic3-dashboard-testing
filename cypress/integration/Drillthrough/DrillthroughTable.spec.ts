export {};


describe("Drillthrough/Drillthrough Table", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Drillthrough/Drillthrough Table");
        cy.waitForQueryCount(1);
    });

    it("ww0: Table", () => {

        cy.assertTableRowCount("ww0", 9);

        for (let row = 670; row < 679; row++) {
            cy.assertTableValue("ww0", row - 670, 0, "" + row);
            cy.assertTableValue("ww0", row - 670, 1, "Marseille");
            cy.assertTableValue("ww0", row - 670, 2, "2");
        }

    })

});
