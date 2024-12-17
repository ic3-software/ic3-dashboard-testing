import {PluginThemeUtils} from "./PluginThemeUtils";

describe("demo/PluginReact/KpiCard", () => {

    afterEach(() => {

        PluginThemeUtils.enablePluginTheme(false);

    });

    beforeEach(() => {

        PluginThemeUtils.enablePluginTheme();

        cy.login();
    });

    function test() {

        // Widget content
        cy.get(".ic3LayoutPage-widgetPageWidgets").eq(0)
            .should("have.css", "inset", "55px 37px");

        // Header
        cy.get("#app-payload div[data-cy='header']").eq(0)
            .should("have.css", "position", "absolute")
            .should("have.css", "top", "18px")
            .should("have.css", "left", "37px")
            .should("have.css", "right", "37px");

        // Footer
        cy.get("#app-payload div[data-cy='footer']").eq(0)
            .should("have.css", "position", "absolute")
            .should("have.css", "bottom", "18px")
            .should("have.css", "left", "37px")
            .should("have.css", "right", "37px");

    }

    it("ww0: footer correct viewer", () => {

        cy.openViewerTestReport("Demo/PluginTheme/A4 landscape header footer", true, false);
        cy.waitForQueryCount(1);

        test();
    });

    it("ww0: footer correct editor", () => {

        cy.openEditorTestReport("Demo/PluginTheme/A4 landscape header footer", true, false);
        cy.waitForQueryCount(1);

        test();

    });

});
