export {};

function assertEventValue(eventWidgetId: string, event: string | null) {

    cy.assertEventValue(eventWidgetId, event);

}


describe("Filters/Filters keep state when switching page", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Filters/Filters keep state page switch", true, false);
        cy.waitForQueryCount(2);
    });

    it("Filter values are remembered when switching page", () => {

        const buttonsIdPage1 = "ww0"
        const eventArticleIdPage1 = "ww5";
        const eventCountryIdPage1 = "ww4";
        const buttonsIdPage2 = "ww3"
        const eventArticleIdPage2 = "ww1";
        const eventCountryIdPage2 = "ww2";

        // Assert initial values
        assertEventValue(eventArticleIdPage1, "");
        assertEventValue(eventCountryIdPage1, "China");

        // Click India, event should keep state when switching page and returning to this page.
        const toClick = "India";
        cy.selectCheckbox(buttonsIdPage1, toClick);
        assertEventValue(eventArticleIdPage1, "");
        assertEventValue(eventCountryIdPage1, toClick);

        cy.clickNextPage();

        assertEventValue(eventArticleIdPage2, "Gold");  // Event now initialized by ww3
        assertEventValue(eventCountryIdPage2, toClick);

        cy.clickPreviousPage();

        assertEventValue(eventArticleIdPage1, "Gold");  // Event now initialized by ww3
        assertEventValue(eventCountryIdPage1, toClick);

    });

});
