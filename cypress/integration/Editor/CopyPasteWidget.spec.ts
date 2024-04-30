export {};

describe("Editor/Copy and paste widget", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Editor/copy and paste widget");
        cy.waitForQueryCount(1);
    });

    it("copy and paste basic", () => {

        cy.widgetCopy('ww0');

        cy.widgetPaste();

        cy.waitForQueryCount(2);
        cy.getWidget("ww0");
        cy.assertWidgetHeader("ww1", "[ww1] Table Copy");

    });

    it("copy and paste between different reports", () => {

        cy.widgetCopy('ww0');

        cy.openEditorTestReport("Editor/copy and paste widget II");
        cy.waitForQueryCount(0);

        cy.widgetPaste();

        cy.waitForQueryCount(1);
        cy.assertWidgetHeader("ww0", "[ww0] Table");

    });

});
