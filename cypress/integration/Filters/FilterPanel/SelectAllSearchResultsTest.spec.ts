export {};

describe("Filters/Select All Search Results", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/Select All Search Results");
        cy.waitForQueryCount(0);
    });

    const wPanel = "ww0";
    const wEvent = "ww1";

    it("Select all regular hierarchy", () => {

        cy.panelFilterAdd(wPanel, "pc", 0);
        cy.panelFilterIsAnyOfSearchAndSelectAll(wPanel, 0, "2.2");
        cy.assertEventMdx(wEvent, "{[parent child].[pc].[Level$3].&[6]}");

    })

    it("Select all member only hierarchy", () => {

        cy.panelFilterAdd(wPanel, "pc-member-only", 0);
        cy.panelFilterIsAnyOfSearchAndSelectAll(wPanel, 0, "2.2");
        cy.assertEventMdx(wEvent, "{[parent child membr only].[pc-member-only].[Level$1].&[0],[parent child membr only].[pc-member-only].[Level$2].&[2],[parent child membr only].[pc-member-only].[Level$3].&[6],[parent child membr only].[pc-member-only].[Level$4].&[7]}");

    })

});
