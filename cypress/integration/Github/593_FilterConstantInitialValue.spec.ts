describe("Filters/Buttons Behavior", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("GitHub/593 - Filters initial value on constants", true, false);
        cy.waitForQueryCount(2);
    });

    it("ww0: Buttons - Single", () => {

        const widgetId = "ww1";
        const tableId = "ww0";

        cy.assertButtonsSelected(widgetId, ["License"]);
        cy.assertTableCellContent(tableId, 0, 1, "€678,000");
    });


});


export {};
