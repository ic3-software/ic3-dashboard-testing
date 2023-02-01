export {};

describe("Application/SwitchDashboards", () => {

    beforeEach(() => {
        cy.login();
        cy.openAppTestReport("FilterPanel & eventAtStart");
    });

    it("Ensure Clear Cache", () => {

        let expectedQueryCount = 1;

        cy.waitForQueryCount(expectedQueryCount);
        cy.assertTableRowCount("ww0", 6) /* Dashboard: ForEventAtStartTest */;

        cy.appClickMenu(1 /* Dashboard: ForEventAtStartTest */)

        cy.waitForQueryCount(++expectedQueryCount);
        cy.assertTableRowCount("ww0", 6) /* Dashboard: ForEventAtStartTest */;

    });

});
