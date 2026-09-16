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

    it("Repetition Widget:2021,2022!", () => {

        const queryCount = 8;
        const widgetId = "ww2";

        cy.waitForQueryCountX(1, queryCount);
        cy.clickUserMenuZoom(widgetId);

        cy.waitForQueryCountX(2, queryCount);
        cy.assertZoomedHeader(widgetId, "Repetition Widget:2021, 2022!");

        cy.getZoomedWidget(widgetId)
            .find('[data-cy="widget-box-' + "ww2~:Rep-ww1-R:0-C:0" + '"]')
            .find('[data-cy="widget-box-header-' + "ww2~:Rep-ww1-R:0-C:0" + '"]')
            .contains("Repeated Bars:Europe-Business-2021, 2022!")
        ;

        cy.getZoomedWidget(widgetId)
            .find('[data-cy="widget-box-' + "ww2~:Rep-ww1-R:0-C:1" + '"]')
            .find('[data-cy="widget-box-header-' + "ww2~:Rep-ww1-R:0-C:1" + '"]')
            .contains("Repeated Bars:Europe-Consumer-2021, 2022!")
        ;

        // cy.closeZoomedWidget(widgetId);

    })

})