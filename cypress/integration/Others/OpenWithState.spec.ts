const northAmericaCountries = ["Canada", "Mexico", "United States"];


describe("Others/OpenWithState", () => {

    beforeEach(() => {
        cy.login();
        cy.clearLocalStorage();
        cy.openViewerTestReport("Others/OpenWithState", true, false);
    });

    function assertTableContent() {
        cy.assertTableRowCount("ww0", 1);
        cy.assertTableValue("ww0", 0, 0, "Africa");

        cy.assertTableRowCount("ww2", 1);
        cy.assertTableValue("ww2", 0, 0, "Asia");

        cy.assertTableRowCount("ww9", 2);
        cy.assertTableValue("ww9", 0, 0, "Asia");
        cy.assertTableValue("ww9", 1, 0, "Europe");

        cy.assertTableRowCount("ww7", 1);
        cy.assertTableValue("ww7", 0, 0, "Africa");

        cy.assertTableRowCount("ww11", 1);
        cy.assertTableValue("ww11", 0, 0, "North America");

        cy.assertWidgetNoData("ww5");
    }

    function assertSelection() {
        cy.assertButtonSelected("ww1", "Africa");
        cy.assertDropdownSingleSelection("ww3", "Asia");
        cy.assertDropdownMultiSelection("ww8", ["Asia", "Europe"]);
        cy.assertSliderSelected("ww6", "Africa");
        cy.assertTreeSelection("ww10", "control-icons", ["North America"]);
        cy.assertDatePicker("ww4", "8 Sep 2022");
    }

    it("Test we get what we expect", () => {

        const initQueries = 6;
        let qc = initQueries;
        cy.waitForQueryCount(qc);

        cy.selectButton("ww1", "Africa");
        cy.waitForQueryCount(++qc);

        cy.selectDropdownFromInput("ww3", "Asia");
        cy.waitForQueryCount(++qc);

        cy.selectDropdownFromInput("ww8", "Asia");
        cy.waitForQueryCount(++qc);
        cy.selectDropdownFromInput("ww8", "Europe");
        cy.waitForQueryCount(++qc);

        cy.selectSlider("ww6", "Africa");
        cy.waitForQueryCount(++qc);

        cy.selectTree("ww10", "control-icons", "North America");
        cy.waitForQueryCount(++qc);

        cy.selectDatePickerFromInput("ww4", "8 Sep 2022");
        cy.waitForQueryCount(++qc);

        assertTableContent();
        assertSelection();

        cy.reloadAndWait(true)
        cy.waitForQueryCount(initQueries + 6);

        assertTableContent();
        assertSelection();

    });

})


