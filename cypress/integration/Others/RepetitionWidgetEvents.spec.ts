describe("Others/RepetitionWidgetEvents", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/Repetition Widget Events", true, true);
        cy.waitForQueryCount(2 + 3 * 2);
    });

    it("Test we get what we expect", () => {

        const button1 = "ww2~:Rep-ww0-R:0-C:0";
        const button2 = "ww2~:Rep-ww0-R:1-C:0";

        const gbutton1 = "ww2~:Rep-ww3-R:0-C:0";
        const gbutton2 = "ww2~:Rep-ww3-R:1-C:0";

        const table1 = "ww2~:Rep-ww1-R:0-C:0";
        const table2 = "ww2~:Rep-ww1-R:1-C:0";
        const gtable = "ww4";

        cy.assertWidgetHeader(table1, "Top 5 costumer for All");
        cy.assertWidgetHeader(table2, "Top 5 costumer for All");

        cy.selectButton(button1, "2018");
        cy.waitForQueryCount(2 + 3 * 2 + 1);

        cy.selectButton(button2, "2020");
        cy.waitForQueryCount(2 + 3 * 2 + 2);

        cy.assertWidgetHeader(table1, "Top 5 costumer for 2018");
        cy.assertWidgetHeader(table2, "Top 5 costumer for 2020");

        cy.selectButton(button2, "2022");
        cy.waitForQueryCount(2 + 3 * 2 + 3);
        cy.assertWidgetHeader(table2, "Top 5 costumer for 2022");


        cy.selectButton(gbutton1, "Personal");
        cy.waitForQueryCount(2 + 3 * 2 + 4);
        cy.assertWidgetHeader(gtable, "Personal");

        cy.selectButton(gbutton1, "Silver");
        cy.waitForQueryCount(2 + 3 * 2 + 5);
        cy.assertWidgetHeader(gtable, "Silver");

    });

})


