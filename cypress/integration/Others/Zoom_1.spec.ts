describe("Others/Zoom", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/Zoom");
        cy.waitForQueryCount(5);

        const filterId = "ww3";

        cy.keyCtrl(() => {
            cy.selectButton(filterId, "2022");
        });

    });

    it("ww0:Bars", () => {

        const queryCount = 8;
        const widgetId = "ww0";

        cy.waitForQueryCountX(1, queryCount);
        cy.clickUserMenuZoom(widgetId);

        cy.waitForQueryCountX(2, queryCount);
        cy.assertZoomedHeader(widgetId, "Bars:2021, 2022!");
        cy.closeZoomedWidget(widgetId);

    })

})