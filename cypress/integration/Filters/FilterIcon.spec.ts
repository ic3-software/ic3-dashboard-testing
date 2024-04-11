export {};

describe("Filters/Filter icon", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter icon", true, false);
        cy.waitForQueryCount(2);
    });

    it("ww0: Is not filtered by buttons", () => {

        // Mandatory event in builder is not used because ww0 uses the mdx query.
        cy.getWidget("ww0").find('[data-cy-type="data-cy-waiting"]').should('not.exist');

        cy.selectButton("ww1", "Personal");

        // Ww0 has the event in the builder query. Ww0 uses the mdx query. The event should not be in the filter
        // icon.
        cy.getWidget("ww0").find("[data-cy='queryFilterIcon']").should('not.exist');

    })

});
