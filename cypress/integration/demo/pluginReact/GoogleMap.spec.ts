import {PluginReactUtils} from "../pluginReact/PluginReactUtils";

describe("demo/PluginReact/GoogleMap", () => {

    afterEach(() => {

        PluginReactUtils.enablePluginReact(false);

    });

    beforeEach(() => {

        PluginReactUtils.enablePluginReact();

        cy.login();
        cy.openViewerTestReport("Demo/PluginReact/GoogleMap", true, false);
        cy.waitForQueryCount(1);
    });

    it("ww0: Map", () => {

        cy.getWidget("ww0").get(`[title="I'm here : France"]`).click({force: true})

        cy.assertEventValue("ww1", "France")
        cy.assertEventMdx("ww1", "[Geography].[Geography].[Country].&[FR]")

    });

});
