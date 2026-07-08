import {assertButtonsSelection} from "./FilterUtils";

export {};


describe("Filters/InitializeSelectionOnNewQueryII", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/InitializeSelectionOnNewQueryII", true, false);
        cy.waitForQueryCount(2);
    });

    it("Dropdown responds", () => {

        /*
        The dropdown is self subscribing. We want the initial selection on new query option to take precedence.
         */

        assertButtonsSelection("ww0", "ww1", ["2018", "2019", "2020", "2021", "2022"], ["2018"], "2018");
        cy.selectButton("ww0", "2021");
        cy.waitForQueryCount(2 + 1);
        assertButtonsSelection("ww0", "ww1", ["2018", "2019", "2020", "2021", "2022"], ["2021"], "2021");

        // Dropdown
        cy.assertEventValue("ww3", "2021 Mar");
        cy.assertDropdownSingleSelection("ww2", "2021 Mar");

    });


});
