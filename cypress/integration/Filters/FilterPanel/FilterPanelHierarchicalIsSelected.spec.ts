export {};

describe("Filters/FilterPanelHierarchicalIsSelected", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/FilterPanelHierarchicalIsSelected");
        cy.waitForQueryCount(0);
    });

    it("Test intermediate selection", () => {

        //Selected in normal hierarchy
        cy.assertFilterPanelItemIntermediate("ww0", 0, 9);
        cy.assertFilterPanelItemIntermediate("ww1", 0, 9);

        //Selected in fake hierarchy
        cy.assertFilterPanelItemIntermediate("ww0", 1, 9, true);
        cy.assertFilterPanelItemIntermediate("ww1", 1, 9, true);

    });

});
