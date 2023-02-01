import {PluginJSUtils} from "./PluginJSUtils";

describe("demo/pluginJS/SimpleDropdown", () => {

    afterEach(() => {

        PluginJSUtils.enablePluginJS(false);

    });

    beforeEach(() => {

        PluginJSUtils.enablePluginJS();

        cy.login();
        cy.openViewerTestReport("Demo/PluginJS/SimpleDropdown", true, false);
        cy.waitForQueryCount(1);
    });

    it("ww0: SimpleDropdown", () => {

        cy.assertEventValue("ww1", null)
        cy.assertEventMdx("ww1", null)

        cy.getWidget("ww0").get("select")
            .select("[Geography].[Geography].[Continent].&[AS]");

        cy.assertEventValue("ww1", "Asia")
        cy.assertEventMdx("ww1", "[Geography].[Geography].[Continent].&[AS]")

        cy.waitForQueryCount(1);

    });

});
