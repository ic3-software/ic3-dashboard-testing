describe("Others/SaveRestoreProps", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Others/SaveRestoreState");
        cy.waitForQueryCount(13);
    });

    it("Save/Restore Props", () => {

        let queryCount = 13;

        // Selecting Country buttons
        cy.selectButton("default:ww1", "South America");
        queryCount += 6;
        cy.waitForQueryCount(queryCount);
        cy.assertTableRowCount("default:ww3", 3);

        cy.selectButton("_ww5:ww3", "2022");
        queryCount += 1;
        cy.waitForQueryCount(queryCount);

        cy.selectDatePickerFromInput("default:ww6", "01 Sep 2021");

        cy.selectTree("default:ww7", "control-icons", "Africa");
        cy.expandTree("default:ww7", "control-icons", "Africa");
        cy.selectTree("default:ww7", "control-icons", "Egypt");
        cy.assertTreeSelection("default:ww7", "control-icons", ["Egypt"]);

        cy.selectTree("default:ww8", "control-icons", "Africa");
        cy.expandTree("default:ww8", "control-icons", "Africa");
        cy.expandTree("default:ww8", "control-icons", "Europe");
        cy.selectTree("default:ww8", "control-icons", "France");
        cy.assertTreeSelection("default:ww8", "control-icons", ["Africa", "France"]);

        cy.assertButtonSelected("default:ww1", "South America");
        cy.assertButtonSelected("_ww5:ww3", "2022");

        // save local state
        cy.selectButton("default:ww4", "save props");

        // click away
        cy.selectButton("default:ww1", "Asia");
        queryCount += 6;
        cy.waitForQueryCount(queryCount);
        cy.assertTableValue("default:ww3", 0, 0, "Japan");

        cy.selectButton("_ww5:ww3", "2020");
        queryCount += 1;
        cy.waitForQueryCount(queryCount);
        cy.assertTableCellContent("_ww5:ww0", 0, 0, "2020");

        cy.assertButtonSelected("default:ww1", "Asia");
        cy.assertButtonSelected("_ww5:ww3", "2020");

        // restore local state
        cy.selectButton("default:ww4", "restore props");
        cy.assertTableValue("default:ww3", 0, 0, "Argentina");
        cy.assertTableCellContent("_ww5:ww0", 0, 0, "2022");

        // check buttons
        cy.assertButtonSelected("default:ww1", "South America");
        cy.assertButtonSelected("_ww5:ww3", "2022");

        // check DatePicker
        cy.assertDatePicker("default:ww6", "01 Sep 2021");

        // check Trees
        cy.assertTreeExists("default:ww7", "control-icons", "Egypt");
        cy.assertTreeSelection("default:ww7", "control-icons", ["Egypt"]);

        cy.assertTreeExists("default:ww8", "control-icons", "Egypt");
        cy.assertTreeExists("default:ww8", "control-icons", "France");
        cy.assertTreeSelection("default:ww8", "control-icons", ["Africa", "France"]);
    });


    it("Save/Restore Failing", () => {

        cy.selectButton("default:ww4", "save props");
        cy.selectButton("default:ww4", "restore state");

        cy.get('[data-cy="render-error"]').should('have.length', 1);
        // error

    });
})