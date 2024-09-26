export {};

describe("Tables/Table selection background", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table selection background");
        cy.waitForQueryCount(2);
    });

    it("table1 correct selected background", () => {
        const table1 = "ww0";
        cy.assertTableRowSelected(table1, 1);
    });

    it("table1 rendered background is correct", () => {
        const table1 = "ww0";
        cy.getWidget(table1)
            .find(`.ic3WidgetBox-content div[data-rowindex='${0}'] div[role='gridcell']`)
            .should("have.css", "background-color", "rgb(0, 212, 234)");
    });

    it("table2 correct selected background", () => {
        const table2 = "ww1";
        cy.assertTableRowSelected(table2, 1);
    });

});
