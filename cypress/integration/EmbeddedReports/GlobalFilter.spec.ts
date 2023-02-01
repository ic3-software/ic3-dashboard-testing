export {};

describe("Embedded Reports/global-filter", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Embedded Reports/global-filter/master");
        cy.waitForQueryCount(1);
    });

    it("Basics", () => {

        let queryCount = 1;

        cy.panelFilterAdd("ww1", "Country");
        cy.panelFilterSelectOperatorFromInput("ww1", 0, "is any of");
        cy.panelFilterSetSelection("ww1", 0, ["South Africa"]);
        cy.waitForQueryCount(++queryCount);

        cy.assertTableRowCount("_ww0:ww0", 3);

        cy.assertTableValue("_ww0:ww0", 0, 0, "Durban");
        cy.assertTableValue("_ww0:ww0", 1, 0, "Johannesburg");
        cy.assertTableValue("_ww0:ww0", 2, 0, "Pretoria");

        cy.assertTableValue("_ww0:ww0", 0, 1, "81");
        cy.assertTableValue("_ww0:ww0", 1, 1, "99");
        cy.assertTableValue("_ww0:ww0", 2, 1, "99");

        cy.panelFilterClear("ww1", 0);
        cy.waitForQueryCount(++queryCount);

        // cannot assert actual row count => guess rows are lazy rendered
        cy.assertTableValue("_ww0:ww0", 0, 0, "Alexandria");
        cy.assertTableValue("_ww0:ww0", 0, 1, "28");

    })

});
