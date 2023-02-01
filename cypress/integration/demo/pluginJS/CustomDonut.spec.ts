import {PluginJSUtils} from "./PluginJSUtils";

describe("demo/pluginJS/CustomDonut", () => {

    afterEach(() => {

        PluginJSUtils.enablePluginJS(false);

    });

    beforeEach(() => {

        PluginJSUtils.enablePluginJS();

        cy.login();
        cy.openViewerTestReport("Demo/PluginJS/CustomDonut", true, false);
        cy.waitForQueryCount(1);
    });

    it("ww0: Singe Selection", () => {

        const table = "ww0";
        const tableEvent = "ww1";

        cy.donutAssertSliceCount(table, 5);

        cy.donutClickSlice(table, 4);
        cy.clickOutside() /* prevent hover color effect */;

        cy.assertEventValue(tableEvent, "2018");
        cy.assertEventMdx(tableEvent, "[Time].[Time].[Year].&[2018-01-01]");

        cy.wait(50)
        cy.donutClickSlice(table, 3);

        cy.assertEventValue(tableEvent, "2019");
        cy.assertEventMdx(tableEvent, "[Time].[Time].[Year].&[2019-01-01]");

    });

    it("ww0: Multiple Selection", () => {

        const table = "ww0";
        const tableEvent = "ww1";

        cy.keyCtrl(() => {

            cy.donutClickSlice(table, 3);
            cy.donutClickSlice(table, 1);
            cy.donutClickSlice(table, 2);
            cy.wait(50)
            cy.clickOutside() /* prevent hover color effect */;

        });


        cy.assertEventValue(tableEvent, "2019,2020,2021");
        cy.assertEventMdx(tableEvent, "{[Time].[Time].[Year].&[2019-01-01],[Time].[Time].[Year].&[2020-01-01],[Time].[Time].[Year].&[2021-01-01]}");

    })

});
