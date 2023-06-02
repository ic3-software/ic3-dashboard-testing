export {};

describe("Filters/Filter Datetime Picker", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/Set Default Filter Datetime");
        cy.waitForQueryCount(0);
    });

    it("Set default filter datetime", () => {

        const wPanel = "ww0";
        const wEvent = "ww1";

        // Check open onInit
        {
            cy.panelFilterAdd(wPanel, "Character: datetime");
            cy.panelFilterSelectOperatorFromInput(wPanel, 0, "Equals");

            cy.getWidget(wPanel)
                .find("[data-cy='value-selector-text'] input")
                .click()
                .get(".MuiPickersPopper-root");  // DatePicker calendar

            cy.panelFilterRemove(wPanel, 0);
        }

        // Business as usual
        {
            // Date
            // cy.panelFilterRemove(wPanel, 0);
            cy.panelFilterAdd(wPanel, "Character: date");
            cy.panelFilterSelectOperatorFromInput(wPanel, 0, "Equals");
            cy.panelFilterSetDateFieldValue(wPanel, 0, "2016-02-03");
            cy.assertEventValue(wEvent, "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"date\", TYPED) == datetime(2016,2,3,0,0,0))");

            // Date/Time
            cy.panelFilterRemove(wPanel, 0);
            cy.panelFilterAdd(wPanel, "Character: datetime");
            cy.panelFilterSelectOperatorFromInput(wPanel, 0, "Equals");
            // cy.panelFilterSetDateTimeFieldValue(wPanel, 0, "2016-02-03 01:05:10"); does not like the space !
            cy.panelFilterSetDateTimeFieldValue(wPanel, 0, "2016-02-0301:05:10");
            cy.assertEventValue(wEvent, "Filter([Character].[Character].[Character].members as b,b.currentMember.getProperty(\"datetime\", TYPED) == datetime(2016,2,3,1,5,10))");

        }

    })

});