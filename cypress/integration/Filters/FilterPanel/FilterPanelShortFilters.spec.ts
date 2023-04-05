export {};

describe("EmbeddedReports/Filter Panel Short Filters", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/Short Filters");
        cy.waitForQueryCount(0);
    });

    const wPanel = "ww0";
    const wEvent = "ww1";

    function assertEvent(value: string) {
        cy.assertEventValue(wEvent, value)
    }

    it("Character", () => {
        const index = 0;
        assertEvent("");
        cy.panelFilterSetSelectionSimple(wPanel, index, "foo");
        assertEvent("{[Character].[Character].[All].&[foo]}");
        cy.panelFilterSetSelectionSimple(wPanel, index, "bar");
        assertEvent("{[Character].[Character].[All].&[foo],[Character].[Character].[All].&[bar]}");
        cy.panelFilterClear(wPanel, index)
    });

    it("Character: date", () => {
        const index = 1
        assertEvent("");
        cy.panelFilterSetSelectionSimple(wPanel, index, "2017-01-10");
        assertEvent('Filter([Character].[Character].[Character].members as b, b.currentMember.getProperty("date",TYPED)==datetime(2017,1,10,0,0,0))');
        cy.panelFilterSetSelectionSimple(wPanel, index, "<null>");
        assertEvent('Filter([Character].[Character].[Character].members as b, b.currentMember.getProperty("date",TYPED)==datetime(2017,1,10,0,0,0) or ISEMPTY(b.currentMember.getProperty("date",TYPED)))');
        cy.panelFilterClear(wPanel, index)
    });

    it("Character: datetime", () => {
        const index = 2;
        assertEvent("");
        cy.panelFilterSetSelectionSimple(wPanel, index, "2015-01-01T10:00:00.000");
        assertEvent('Filter([Character].[Character].[Character].members as b, b.currentMember.getProperty("datetime",TYPED)==datetime(2015,1,1,10,0,0))');
        cy.panelFilterClear(wPanel, index)
    });

    it("Character: character", () => {
        const index = 3;
        assertEvent("");
        cy.panelFilterSetSelectionSimple(wPanel, index, "foo");
        assertEvent('Filter([Character].[Character].[Character].members as b, b.currentMember.getProperty("character",TYPED)=="foo")');
        cy.panelFilterSetSelectionSimple(wPanel, index, "bar");
        assertEvent('Filter([Character].[Character].[Character].members as b, b.currentMember.getProperty("character",TYPED)=="foo" or b.currentMember.getProperty("character",TYPED)=="bar")');
        cy.panelFilterClear(wPanel, index)
    });

    it("Character: logical", () => {
        const index = 4;
        assertEvent("");
        cy.panelFilterSetSelectionSimple(wPanel, index, "false");
        assertEvent('Filter([Character].[Character].[Character].members as b, b.currentMember.getProperty("logical",TYPED)==false)');
        cy.panelFilterSetSelectionSimple(wPanel, index, "<null>");
        assertEvent('Filter([Character].[Character].[Character].members as b, b.currentMember.getProperty("logical",TYPED)==false or ISEMPTY(b.currentMember.getProperty("logical",TYPED)))');
        cy.panelFilterClear(wPanel, index)
    });

    it("Character: numeric", () => {
        const index = 5;
        assertEvent("");
        cy.panelFilterSetSelectionSimple(wPanel, index, /^10$/);
        assertEvent('Filter([Character].[Character].[Character].members as b, b.currentMember.getProperty("numeric",TYPED)==10)');
        cy.panelFilterSetSelectionSimple(wPanel, index, "-10");
        assertEvent('Filter([Character].[Character].[Character].members as b, b.currentMember.getProperty("numeric",TYPED)==10 or b.currentMember.getProperty("numeric",TYPED)==-10)');
        cy.panelFilterClear(wPanel, index)
    });

    it("Year", () => {
        const index = 6;
        assertEvent("");
        cy.panelFilterSetSelectionSimple(wPanel, index, "2015");
        assertEvent('{[Time].[Time].[Year].&[2015-01-01T00:00:00.000]}');
        cy.panelFilterSetSelectionSimple(wPanel, index, "empty-date");
        assertEvent('{[Time].[Time].[Year].&[2015-01-01T00:00:00.000],[Time].[Time].[All].[empty-date]}');
        cy.panelFilterClear(wPanel, index)
    });

    it("Quarter", () => {
        const index = 7;
        assertEvent("");
        cy.panelFilterSetSelectionSimple(wPanel, index, "2015 Q2");
        assertEvent('{[Time].[Time].[Quarter].&[2015-04-01T00:00:00.000]}');
        cy.panelFilterSetSelectionSimple(wPanel, index, "empty-date");
        assertEvent('{[Time].[Time].[Quarter].&[2015-04-01T00:00:00.000],[Time].[Time].[All].[empty-date].[empty-date]}');
        cy.panelFilterClear(wPanel, index)
    });

});
