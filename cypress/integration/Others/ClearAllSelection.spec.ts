export {};


describe("Others/clear all selection", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/clear all selection", true, false);
        cy.waitForQueryCount(3 /* 3 embedded data source */);
    });

    it("Test app notification to clear selection is working", () => {

        // Start with buttons selected
        cy.selectButton("ww1", "2020 Feb");
        cy.assertButtonsSelected("ww1", ["2020 Feb"]);
        cy.selectButton("ww2", "2022");
        cy.assertButtonsSelected("ww2", ["2022"]);

        // Now clear all selection. Expected to clear both ww1 and ww2.
        cy.selectButton("ww3", "Clear Selection");

        // Buttons should be in default state: no selection.
        cy.assertButtonsSelected("ww1", []);
        cy.assertButtonsSelected("ww2", []);

    });

    it("Test app notification to reset selection is working", () => {

        // Start with buttons selected
        cy.selectButton("ww1", "2020 Feb");
        cy.assertButtonsSelected("ww1", ["2020 Feb"]);
        cy.selectButton("ww2", "2022");
        cy.assertButtonsSelected("ww2", ["2022"]);

        // Now clear all selection. Expected to clear both ww1 and ww2.
        cy.selectButton("ww3", "Reset Selection");

        // Buttons should be in default state: no selection.
        cy.assertButtonsSelected("ww1", []);
        cy.assertButtonsSelected("ww2", []);

    });

});
