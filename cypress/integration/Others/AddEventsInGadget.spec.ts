export {};


describe("Others/Add Events in Gadget", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Others/Add Events in Gadget", true, false);
        cy.waitForQueryCount(4);
    });

    it("check add event to query from a gadget is working", () => {

        cy.assertTableColCount("ww0", 6);
        cy.clickUserMenuAddEventToQueries("wg0-0");
        cy.assertTableColCount("ww0", 2);

    });

});
