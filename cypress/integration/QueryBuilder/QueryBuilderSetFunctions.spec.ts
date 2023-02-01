export {};

describe("Tables/Table Sort", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("QueryBuilder/QueryBuilder Set Functions");
        cy.waitForQueryCount(12 + 12);
    });

    it("line 1", () => {

        cy.assertTableColumnsEqual("ww1", "ww12", 5, 2);
        cy.assertTableColumnsEqual("ww0", "ww13", 5, 2);
        cy.assertTableColumnsEqual("ww4", "ww14", 5, 2);
        cy.assertTableColumnsEqual("ww5", "ww15", 5, 2);

    })

    it("line 2", () => {

        cy.assertTableColumnsEqual("ww2", "ww17", 5, 2);
        cy.assertTableColumnsEqual("ww3", "ww18", 5, 2);
        cy.assertTableColumnsEqual("ww6", "ww19", 3, 2);
        cy.assertTableColumnsEqual("ww7", "ww20", 3, 2);

    })

    it("line 3", () => {

        cy.assertTableColumnsEqual("ww8", "ww22", 2, 2);
        cy.assertTableColumnsEqual("ww9", "ww23", 2, 2);
        cy.assertTableColumnsEqual("ww10", "ww24", 2, 2);
        cy.assertTableColumnsEqual("ww11", "ww25", 5, 2);

    })
});
