describe("ChatBot/widgetOffViewport", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("ChatBot/widgetOffViewport");
        cy.waitForQueryCount(1);
    });

    it("chatbot says: Ask me anything about the widget : Table.", () => {

        cy.getWidget("ww0").find("div.ic3AIWidgetChatBot-messageContent > p")
            .should('have.text', 'Ask me anything about the widget : Table.');

    })
});