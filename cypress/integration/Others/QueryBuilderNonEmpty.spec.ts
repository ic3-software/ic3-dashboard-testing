describe("Others/QueryBuilderNonEmpty", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/QueryBuilderNonEmpty");
        cy.waitForQueryCount(2);
    });

    it("ww0: without empty rows/columns", () => {

        const widgetId = "ww0";

        cy.assertTableRowCount(widgetId, 1);
        cy.assertTableColCount(widgetId, 3);

        cy.assertTableValue(widgetId, 0, 0, "2018")
        cy.assertTableValue(widgetId, 0, 1, "China")
        cy.assertTableValue(widgetId, 0, 2, "3")
    })

    it("ww2: without empty rows/columns", () => {

        const widgetId = "ww2";

        cy.assertTableRowCount(widgetId, 2);
        cy.assertTableColCount(widgetId, 4);

        cy.assertTableValue(widgetId, 0, 0, "2018")
        cy.assertTableValue(widgetId, 0, 1, "Egypt")
        cy.assertTableValue(widgetId, 0, 2, null)
        cy.assertTableValue(widgetId, 0, 3, null)

        cy.assertTableValue(widgetId, 1, 0, "2018")
        cy.assertTableValue(widgetId, 1, 1, "China")
        cy.assertTableValue(widgetId, 1, 2, null)
        cy.assertTableValue(widgetId, 1, 3, "3")
    })

})