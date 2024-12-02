function checkRights(widgetId: string, rights: string[]) {

    cy.clickWidgetHeader(widgetId);
    cy.get('[data-cy="toolbar-openOptionsEditor"]').click();

    if (rights.includes("title")) {
        cy.widgetEditorChangeTab("tab-chart");
        cy.get("[data-cy='header-$-title']").should('exist');
    } else {
        if (rights.includes("chart")) {
            cy.widgetEditorChangeTab("tab-chart");
            cy.get("[data-cy='header-$-title']").should('not.exist');
        } else {
            cy.widgetEditorTabNotExists('tab-chart')
        }
    }

    if (rights.includes("chart")) {
        cy.widgetEditorChangeTab("tab-chart");
        cy.get("[data-cy='options-chartOptions.variant']").should('exist');
    } else {
        if (rights.includes("title")) {
            cy.widgetEditorChangeTab("tab-chart");
            cy.get("[data-cy='options-chartOptions.variant']").should('not.exist');
        } else {
            cy.widgetEditorTabNotExists('tab-chart')
        }
    }

    cy.widgetEditorChangeTab("tab-box");
    if (rights.includes("box")) {
        cy.get("[data-cy='boxvariant']").should('exist');
    } else {
        cy.get("[data-cy='boxvariant']").should('not.exist');
    }

    if (rights.includes("query-filters")) {
        cy.widgetEditorChangeTab("tab-queryFilter");
    } else {
        cy.widgetEditorTabNotExists('tab-queryFilter')
    }

    if (rights.includes("interactions")) {
        cy.widgetEditorChangeTab("tab-interactions");
    } else {
        cy.widgetEditorTabNotExists('tab-interactions')
    }

    cy.widgetEditorClose();

    cy.getWidget(widgetId).find("[data-cy='userMenu']").click();
    if (rights.includes('convert-to-widget')) {
        cy.get("[data-cy='" + widgetId + "-convertGadgetToWidget']").should('exist');
    } else {
        cy.get("[data-cy='" + widgetId + "-convertGadgetToWidget']").should('not.exist');
    }

    cy.clickOutside();

}

describe("Gadgets/GadgetRights", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Gadgets/Gadget Rights");
        cy.waitForQueryCount(8);
    });

    it("Rights", () => {

        /*
        check that the rights of a gadget are working.
         */


        checkRights("wg0-0", []);
        checkRights("wg0-1", ['title']);
        checkRights("wg0-2", ['chart']);
        checkRights("wg0-3", ['query-filters']);
        checkRights("wg0-4", ['interactions']);
        checkRights("wg0-5", ['box']);
        checkRights("wg0-6", ['convert-to-widget']);
        checkRights("wg0-7", ['title', 'chart', 'query-filters', 'interactions', 'box', 'convert-to-widget']);

    });

});
