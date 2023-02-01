describe("AppStatus/Kpi", () => {

    function toNumber(count: JQuery<HTMLElement>) {
        return parseInt(count.toString());
    }


    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("AppStatus/Kpi");
    });

    const widgetId = "ww2";

    it("Filter", () => {
        //
        // Check queries
        //
        let queryCount = 3;
        cy.waitForQueryCount(queryCount);
        {
            queryCount += 2;
            cy.selectButton(widgetId, "Gold");
            cy.waitForQueryCount(queryCount);
        }


        //
        // Check hooks
        //
        cy.setBoxContentHook('contentHook');

        cy.get('@contentHook').then(count => {

            const hookCount = toNumber(count);
            cy.waitForBoxContentHook(hookCount);

            {
                queryCount += 2;
                cy.selectButton(widgetId, "Silver");
                cy.waitForQueryCount(queryCount);
                cy.waitForBoxContentHook(hookCount + 3);
            }

        });


    })


})