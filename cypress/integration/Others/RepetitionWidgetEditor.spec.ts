describe( "Others/RepetitionWidgetEditor", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Others/Repetition Widget Editor");
        cy.waitForQueryCount(2);
    });

    it("Ensure the repeated widget is properly displayed", () => {

        // The bug was: waiting for event (ww1 :-> ic3-repetition-row ... )

        cy.assertTableRowCount("ww1", 11)

        cy.assertTableValue("ww1", 0, 0, "Belgium")
        cy.assertTableValue("ww1", 0, 1, "13")

    })

})