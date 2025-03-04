export {};

describe("Filters/Datepicker empty query", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Datepicker empty query", true, false);
        cy.waitForQueryCount(2);
    });

    it("check no data", () => {
        cy.assertDatePicker("ww0", null);
        cy.assertWidgetNoData("ww1");
    });

});
