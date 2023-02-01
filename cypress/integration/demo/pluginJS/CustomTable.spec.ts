import {PluginJSUtils} from "./PluginJSUtils";

describe("demo/pluginJS/CustomTable", () => {

    afterEach(() => {

        PluginJSUtils.enablePluginJS(false);

    });

    beforeEach(() => {

        PluginJSUtils.enablePluginJS();

        cy.login();
        cy.openViewerTestReport("Demo/PluginJS/CustomTable", true, false);
        cy.waitForQueryCount(1);
    });

    it("ww0: Singe Selection", () => {

        const table = "ww0";
        const tableEvent = "ww1";

        cy.assertTableRowCount(table, 5);

        cy.clickTableCell(table, 0, 0);
        cy.assertEventValue(tableEvent, "2018");
        cy.assertEventMdx(tableEvent, "[Time].[Time].[Year].&[2018-01-01]");

        cy.clickTableCell(table, 0, 0);
        cy.assertEventValue(tableEvent, "");
        cy.assertEventMdx(tableEvent, "");

    });

    it("ww0: Multiple Selection", () => {

        const table = "ww0";
        const tableEvent = "ww1";

        cy.clickTableCell(table, 1, 0, true);
        cy.clickTableCell(table, 2, 0, true);
        cy.clickTableCell(table, 3, 0, true);
        cy.assertEventValue(tableEvent, "2019,2020,2021");
        cy.assertEventMdx(tableEvent, "{[Time].[Time].[Year].&[2019-01-01],[Time].[Time].[Year].&[2020-01-01],[Time].[Time].[Year].&[2021-01-01]}");

    })

});
