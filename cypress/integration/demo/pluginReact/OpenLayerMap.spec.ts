import {PluginReactUtils} from "../pluginReact/PluginReactUtils";

describe("demo/PluginReact/OpenLayerMap", () => {

    afterEach(() => {

        PluginReactUtils.enablePluginReact(false);

    });

    beforeEach(() => {

        PluginReactUtils.enablePluginReact();

        cy.login();
        cy.openViewerTestReport("Demo/PluginReact/OpenLayerMap", true, false);
        cy.waitForQueryCount(0);
    });

    it("ww0: Map", () => {

        cy.getWidget("ww0") /* dunno */;

    });

});
