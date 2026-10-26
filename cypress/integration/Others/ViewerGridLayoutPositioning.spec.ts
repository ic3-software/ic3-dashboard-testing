describe("Others/ViewerGridLayoutPositioning", () => {

    beforeEach(() => {
        cy.login();
    });

    it("Assert grid layout expands the rows correctly with invisible widgets", () => {

        cy.openViewerTestReport("Others/viewerGridLayout", undefined, undefined);
        cy.waitForQueryCount(0);

        // sizes to full width because ww14 and ww13 are invisible
        cy.assertWidgetWidth("ww12", 1504);

        // divide space of invisible widgets equally for this row
        cy.assertWidgetWidth("ww2", 432);
        cy.assertWidgetWidth("ww7", 370);
        cy.assertWidgetWidth("ww8", 307);
        cy.assertWidgetWidth("ww9", 370);

    });

    it("H-4: editor arrow keys do not throw and do not block the mouse selection", () => {

        // support/index.ts swallows every uncaught exception: collect them to assert on.
        const errors: string[] = [];

        cy.on("uncaught:exception", (err) => {
            !err.message.includes("ResizeObserver") && errors.push(err.message);
            return false;
        });

        cy.openEditorTestReport("Others/viewerGridLayout");
        cy.waitForQueryCount(0);

        cy.get('[data-cy="widget-box-ww2"]').click();
        cy.get('[data-cy="widget-box-ww2"]').should("have.class", "ic3-widget-box-selected");

        cy.get("body").type("{rightarrow}");
        cy.get("body").type("{downarrow}");

        // Keyboard move completion is performed after a 500ms timeout.
        cy.wait(1000);

        cy.then(() => expect(errors, "uncaught errors").to.be.empty);

        // Mouse selection must still be working.
        cy.get('[data-cy="widget-box-ww7"]').click();
        cy.get('[data-cy="widget-box-ww7"]').should("have.class", "ic3-widget-box-selected");
        cy.get('[data-cy="widget-box-ww2"]').should("not.have.class", "ic3-widget-box-selected");

        cy.get('[data-cy="widget-box-ww2"]').click();
        cy.get('[data-cy="widget-box-ww2"]').should("have.class", "ic3-widget-box-selected");
        cy.get('[data-cy="widget-box-ww7"]').should("not.have.class", "ic3-widget-box-selected");

        cy.then(() => expect(errors, "uncaught errors").to.be.empty);

    });

});
