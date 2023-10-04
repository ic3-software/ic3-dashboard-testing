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

        cy.waitForQueryCount(queryCount);
        cy.clickUserMenuZoom(widgetId);

        cy.waitForQueryCount(queryCount);
        cy.assertZoomedHeader(widgetId, "Bars:2021, 2022!");
        cy.closeZoomedWidget(widgetId);

    })

    it("Repeated Bars:2021,2022!", () => {

        const queryCount = 8;
        const widgetId = "ww2~:Rep-ww1-R:0-C:0";

        cy.clickUserMenuZoom(widgetId);
        cy.waitForQueryCount(queryCount);
        cy.assertZoomedHeader(widgetId, "Repeated Bars:Europe-Business-2021, 2022!");
        cy.closeZoomedWidget(widgetId);

    })

    it("Repeated Bars:2021,2022!", () => {

        const queryCount = 8;
        const widgetId = "ww2~:Rep-ww1-R:0-C:1";

        cy.clickUserMenuZoom(widgetId);
        cy.waitForQueryCount(queryCount);
        cy.assertZoomedHeader(widgetId, "Repeated Bars:Europe-Consumer-2021, 2022!");
        cy.closeZoomedWidget(widgetId);

    })

    it("Repetition Widget:2021,2022!", () => {

        const queryCount = 8;
        const widgetId = "ww2";

        cy.clickUserMenuZoom(widgetId);
        cy.waitForQueryCount(queryCount);
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