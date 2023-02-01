describe("AppStatus/Simple", () => {

    function toNumber(count: JQuery<HTMLElement>) {
        return parseInt(count.toString());
    }

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("AppStatus/Simple");
    });

    const widgetId = "ww2";

    it("Filter", () => {
        //
        // Check queries
        //
        let queryCount = 3;
        let chartRenderingCount = 4;
        cy.log("### waitForQueryCount:" + queryCount)
        cy.waitForQueryCount(queryCount);
        {
            cy.log("### waitForChartRendering:" + chartRenderingCount)
            cy.waitForChartRendering(chartRenderingCount);

            queryCount += 2;
            chartRenderingCount += 2;
            cy.log("### SELECT 2019 Q2")
            cy.selectButton(widgetId, "2019 Q2");
            cy.waitForQueryCount(queryCount);
            // cy.waitForChartRendering(chartRenderingCount);
        }

        {
            queryCount += 1
            cy.log("### SELECT Consumer")
            cy.selectButton('ww3', "Consumer");
            cy.waitForQueryCount(queryCount);
        }

        {
            queryCount += 2;
            cy.log("### SELECT 2019 Q4")
            cy.selectButton(widgetId, "2019 Q4");
            cy.waitForQueryCount(queryCount);
        }

        {
            queryCount += 1
            cy.log("### SELECT Business")
            cy.selectButton('ww3', "Business");
            cy.waitForQueryCount(queryCount);
        }


        //
        // Check hooks
        //
        cy.setBoxContentHook('contentHook');

        cy.get('@contentHook').then(count => {

            const hookCount = toNumber(count);
            cy.log("### waitForBoxContentHook:" + hookCount)
            cy.waitForBoxContentHook(hookCount);

            {
                queryCount += 2;
                cy.selectButton(widgetId, "2022 Q1");
                cy.waitForQueryCount(queryCount);
                cy.log("### waitForBoxContentHook+3:" + (hookCount + 3))
                cy.waitForBoxContentHook(hookCount + 3);
            }

        });


    })


})