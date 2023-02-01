import {PluginReactUtils} from "../pluginReact/PluginReactUtils";

describe("demo/PluginReact/KpiCard", () => {

    afterEach(() => {

        PluginReactUtils.enablePluginReact(false);

    });

    beforeEach(() => {

        PluginReactUtils.enablePluginReact();

        cy.login();
        cy.openViewerTestReport("Demo/PluginReact/KpiCard", true, false);
        cy.waitForQueryCount(1);
    });

    it("ww0: KPI", () => {

        cy.getWidget("ww0").get("span").contains("€522,150")

    });

});
