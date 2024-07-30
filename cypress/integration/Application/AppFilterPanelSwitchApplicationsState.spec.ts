export {};

function assertPanelEvent(widgetId: string, mdx: string) {
    cy.getWidget(widgetId).find('code').should('have.text', mdx ? '\n' + mdx + '\n' : '\n');
}

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

        assertPanelEvent("ww1", "// GLOBAL FILTER\nFILTERBY {[Purchase Date].[Purchase Date].[Year].&[2019-01-01]}\nFILTERBY {[Geography].[Geography].[City].&[Cairo]&[EG]}");

        // Now switch to an app that has a filter panel where year is not allowed.
        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                reporting.openReportApp({
                    path: 'shared:/Cypress - FilterPanel state & allowed 2',
                });

                cy.waitForQueryCount(4);

                cy.assertFilterPanelItems(wPanel, []);
                assertPanelEvent("ww1", "");

                cy.panelFilterLoadView(wPanel, "foo");

                // Year is not allowed → only city is loaded.
                cy.assertFilterPanelItems(wPanel, ['City']);
                assertPanelEvent("ww1", "// GLOBAL FILTER\nFILTERBY {[Geography].[Geography].[City].&[Cairo]&[EG]}");
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
                assertPanelEvent("ww1", "// GLOBAL FILTER\nFILTERBY {[Purchase Date].[Purchase Date].[Year].&[2019-01-01]}\nFILTERBY {[Geography].[Geography].[City].&[Cairo]&[EG]}");

            });

        // Now switch back again to 2.
        cy.window().its('cypressReporting')
            .then((reporting: any) => {
                reporting.openReportApp({
                    path: 'shared:/Cypress - FilterPanel state & allowed 2',
                });
                cy.waitForQueryCount(7);

                // Assert filter loaded from state.
                cy.assertFilterPanelItems(wPanel, ['City']);
                assertPanelEvent("ww1", "// GLOBAL FILTER\nFILTERBY {[Geography].[Geography].[City].&[Cairo]&[EG]}");

            });

    });

});
