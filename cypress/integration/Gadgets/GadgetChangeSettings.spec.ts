describe("Gadgets/GadgetChangeSettings", () => {

    beforeEach(() => {
        cy.login();
        cy.openGadgetEditor("Change Gadget Test");
        cy.waitForQueryCount(1);
    });

    it("Change gadget title", () => {

        /*
        Change the title
         */

        cy.widgetEditorOpen("ww0");

        cy.get("#tab-chart").click();

        const text = new Date().toString();

        cy.get("div[data-cy='header-$-title']").find("input").eq(0).clear().type(text);
        cy.widgetEditorApplyAndClose();

        cy.get("[data-cy='appMenu-button-saveGadget']").click();
        cy.contains(".MuiAlert-message", "Saved", {timeout: 10000});

        cy.openViewerTestReport("Gadgets/Change Gadget Test", true, true);
        cy.contains("span[data-cy='widget-box-header-wg0-0']", text);

    });

});