import {assertButtonsSelection} from "./FilterUtils";

export {};


describe("Filters/InitializeSelectionOnNewQuery", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/InitializeSelectionOnNewQuery", true, false);
        cy.waitForQueryCount(2);
    });

    it("ww0: Buttons - Single", () => {

        /*
        Test that the selection of ww1 resets to it's default when changing the query. The query of ww1 is changed by
        making a selection in ww0.
         */

        assertButtonsSelection("ww1", "ww2", ["Q1 2011", "Q2 2011", "Q3 2011", "Q4 2011"], ["Q3 2011", "Q4 2011"], "Q3 2011, Q4 2011");


        cy.selectButton("ww0", "2007");
        cy.waitForQueryCount(2 + 1);
        assertButtonsSelection("ww1", "ww2", ["Q1 2007", "Q2 2007", "Q3 2007", "Q4 2007"], ["Q3 2007", "Q4 2007"], "Q3 2007, Q4 2007");


        cy.selectButton("ww0", "2008");
        cy.waitForQueryCount(2 + 2);
        assertButtonsSelection("ww1", "ww2", ["Q1 2008", "Q2 2008", "Q3 2008", "Q4 2008"], ["Q3 2008", "Q4 2008"], "Q3 2008, Q4 2008");

    });


});
