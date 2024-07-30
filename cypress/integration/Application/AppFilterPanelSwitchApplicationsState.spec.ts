export {};

describe("Application/Switch Applications State", () => {

    beforeEach(() => {
        cy.login();
        cy.openAppTestReport("FilterPanel state & allowed 1");
    });

    it("Switch state without breaking the filter panel due to different allowed filters", () => {

        cy.waitForQueryCount(1);

        const wPanel = "!appFilterPanel";

        // Set the year filter

        cy.panelFilterAdd(wPanel, 'Year');
        cy.panelFilterSetSelection(wPanel, 0, ['2019']);

        cy.panelFilterAdd(wPanel, 'City');
        cy.panelFilterSetSelection(wPanel, 1, ['Cairo']);

        cy.assertFilterPanelCount(wPanel, 2);
        cy.assertFilterPanelItems(wPanel, ['Year', 'City']);
        cy.panelFilterSaveView(wPanel, "foo");
        cy.wait(10);

        // Now switch to an app that has a filter panel where year is not allowed.

        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                reporting.openReportApp({
                    path: 'shared:/Cypress - FilterPanel state & allowed 2',
                });
                cy.waitForQueryCount(4);

                cy.assertFilterPanelItems(wPanel, []);

                cy.panelFilterLoadView(wPanel, "foo");

                // Year is not allowed → only city is loaded.
                cy.assertFilterPanelItems(wPanel, ['City']);

            });


        // Now switch back again.
        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                reporting.openReportApp({
                    path: 'shared:/Cypress - FilterPanel state & allowed 1',
                });

                cy.waitForQueryCount(6);

                // Assert filter loaded from state.
                cy.assertFilterPanelItems(wPanel, ['Year', 'City']);


            });

        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                reporting.openReportApp({
                    path: 'shared:/Cypress - FilterPanel state & allowed 2',
                });
                cy.waitForQueryCount(7);

                // Assert filter loaded from state.
                cy.assertFilterPanelItems(wPanel, ['City']);

            });

    });

});
