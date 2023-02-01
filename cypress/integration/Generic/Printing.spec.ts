import {DashboardExpectedStatus, extractDashboardInfos} from "./dashboards/DashboardsUtils";
import {ALL_DASHBOARDS} from "../../../etc/data/AllDashboards";
import VisitOptions = Cypress.VisitOptions;

function createPrintingURL(path: string): Partial<VisitOptions> & { url: string } {

    return {
        url: Cypress.config().baseUrl === "http://localhost:3000" ? "/viewer" : "/icCube/report/viewer",

        qs: {
            // ic3appLocalUrl: "dft",
            //
            // ic3dataSource: JSON.stringify({
            //     url: Cypress.config().baseUrl + "/icCube/gvi"
            // }),

            ic3report: path,

            ic3printParams: JSON.stringify({

                fitToPage: "true",
                scale: 1.0,

                // Letter

                pageSizeName: "Letter",
                pageOrientation: "portrait",

                pageSizeUnits: "in",
                pageHeight: 11,
                pageWidth: 8.5,

                marginTop: 0.0,
                marginLeft: 0.0,
                marginRight: 0.0,
                marginBottom: 0.0,
            })
        }
    }
}

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
        "shared:/Live Demo/Overview": {
            widgets: [{
                widgetId: "ww4", renderType: "data-cy-waiting"
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

            cy.viewport(816, 1056) /* Letter: not relevant but better when looking at the Cypress runner */;

            const vURL = createPrintingURL(dashboard.path);

            const expected = status[dashboard.path];

            if (expected) {

                if (expected.ignored) {
                    return;
                }

                cy.visit(vURL);
                cy.performLogin();

                expected.widgets?.forEach(status => {

                    cy.getWidget(status.widgetId, status.renderType);

                });

            } else {

                cy.visit(vURL);
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

