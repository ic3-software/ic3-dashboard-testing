/**
 * ww0 : standard input           -> event displayed in ww1
 * ww2 : numbers only (pattern)   -> event displayed in ww3
 * ww4 : with an initial value    -> event displayed in ww5
 */
function inputOf(widgetId: string) {
    return cy.getWidget(widgetId).find("input");
}

function sendButtonOf(widgetId: string) {
    return cy.getWidget(widgetId).find("button");
}

describe("Others/InputField", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/Input Field", true, false);
    });

    it("Initial state", () => {

        cy.assertEventValue("ww1", null);
        cy.assertEventValue("ww3", null);

        // the initial value is fired at start
        inputOf("ww4").invoke("val").then(value => {
            expect(value).to.not.be.empty;
            cy.assertEventValue("ww5", value as string);
        });

    });

    it("ww0: standard - fire on enter and on button click", () => {

        inputOf("ww0").type("Hello{enter}");
        cy.assertEventValue("ww1", "Hello");

        // typing without validating does not fire
        inputOf("ww0").clear().type("World");
        cy.assertEventValue("ww1", "Hello");

        sendButtonOf("ww0").click();
        cy.assertEventValue("ww1", "World");

        // nothing pending => button disabled
        sendButtonOf("ww0").should("be.disabled");

        // empty value => clear event
        inputOf("ww0").clear().type("{enter}");
        cy.assertEventValue("ww1", null);

    });

    it("ww2: numbers only - invalid values are not fired", () => {

        inputOf("ww2").type("123{enter}");
        cy.assertEventValue("ww3", "123");

        inputOf("ww2").clear().type("12a{enter}");
        cy.getWidget("ww2").find(".Mui-error").should("exist");
        cy.assertEventValue("ww3", "123");

        // editing clears the error
        inputOf("ww2").type("{backspace}");
        cy.getWidget("ww2").find(".Mui-error").should("not.exist");

        inputOf("ww2").clear().type("456{enter}");
        cy.assertEventValue("ww3", "456");

        inputOf("ww2").clear().type("{enter}");
        cy.assertEventValue("ww3", null);

    });

    it("ww4: initial value - can be changed and cleared", () => {

        inputOf("ww4").clear().type("Changed{enter}");
        cy.assertEventValue("ww5", "Changed");

        inputOf("ww4").clear().type("{enter}");
        cy.assertEventValue("ww5", null);

    });

})
