export {};

describe("Embedded Reports/constants", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Embedded Reports/relative path/parent");
        cy.waitForQueryCount(0);
    });

    it("Basics", () => {

        cy.getWidget("_ww0:ww0").get("h2").contains("Dashboard");

        cy.getWidget("_ww2:ww0").find("h2").contains("Dashboard");

        cy.getWidget("ww1").find("div[data-cy-type='data-cy-report-not-available']");
        cy.getWidget("ww1").find("div.ic3WidgetBoxContentMessage-content").contains("The report '/shared/Tests/Embedded Reports/relative path/testFolder/NOT_FOUND' does not exist.");

        cy.getWidget("ww3").find("div[data-cy-type='data-cy-report-not-available']");
        cy.getWidget("ww3").find("div.ic3WidgetBoxContentMessage-content").contains("The report '/shared/Tests/Embedded Reports/aa' does not exist.");

    });

});
