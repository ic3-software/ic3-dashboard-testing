export {};

describe("Embedded Reports/event-forwarder", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Embedded Reports/event-forwarder/master");
        cy.waitForQueryCount(3);
    });

    it("Basics", () => {

        cy.selectButton("default:ww0", "Africa");
        cy.waitForQueryCount(4);

        cy.assertTableRowCount("_ww1:ww0", 1);

        cy.assertTableValue("_ww1:ww0", 0, 0, "South Africa");
        cy.assertTableValue("_ww1:ww0", 0, 1, "279");

        cy.keyCtrl(() => {
            cy.selectButton("default:ww0", "North America");
            cy.waitForQueryCount(5);
        });

        cy.assertTableRowCount("_ww1:ww0", 3);

        cy.assertTableValue("_ww1:ww0", 0, 0, "Canada");
        cy.assertTableValue("_ww1:ww0", 1, 0, "United States");
        cy.assertTableValue("_ww1:ww0", 2, 0, "South Africa");

        cy.assertTableValue("_ww1:ww0", 0, 1, "4");
        cy.assertTableValue("_ww1:ww0", 1, 1, "432");
        cy.assertTableValue("_ww1:ww0", 2, 1, "279");
    });

});
