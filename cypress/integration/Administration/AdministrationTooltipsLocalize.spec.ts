describe("Administration/Localize tooltips", () => {

    beforeEach(() => {
        cy.login();
        cy.openAdministration();
    });

    it("test filter", () => {

        cy.adminSetDashboardFilter('LocalizeTagsTooltip');
        cy.adminTestFilter();
        cy.adminAssertTagsTestResult('shared:/Tests/Administration/LocalizeTagsTooltip');

    });

    it("assert tooltips are in the localization export", () => {

        cy.adminSetDashboardFilter('LocalizeTagsTooltip');
        cy.adminGenerateTags();
        cy.adminAssertLocalizationRowCount(6);
        cy.adminAssertLocalizationColumnCount(8);

        cy.adminAssertLocalizationTableTags("shared:/Tests/Administration/LocalizeTagsTooltip",
            [
                "with tooltip",
                "with dialog box",
                "my-tooltip-123",
                "my-dialog-help-123",
                "Waiting for Event",
                "No Data"
            ]);

    });

});