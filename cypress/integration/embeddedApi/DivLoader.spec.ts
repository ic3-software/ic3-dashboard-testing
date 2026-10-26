import {loadLibsAndInitialize, LOADER_TIMEOUT, REPORT_PARAMS_PATH, visitLoaderHost} from "./EmbeddedLoaderHost";

/**
 * DIV embedding using DashboardsLoaderDivContext of the @ic3/reporting-api-embedded library.
 *
 * Report (existing) : shared:/Tests/embeddedApi/Report Params (ww0: table, 6 rows, first one "Africa" ;
 *                     ww1: event display of the 'testParam' channel).
 */

const CONTAINER_ID = "ic3-div";

describe("embeddedApi/Div Loader", () => {

    beforeEach(() => {
        cy.login();
        visitLoaderHost(CONTAINER_ID);
    });

    it("loadLibsAndInitialize then open a report", () => {

        loadLibsAndInitialize(CONTAINER_ID, "ic3Ctx", "ic3Reporting");

        cy.window().its("ic3Reporting", {timeout: LOADER_TIMEOUT})
            .should((reporting: any) => expect(reporting.openReport).to.be.a("function"))
            .then((reporting: any) => {
                reporting.openReport({
                    path: REPORT_PARAMS_PATH,
                    params: [
                        {
                            channelName: 'testParam',
                            value: [{
                                caption: 'captionFromDivHost',
                                name: 'nameFromDivHost',
                                uniqueName: '[Customer].[Customer].[Type].&[CONSUMER]'
                            }]
                        }
                    ]
                });
            });

        cy.waitForQueryCount(1);

        cy.get("#" + CONTAINER_ID).find("[data-cy='widget-box-ww0']").should("exist");
        cy.assertTableRowCount("ww0", 6);
        cy.assertTableValue("ww0", 0, 0, "Africa");
        cy.assertEventValue("ww1", "captionFromDivHost");

    });

});
