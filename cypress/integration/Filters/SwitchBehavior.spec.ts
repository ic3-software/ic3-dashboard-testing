describe("Filters/Switch Behavior", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Switch behavior", true, false);
        cy.waitForQueryCount(4);
    });

    it("ww0: Single option", () => {
        cy.assertEventValue("ww2", null);
        cy.clickSwitch("ww0");
        cy.assertEventValue("ww2", "Amount");
    });

    it("ww6: Single option default active", () => {
        cy.assertEventValue("ww7", "Amount");
    });

    it("ww1: Dual option", () => {
        cy.assertEventValue("ww3", "#Articles");
        cy.clickSwitch("ww1");
        cy.assertEventValue("ww3", "#Licences");
    });

    it("ww4: Dual option second option default", () => {
        cy.assertEventValue("ww5", "#Licences");
    });

});
