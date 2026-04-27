export {};

function assertMultiSelection(widgetId: string, eventWidgetId: string, selection: string[], event: string | null, mdx?: string) {

    cy.assertDropdownMultiSelection(widgetId, selection);

    cy.assertEventValue(eventWidgetId, event);

    if (mdx !== undefined) {

        cy.assertEventMdx(eventWidgetId, mdx);

    }

}


describe("Filters/Autocomplete Lazy Behavior", () => {

    beforeEach(() => {
        cy.login();
        cy.on('window:before:load',(win) => {
            win.Cypress = win.Cypress || {};
            win.Cypress.fakeQRCode = true;
        });
        cy.openViewerTestReport("Filters/QRCode Filter", true, false);
        cy.waitForQueryCount(4);
    });

    it("ww0: Check single selection ", () => {

        const widgetId = "ww0";

        let EXISTING_QR_CODE = "AY463ROXIBYBZ";
        cy.window().then(w => w.Cypress.QRCode = EXISTING_QR_CODE);

        cy.getWidget(widgetId).find(".ic3-scanner-button").click();
        cy.waitForQueryCount(4+2);
        cy.getWidget(widgetId).contains( EXISTING_QR_CODE);

        cy.getWidgetHeader(widgetId).contains( EXISTING_QR_CODE)

    });

    it("ww0: Check multiple selection ", () => {

        const widgetId = "ww1";

        let EXISTING_QR_CODE = "AY463ROXIBYBZ";
        cy.window().then(w => w.Cypress.QRCode = EXISTING_QR_CODE);

        cy.getWidget(widgetId).find(".ic3-scanner-button").click();
        cy.waitForQueryCount(4+2);
        cy.assertDropdownMultiSelection(widgetId, [EXISTING_QR_CODE]);
        cy.getWidgetHeader(widgetId).contains( EXISTING_QR_CODE)

    });

    it("ww0: Check missing QR Code", () => {

        const widgetId = "ww0";

        let MISSING_QR_CODE = "MISSING_QR_CODE";
        cy.window().then(w => w.Cypress.QRCode = MISSING_QR_CODE);

        cy.getWidget(widgetId).find(".ic3-scanner-button").click();
        cy.waitForQueryCount(4+2);
        cy.getWidgetHeader(widgetId).should('not.contain', 'AY463ROXIBYBZ');
        cy.getWidget(widgetId).should('contain', MISSING_QR_CODE)
    });

    it("ww0: Check missing QR Code - multiple", () => {

        const widgetId = "ww1";

        let MISSING_QR_CODE = "MISSING_QR_CODE";
        cy.window().then(w => w.Cypress.QRCode = MISSING_QR_CODE);

        cy.getWidget(widgetId).find(".ic3-scanner-button").click();
        cy.waitForQueryCount(4+2);
        cy.getWidgetHeader(widgetId).should('not.contain', 'AY463ROXIBYBZ');

    });


});
