export {};

describe("Embedded Reports/event-forwarder", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Embedded Reports/event-forwarder/embedded-with-subreports");
        cy.waitForQueryCount(1);
    });

    it("Basics", () => {

        // test when opening an embedded dashboard the initial event is set
        cy.selectButton("default:ww1", "my dashboard");
        cy.waitForQueryCount(2);

        cy.assertTableRowCount("_ww2:ww0", 4);
        cy.assertTableValue("_ww2:ww0", 0, 0, "2019 Q1");

        // test new event value is sent
        cy.selectButton("default:ww0", "2020");
        cy.waitForQueryCount(3);

        cy.assertTableRowCount("_ww2:ww0", 4);
        cy.assertTableValue("_ww2:ww0", 0, 0, "2020 Q1");

    });

});
