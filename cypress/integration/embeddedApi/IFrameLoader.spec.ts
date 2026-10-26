import {LOADER_TIMEOUT, REPORT_PARAMS_PATH, visitLoaderHost} from "./EmbeddedLoaderHost";

/**
 * iFrame embedding using DashboardsLoaderFrame() of the @ic3/reporting-api-embedded library : the onReady callback
 * (?ic3callback=ic3loader.<containerId>) is receiving the IReporting instance of the icCube iFrame.
 *
 * M-14 : the callback crashed the icCube start-up when the container id contains a '.' (the cross-origin host case
 * is not covered : the host page has to be same-origin for the icCube session cookie).
 *
 * Report (existing) : shared:/Tests/embeddedApi/Report Params (ww0: table, 6 rows, first one "Africa" ;
 *                     ww1: event display of the 'testParam' channel).
 */

const CONTAINER_ID = "ic3.embedded.container";

function getFrameBody() {
    return cy.get("#ic3-frame")
        .its("0.contentDocument.body", {timeout: LOADER_TIMEOUT})
        .should("not.be.empty")
        .then(cy.wrap);
}

describe("embeddedApi/IFrame Loader", () => {

    beforeEach(() => {
        cy.login();
        visitLoaderHost(CONTAINER_ID);
    });

    it("onReady callback (container id containing '.') and fireEvent", () => {

        cy.window().then((win: any) => {

            win.ic3EmbeddedLoader.DashboardsLoaderFrame({
                containerId: CONTAINER_ID,
                frameId: "ic3-frame",
                url: "/icCube/report/viewer?ic3report=" + encodeURIComponent(REPORT_PARAMS_PATH),
                onReady: (ic3: any) => win.ic3FrameReporting = ic3,
            });

        });

        // The start-up has not been interrupted : the report is rendered within the iFrame.
        getFrameBody()
            .find("[data-cy='widget-box-ww0']", {timeout: LOADER_TIMEOUT})
            .should("contain.text", "Africa");

        getFrameBody()
            .find("[data-cy='widget-box-ww1']")
            .should("contain.text", "initName");

        // The host callback has been called with the IReporting instance of the iFrame.
        cy.window().its("ic3FrameReporting", {timeout: LOADER_TIMEOUT})
            .should((reporting: any) => expect(reporting.fireEvent).to.be.a("function"))
            .then((reporting: any) => {
                reporting.fireEvent('testParam', [{
                    caption: 'captionFromFrameHost',
                    name: 'nameFromFrameHost',
                    uniqueName: '[Customer].[Customer].[Type].&[CONSUMER]'
                }]);
            });

        getFrameBody()
            .find("[data-cy='widget-box-ww1']")
            .should("contain.text", "captionFromFrameHost");

    });

});
