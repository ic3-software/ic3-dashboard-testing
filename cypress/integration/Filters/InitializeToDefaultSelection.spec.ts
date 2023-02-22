import {assertButtonsSelection} from "./FilterUtils";

export {};


describe("Filters/InitializeSelectionOnNewQuery", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/InitializeSelectionOnNewQuery", true, false);
        cy.waitForQueryCount(8);
    });

    it("ww0: Buttons", () => {
        function checkInitialState() {
            cy.assertButtonSelected("ww0", "2011");
            cy.assertButtonSelected("ww1", "2011");
            cy.assertButtonSelected("ww2", "2011");
            cy.assertButtonsSelected("ww3", ["2005", "2006"]);
        }

        checkInitialState();

        cy.selectButton("ww0", "2007");
        cy.selectButton("ww1", "2007");
        cy.selectButton("ww2", "2007");
        cy.selectButton("ww3", "2007");

        cy.assertButtonSelected("ww0", "2007");
        cy.assertButtonSelected("ww1", "2007");
        cy.assertButtonSelected("ww2", "2007");
        cy.assertButtonSelected("ww3", "2007");

        cy.clickUserMenuToInitialState("ww0");
        cy.clickUserMenuToInitialState("ww1");
        cy.clickUserMenuToInitialState("ww2");
        cy.clickUserMenuToInitialState("ww3");

        checkInitialState();

    });


});
