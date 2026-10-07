describe("ChatBot/widgetOffViewport", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("ChatBot/widgetOffViewport II");
        cy.waitForQueryCount(2 /* 2 invisible widgets w/ data */);
    });

    it("chatbot says: Ask me anything about the widget : Table.", () => {

        // ww0 has no linked widgets => expect all widgets of the dashboard to have their data

        cy.getWidget("ww0").find("div.ic3Olie-content")
            // The following text means the AI widget is ready to chat:
            //      i.e., invisible widget(s) w/ data now.
            .find("textarea")
            .should('have.attr', 'placeholder', 'Ask me anything about the dashboard.');

    })
});