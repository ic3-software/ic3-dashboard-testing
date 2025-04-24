export {};

describe("Embedded Reports/constants", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Embedded Reports/onEventFired/onEventFired-master");
        cy.waitForQueryCount(2);
    });

    it("Basics", () => {

        cy.getWidget("default:ww1").contains("License-Inner");  // onFiredEvent of report called
        cy.getWidget("default:ww1").contains("Africa - toMaster");  // onFiredEvent of embedded report called

        cy.getWidget("_ww2:ww1").contains("Africa");
        cy.getWidget("_ww2:ww1").contains("License");

    });

});
