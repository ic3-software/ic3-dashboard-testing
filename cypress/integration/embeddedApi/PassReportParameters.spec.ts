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

    it("Open report: onDefinition and onSuccess callbacks", () => {

        const calls: string[] = [];

        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                return new Promise(resolve => reporting.openReport({
                    path: 'shared:/Tests/embeddedApi/Report Params',
                    onDefinition: (report: any) => {
                        calls.push("onDefinition");
                        calls.push(report.getName());
                        calls.push(report.getPath());
                        calls.push(report.getDefaultSchemaName());
                    },
                    onError: () => {
                        calls.push("onError");
                        return true;
                    },
                    onSuccess: () => {
                        calls.push("onSuccess");
                        resolve(true);
                    }
                }, false));
            })
            .then(() => {
                expect(calls).to.deep.equal([
                    "onDefinition",
                    "Report Params",
                    "shared:/Tests/embeddedApi/Report Params",
                    "Sales (LiveDemo)",
                    "onSuccess",
                ]);
                cy.waitForQueryCount(2);
                cy.assertTableValue("ww0", 0, 0, "Africa");
            });

    });

    it("Open report: onError callback on a non-existing report", () => {

        const calls: string[] = [];

        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                return new Promise(resolve => reporting.openReport({
                    path: 'shared:/Tests/embeddedApi/Report Params (does not exist)',
                    onDefinition: () => {
                        calls.push("onDefinition");
                    },
                    onError: (error: any) => {
                        calls.push("onError");
                        resolve(error);
                        return true /* handled: no default error dispatch */;
                    },
                    onSuccess: () => {
                        calls.push("onSuccess");
                        resolve(undefined);
                    }
                }, false));
            })
            .then((error: any) => {
                expect(calls).to.deep.equal(["onError"]);
                expect(error).to.exist;
            });

    });

    it("Fire event", () => {

        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                reporting.fireEvent('testParam', [
                    {
                        caption: 'Consumer',
                        name: 'CONSUMER',
                        uniqueName: '[Customer].[Customer].[Type].&[CONSUMER]'
                    },
                    {
                        caption: 'Corporate',
                        name: 'CORPORATE',
                        uniqueName: '[Customer].[Customer].[Type].&[CORPORATE]'
                    }
                ]);
            });

        cy.assertEventMdx("ww1", "{[Customer].[Customer].[Type].&[CONSUMER],[Customer].[Customer].[Type].&[CORPORATE]}");
        cy.assertEventValue("ww1", "Consumer, Corporate");

    });

    it("Fire event: single item (not an array)", () => {

        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                reporting.fireEvent('testParam', {
                    caption: 'captionFromFireEvent',
                    name: 'nameFromFireEvent',
                    uniqueName: '[Customer].[Customer].[Type].&[CONSUMER]'
                });
            });

        cy.assertEventMdx("ww1", "[Customer].[Customer].[Type].&[CONSUMER]");
        cy.assertEventValue("ww1", "captionFromFireEvent");

    });

    it("Fire event: global filter", () => {

        cy.assertTableRowCount("ww0", 6);

        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                reporting.fireEvent('ic3-global-filter', {
                    caption: 'global',
                    name: 'globalFilterFromFireEvent',
                    uniqueName: 'FILTERBY [Geography].[Geography].[Continent].&[OC]'
                });
            });

        cy.waitForQueryCount(2);
        cy.assertTableRowCount("ww0", 1);
        cy.assertTableValue("ww0", 0, 0, "Oceania");

    });

    it("Listen to events (onEvent)", () => {

        const received: any[] = [];

        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                reporting.onEvent('testParam', (value: any) => received.push(value));
                reporting.fireEvent('testParam', [{
                    caption: 'captionFromFireEvent',
                    name: 'nameFromFireEvent',
                    uniqueName: '[Customer].[Customer].[Type].&[CONSUMER]'
                }]);
            });

        cy.assertEventValue("ww1", "captionFromFireEvent");

        cy.wrap(received).should("deep.equal", [
            [{
                caption: 'captionFromFireEvent',
                name: 'nameFromFireEvent',
                uniqueName: '[Customer].[Customer].[Type].&[CONSUMER]'
            }]
        ]);

    });

    it("Listen to the report loaded event (onEvent)", () => {

        const received: any[] = [];

        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                reporting.onEvent('ic3_onReportLoaded', (value: any) => received.push(value));
                reporting.openReport({
                    path: 'shared:/Tests/embeddedApi/Report Params',
                }, false);
            });

        cy.waitForQueryCount(2);

        cy.wrap(received).should("deep.equal", [{
            caption: "Report Params",
            name: "Report Params",
            uniqueName: "shared:/Tests/embeddedApi/Report Params",
        }]);

    });

    it("Version and paths", () => {

        cy.window().its('cypressReporting')
            .then((reporting: any) => {

                expect(reporting.getVersion().version).to.match(/^\d+\.\d+\.\d+/);

                const root = reporting.getRootPaths();
                expect(root.shared.path).to.equal("shared:");

                return new Promise((resolve, reject) => reporting.getDashboardPaths("shared:/Tests/embeddedApi", {
                    onSuccess: resolve,
                    onError: reject
                }));
            })
            .then((paths: any) => {
                expect(paths).to.deep.include({
                    folder: false,
                    name: "Report Params",
                    path: "shared:/Tests/embeddedApi/Report Params"
                });
            });

        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                return new Promise((resolve, reject) => reporting.getDashboardPaths("shared:/Tests", {
                    onSuccess: resolve,
                    onError: reject
                }));
            })
            .then((paths: any) => {
                expect(paths).to.deep.include({
                    folder: true,
                    name: "embeddedApi",
                    path: "shared:/Tests/embeddedApi"
                });
            });

    });

});
