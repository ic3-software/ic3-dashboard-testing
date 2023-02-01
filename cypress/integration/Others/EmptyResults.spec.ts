function getButtonWithName(widgetId: string, name: string) {

    return cy.getWidget(widgetId)
        .find('[data-cy="ic-button"][data-name="' + name + '"]')
        ;

}

describe("Others/EmptyResults", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/EmptyResults");
        cy.waitForQueryCount(5);
    });

    it("ww3:Buttons cell_properties cell_ordinal", () => {

        getButtonWithName("ww3", "Africa");
        getButtonWithName("ww3", "Asia",);
        getButtonWithName("ww3", "Europe");
        getButtonWithName("ww3", "North America");
        getButtonWithName("ww3", "South America");

        cy.getWidget("ww8", "data-cy-no-data");
        cy.getWidget("ww0", "data-cy-no-data");
        cy.getWidget("ww2", "data-cy-no-data");
        cy.getWidget("ww1", "data-cy-no-data");
    })

})