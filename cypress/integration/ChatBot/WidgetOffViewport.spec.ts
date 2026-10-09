describe("ChatBot/widgetOffViewport", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("ChatBot/widgetOffViewport");
        cy.waitForQueryCount(1 /* 1 invisible widgets w/ data */);
    });

    it("chatbot says: Ask me anything about the widget : Table.", () => {

        // ww0 is linked to a single widget.

        cy.getWidget("ww0").find("div.ic3Olie-content")
            // The following text means the AI widget is ready to chat:
            //      i.e., invisible widget(s) w/ data now.
            .find("div.ic3AIAssistant-input")
            .find("textarea")
            .should('have.attr', 'placeholder', 'Ask me anything about the dashboard.');

    })
});