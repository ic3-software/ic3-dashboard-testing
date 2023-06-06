
describe("Others/Schema Not Authorized", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/Schema Not Authorized", false, false);
    });

    it("SchemaNotAuthorized", () => {

        cy.get('[data-cy-type="data-cy-schema-not-authorized"]')
            .should('have.length', 1)
        ;

    })

})