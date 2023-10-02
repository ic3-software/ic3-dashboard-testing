import {assertButtonsSelection} from "../Filters/FilterUtils";

describe("Others/Invisible Widgets", () => {

    beforeEach(() => {
        cy.login();
    });

    it("Viewer", () => {

        cy.openViewerTestReport("Others/Invisible Widgets");
        cy.waitForQueryCount(3);

        assertButtonsSelection("ww1", "ww0", ["Africa", "Asia & Pacific", "Europe"], ["Africa"], "Africa");
        // assertButtonsSelection("ww2", "ww3", ["Africa", "Asia & Pacific","Europe"], ["Asia & Pacific"], "Asia & Pacific");
        assertButtonsSelection("ww4", "ww5", ["Africa", "Asia & Pacific", "Europe"], ["Europe"], "Europe");

        cy.assertWidgetInvisible("ww2");
        cy.assertEventValue("ww3", "Asia & Pacific");

    })

    it("Editor", () => {

        cy.openViewerTestReport("Others/Invisible Widgets");
        cy.waitForQueryCount(3);

        assertButtonsSelection("ww1", "ww0", ["Africa", "Asia & Pacific", "Europe"], ["Africa"], "Africa");
        assertButtonsSelection("ww2", "ww3", ["Africa", "Asia & Pacific", "Europe"], ["Asia & Pacific"], "Asia & Pacific");
        assertButtonsSelection("ww4", "ww5", ["Africa", "Asia & Pacific", "Europe"], ["Europe"], "Europe");

    })

    it("Printing", () => {

        cy.openPrintInBrowserTestReport("Others/Invisible Widgets");
        cy.waitForQueryCount(3);

        assertButtonsSelection("ww1", "ww0", ["Africa", "Asia & Pacific", "Europe"], ["Africa"], "Africa");
        // assertButtonsSelection("ww2", "ww3", ["Africa", "Asia & Pacific","Europe"], ["Asia & Pacific"], "Asia & Pacific");
        // assertButtonsSelection("ww4", "ww5", ["Africa", "Asia & Pacific","Europe"], ["Europe"], "Europe");

        cy.assertWidgetInvisible("ww2");
        cy.assertEventValue("ww3", "Asia & Pacific");

        cy.assertWidgetInvisible("ww4");
        cy.assertEventValue("ww5", "Europe");

    })

})