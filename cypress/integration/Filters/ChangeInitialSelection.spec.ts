import {assertButtonsSelection} from "./FilterUtils";

export {};


describe("Filters/Change Initial Selection", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Filters/Change initial selection", true, false);
        cy.waitForQueryCount(1);
    });

    it("ww0: Buttons - Change initial selection in editor", () => {

        /*
        Tests that when changing the initial selection in the interaction tab of the widget editor, that the result
        is directly applied. No need to refresh the dashboard.
         */

        assertButtonsSelection("ww0", "ww1", ["2018", "2019", "2020", "2021", "2022"], [], "");

        cy.widgetEditorOpen("ww0");
        cy.widgetEditorChangeTab("tab-interactions");
        cy.widgetEditorOpenOptionGroup("selection");
        cy.widgetEditorChangeOption("initSelectionUserDefined", "Select the first item");
        cy.widgetEditorApply();
        assertButtonsSelection("ww0", "ww1", ["2018", "2019", "2020", "2021", "2022"], ["2018"], "2018");

        cy.widgetEditorChangeOption("initSelectionUserDefined", "Select the last item");
        cy.widgetEditorApply();
        assertButtonsSelection("ww0", "ww1", ["2018", "2019", "2020", "2021", "2022"], ["2022"], "2022");

        cy.widgetEditorChangeOption("initSelectionUserDefined", "2020");
        cy.widgetEditorApply();
        assertButtonsSelection("ww0", "ww1", ["2018", "2019", "2020", "2021", "2022"], ["2020"], "2020");


    });


});
