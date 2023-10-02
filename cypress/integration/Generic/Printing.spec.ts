import {DashboardExpectedStatus, extractDashboardInfos} from "./dashboards/DashboardsUtils";
import {ALL_DASHBOARDS} from "../../../etc/data/AllDashboards";


describe("Printing", () => {

    const dashboard = undefined; // "/Repetition";
    const dashboards = extractDashboardInfos(ALL_DASHBOARDS, dashboard);

    const status: DashboardExpectedStatus = {
        "shared:/Embedded/1way": {
            widgets: [{
                widgetId: "ww2", renderType: "data-cy-waiting"
            }]
        },
        "shared:/Embedded/1wayDynamicQuery": {
            widgets: [{
                widgetId: "ww0", renderType: "data-cy-waiting"
            }]
        },
        "shared:/Live Demo/Filters/Filter Panel": {
            widgets: [{
                widgetId: "ww6", renderType: "data-cy-waiting"
            }]
        },
        "shared:/Live Demo/How To/Connected Filters": {
            widgets: [{
                widgetId: "ww20", renderType: "data-cy-waiting"
            }, {
                widgetId: "ww3", renderType: "data-cy-waiting"
            }]
        },
        "shared:/Live Demo/Miscellaneous/MDX Query Builder widget": {
            widgets: [{
                widgetId: "ww0", renderType: "data-cy-waiting"
            }]
        },
        "shared:/Live Demo/How To/Drillthrough": {
            ignored: true,
        },
    }

    dashboards.dashboards.forEach(dashboard => {

        it("Dashboard: " + dashboard.path, () => {

            cy.viewport(794 + 50, 1123 + 50) /* A4: not relevant but better when looking at the Cypress runner */;

            const expected = status[dashboard.path];

            if (expected) {

                if (expected.ignored) {
                    return;
                }

                cy.openPrintInBrowserTestReport(dashboard.path, false, false);
                cy.performLogin();

                expected.widgets?.forEach(status => {

                    cy.getWidget(status.widgetId, status.renderType);

                });

            } else {

                cy.openPrintInBrowserTestReport(dashboard.path, false, false);
                cy.performLogin();

                cy.get('[data-cy="app-print-status"]', {timeout: 10000})
                    .should('have.class', 'data-cy-ready')
                ;

            }

            // ensure none of the widget are rendered on error (was repetition widget)

            cy.get('[data-cy="render-info"][data-cy-type="data-cy-template-render-error"]')
                .should("have.length", 0)
            ;

            cy.get('[data-cy="render-error"]')
                .should("have.length", 0)
            ;

            cy.wait(500) /* quick visual inspection to ensure it looks good */;

        })
    });

})

