export {};

describe("EmbeddedReports/Set Default Filter Datetime", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Filters/Filter Panel/Set Default Filter Datetime");
        cy.waitForQueryCount(0);
    });

    it("Set default filter datetime", () => {

        const wPanel = "ww0";
        const wEvent = "ww1";

        cy.panelFilterAdd(wPanel, "Character: datetime");
        cy.panelFilterSelectOperatorFromInput(wPanel, 0, "Equals");
        cy.panelFilterSetDateTimeFieldValue(wPanel, 0, "2016-02-03 00:00:00");

        cy.panelFilterSetDefaultFilter(wPanel);

        cy.refreshDashboard();

        cy.assertEventValue(wEvent, "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"datetime\", TYPED) == datetime(2016,2,3,0,0,0))");

    })

});
