describe("Gadgets/GadgetInvisibleEventAtStart", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Gadgets/ICS-841-scratch");
        cy.waitForQueryCount(3);
    });

    it("Table w/ expected values", () => {

        // Dashboard created from scratch (copy of ECRS one).
        cy.assertTableValue("ww0", 0, 0, "250.00");

        cy.assertTableValue("ww0", 0, 0, "13 Oct 2020");
        cy.assertTableValue("ww0", 0, 1, "9");

        cy.assertTableValue("ww0", 1, 0, "17 Oct 2020");
        cy.assertTableValue("ww0", 1, 1, "9");

        cy.assertTableValue("ww0", 2, 0, "19 Oct 2020");
        cy.assertTableValue("ww0", 2, 1, "2");

    })
});