export {};

describe("Embedded Reports/EmbeddedWidgetExport", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Embedded Reports/rendering-issue/master");
        cy.waitForQueryCount(0);
    });

    it("Basics", () => {

        cy.selectButton("ww1", "desktop");
        cy.waitForQueryCount(2);


        cy.clickUserMenu("ww0", "export_xls", "default");
        cy.readFileFromDownload("Tableau de Bord _ desktop.xlsx")

    })

});
