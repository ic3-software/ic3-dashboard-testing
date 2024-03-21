function assertLang(language: string) {

    // Header tag (selYear357890) translated.
    cy.getWidgetHeader("ww0").contains(`Selected Year (${language})`);

    // Table data translated.
    cy.assertTableColumnHeader("ww0", 0, `dd Level (${language})`);
    cy.assertTableCellContent("ww0", 0, 0, `toto (${language})`);
    cy.assertTableCellContent("ww0", 1, 0, `baba (${language})`);

}

describe("Others/FallbackLocalization", () => {

    it("Check English tags", () => {

        cy.login();
        cy.openViewerTestReport("Others/fallback lang", undefined, undefined, undefined, 'en');
        cy.waitForQueryCount(1);

        assertLang("EN");
    });

    it("Check French tags", () => {

        cy.login();
        cy.openViewerTestReport("Others/fallback lang", undefined, undefined, undefined, 'fr');
        cy.waitForQueryCount(1);

        assertLang("FR");
    });

    it("Check fallback to English if localization not found (Dutch in this case)", () => {

        cy.login();
        cy.openViewerTestReport("Others/fallback lang", undefined, undefined, undefined, 'nl');
        cy.waitForQueryCount(1);

        assertLang("EN");
    });

    it("Check fallback to English if localization partially not found (Spanish in this case)", () => {

        cy.login();
        cy.openViewerTestReport("Others/fallback lang", undefined, undefined, undefined, 'es');
        cy.waitForQueryCount(1);

        // Header tag (selYear357890) translated.
        cy.getWidgetHeader("ww0").contains(`Selected Year (ES)`);

        // Table data translated.
        cy.assertTableColumnHeader("ww0", 0, `dd Level (EN)`);
        cy.assertTableCellContent("ww0", 0, 0, `toto (EN)`);
        cy.assertTableCellContent("ww0", 1, 0, `baba (ES)`);

    });

})
