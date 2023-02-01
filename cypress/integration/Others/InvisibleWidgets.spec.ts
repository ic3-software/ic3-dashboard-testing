import {assertButtonsSelection} from "../Filters/FilterUtils";

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

describe("Others/Invisible Widgets", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/Invisible Widgets");
        cy.waitForQueryCount(3);
    });

    it("Viewer", () => {

        assertButtonsSelection("ww1", "ww0", ["Africa", "Asia & Pacific", "Europe"], ["Africa"], "Africa");
        // assertButtonsSelection("ww2", "ww3", ["Africa", "Asia & Pacific","Europe"], ["Asia & Pacific"], "Asia & Pacific");
        assertButtonsSelection("ww4", "ww5", ["Africa", "Asia & Pacific", "Europe"], ["Europe"], "Europe");

        cy.assertWidgetInvisible("ww2");
        cy.assertEventValue("ww3", "Asia & Pacific");

    })

    it("Editor", () => {

        assertButtonsSelection("ww1", "ww0", ["Africa", "Asia & Pacific", "Europe"], ["Africa"], "Africa");
        assertButtonsSelection("ww2", "ww3", ["Africa", "Asia & Pacific", "Europe"], ["Asia & Pacific"], "Asia & Pacific");
        assertButtonsSelection("ww4", "ww5", ["Africa", "Asia & Pacific", "Europe"], ["Europe"], "Europe");
    })

    it("Printing", () => {

        cy.visit(createPrintingURL("shared:/Tests/Others/Invisible Widgets"));

        cy.get('[data-cy="app-print-status"]', {timeout: 10000})
            .should('have.class', 'data-cy-ready')
        ;

        cy.waitForQueryCount(3);

        assertButtonsSelection("ww1", "ww0", ["Africa", "Asia & Pacific", "Europe"], ["Africa"], "Africa");
        // assertButtonsSelection("ww2", "ww3", ["Africa", "Asia & Pacific","Europe"], ["Asia & Pacific"], "Asia & Pacific");
        // assertButtonsSelection("ww4", "ww5", ["Africa", "Asia & Pacific","Europe"], ["Europe"], "Europe");

        cy.assertWidgetInvisible("ww2");
        cy.assertEventValue("ww3", "Asia & Pacific");

        cy.assertWidgetInvisible("ww4");
        cy.assertEventValue("ww5", "Europe");
    })

})