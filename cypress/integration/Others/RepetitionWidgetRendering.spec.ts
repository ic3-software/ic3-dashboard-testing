describe("Others/RepetitionWidgetRendering", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/Repetition Widget Rendering", true, true);
        cy.waitForQueryCount(1 + 8 + 1 + 8 + 1);
    });

    it("Test we get what we expect", () => {

        cy.assertRepetitionWidgetRowColumnCount(
            0, "ww2", "ww1", 2, 4,
            ["Business", "Consumer"], ["Africa", "Asia", "Europe", "North America"]
        )

        cy.assertRepetitionWidgetRowColumnCount(
            0, "ww3", "ww4", 2, 4,
            ["Business", "Consumer"], ["Africa", "Asia", "Europe", "North America"]
        )

        cy.assertRepetitionWidgetRowColumnCount(
            0, "ww5", "ww0", 2, 4
        )

    });

})


