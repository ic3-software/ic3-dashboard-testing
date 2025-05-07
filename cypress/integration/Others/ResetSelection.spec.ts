export {};


describe("Others/reset selection", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/reset selection", true, false);
        cy.waitForQueryCount(3 /* 3 embedded data source */);
        cy.clearAllLocalStorage();
    });

    it("Test app notification to reset selection is working with data dependent initial selection ", () => {

        // Start with buttons selected
        cy.selectButton("ww1", "2020 Feb");
        cy.assertButtonsSelected("ww1", ["2020 Feb"]);
        cy.waitForQueryCount(4);
        cy.selectButton("ww2", "2022");
        cy.assertButtonsSelected("ww2", ["2022"]);
        cy.waitForQueryCount(7);

        // Now clear all selection. Expected to clear both ww1 and ww2.
        cy.selectButton("ww3", "Reset Selection");
        cy.waitForQueryCount(9);

        // Buttons should be in default state: no selection.
        cy.assertButtonsSelected("ww1", ["2020 Mar"]);  // Should be the default selection
        cy.assertButtonsSelected("ww2", []);

    });

});
