export {};

describe("Application/AppFilterPanelFromLocalStateDateTime", () => {

    beforeEach(() => {
        cy.login();
        cy.clearLocalStorage();
        cy.openViewerTestReport("Filters/Filter Panel/Filter Panel Local Storage Date Time");
    });

    it("test loads from local state : date time", () => {

        const wPanel = "ww0";
        cy.panelFilterAdd(wPanel, "datetime");
        cy.panelFilterSetSelection(wPanel, 0, ["2020-04-10T10:10:20.000Z"]);

        cy.reload();

        // Assert datetime correctly loaded from state.
        cy.assertFilterPanelItems(wPanel, ['datetime']);

    });

});
