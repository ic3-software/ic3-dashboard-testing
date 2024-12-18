import {assertButtonsSelection} from "../Filters/FilterUtils";

export {};

describe("Embedded Reports/Report Different Theme", () => {

    beforeEach(() => {

        cy.login();
        cy.openViewerTestReport("Embedded Reports/theme/parent");
        cy.waitForQueryCount(0);
    });

    it("load report with different theme", () => {

        cy.get("#app-payload .ic3LayoutPage-root")
            .should('have.attr', 'style')
            .and('contain', 'width: 297mm')
            .and('contain', 'height: 210mm')

        cy.selectDropdownFromInput("ww1", 'area report');
        cy.waitForQueryCount(2);

        // Layout of parent remains unchanged.
        cy.get("#app-payload .ic3LayoutPage-root")
            .should('have.attr', 'style')
            .and('contain', 'width: 297mm')
            .and('contain', 'height: 210mm')

    });

});
