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

    it("Repeated Bars:2021,2022!", () => {

        const queryCount = 8;
        const widgetId = "ww2~:Rep-ww1-R:0-C:1";

        cy.waitForQueryCountX(1, queryCount);
        cy.clickUserMenuZoom(widgetId);

        cy.waitForQueryCountX(2, queryCount);
        cy.assertZoomedHeader(widgetId, "Repeated Bars:Europe-Consumer-2021, 2022!");
        cy.closeZoomedWidget(widgetId);

    })


})