export {};


describe("embeddedApi/Report Params", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("embeddedApi/Report Params");
        cy.waitForQueryCount(1);

        cy.assertEventMdx("ww1", "∅");
        cy.assertEventValue("ww1", "initName");
    });

    it("Open report with parameters", () => {

        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                reporting.openReport({
                    path: 'shared:/Tests/embeddedApi/Report Params',
                    params: [
                        {
                            channelName: 'testParam',
                            value: [{
                                caption: 'captionFromTest',
                                name: 'nameFromTest',
                                uniqueName: '[Customer].[Customer].[Type].&[CONSUMER]'
                            }]
                        }
                    ]
                });
                cy.waitForQueryCount(2);
                cy.assertEventMdx("ww1", "[Customer].[Customer].[Type].&[CONSUMER]");
                cy.assertEventValue("ww1", "captionFromTest");
            });

    });

    it("Open report with global filter", () => {

        cy.assertTableRowCount("ww0", 6);
        cy.assertTableValue("ww0", 0, 0, "Africa");

        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                reporting.openReport({
                    path: 'shared:/Tests/embeddedApi/Report Params',
                    params: [
                        {
                            channelName: 'ic3-global-filter',
                            value: [{
                                caption: 'global',
                                name: 'globalFilterFromDashboard',
                                uniqueName: '// GLOBAL EVENT FROM DASHBOARD PARAMETER\n' +
                                    'FILTERBY [Geography].[Geography].[Continent].&[OC]'
                            }]
                        }
                    ]
                });
                cy.waitForQueryCount(2);
                cy.assertTableRowCount("ww0", 1);
                cy.assertTableValue("ww0", 0, 0, "Oceania");
            });
    });

});
