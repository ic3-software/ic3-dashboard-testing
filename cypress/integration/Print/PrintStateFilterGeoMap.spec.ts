describe("Print/Print State Filter GeoMap", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Print/Print State Filter GeoMap");
        cy.waitForQueryCount(2);
    });

    it("ww0: Countries", () => {

        cy.selectButton("ww0", "Europe");
        cy.geomapAssertColorAreaCount("ww2", "#ff0000", 10) /* Europe country count */;
        cy.geomapClickColorArea("ww2", "#ff0000", 3) /* France */;
        cy.clickOutside() /* prevent hover color effect */;

        cy.assertButtonSelected("ww0", "Europe");
        cy.geomapAssertColorAreaCount("ww2", "#ff0000", 10 - 1) /* Europe country count -1 */;
        cy.geomapAssertSelectionColorAreaCount("ww2", 1) /* France */;
        cy.assertEventValue("ww3", "Europe");
        cy.assertEventValue("ww4", "France");

        cy.log("### window.reload ###")
        cy.selectButton("ww1", "print-in-browser");
        //
        cy.waitForQueryStatus();
        cy.waitForPrintStatus();
        cy.waitForQueryCount(0);

        cy.assertButtonSelected("ww0", "Europe");
        cy.geomapAssertColorAreaCount("ww2", "#ff0000", 10 - 1) /* Europe country count -1 */;
        cy.geomapAssertSelectionColorAreaCount("ww2", 1) /* France */;
        cy.assertEventValue("ww3", "Europe");
        cy.assertEventValue("ww4", "France");

    });

});
