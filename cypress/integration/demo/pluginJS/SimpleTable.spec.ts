import {PluginJSUtils} from "./PluginJSUtils";

describe("demo/pluginJS/SimpleTable", () => {

    afterEach(() => {

        PluginJSUtils.enablePluginJS(false);

    });

    beforeEach(() => {

        PluginJSUtils.enablePluginJS();

        cy.login();
        cy.openViewerTestReport("Demo/PluginJS/SimpleTable", true, false);
        cy.waitForQueryCount(2);
    });

    it("ww0: Row Click", () => {

        cy.getWidget("ww0").find("tbody tr:nth-child(2)").click();

        cy.assertEventValue("ww1", "Asia")
        cy.assertEventMdx("ww1", "[Geography].[Geography].[Continent].&[AS]")

        cy.getWidget("ww0").find("tbody tr:nth-child(3)").click();

        cy.assertEventValue("ww1", "Europe")
        cy.assertEventMdx("ww1", "[Geography].[Geography].[Continent].&[EU]")

    });

    it("ww2: Row Selection", () => {

        cy.keyCtrl(() => {

            cy.getWidget("ww2").find("tbody tr:nth-child(3)").click();
            cy.getWidget("ww2").find("tbody tr:nth-child(5)").click();

        })

        cy.assertEventValue("ww3", "Europe,Oceania")
        cy.assertEventMdx("ww3", "{[Geography].[Geography].[Continent].&[EU],[Geography].[Geography].[Continent].&[OC]}")

    });

});
