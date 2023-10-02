// @ts-ignore
import readXlsxFile, {Row} from "read-excel-file";

export {};


describe("Tables/TableFormatting", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table format value");
        cy.waitForQueryCount(2);
    });


    it("correct format", () => {


        cy.assertTableValue("ww0", 0, 1, "10 March 2020");
        cy.assertTableValue("ww0", 1, 1, "10 March 2020");
        cy.assertTableValue("ww0", 0, 2, "9,999,999.09");
        cy.assertTableValue("ww0", 1, 2, "9,999,999.09");
        cy.assertTableValue("ww0", 0, 3, "01 January 2018");
        cy.assertTableValue("ww0", 1, 3, "01 January 2019");

        cy.assertPivotTableCell("ww1", 0, 0, "10 March 2020");
        cy.assertPivotTableCell("ww1", 1, 0, "10 March 2020");
        cy.assertPivotTableCell("ww1", 0, 1, "999,999.0009");
        cy.assertPivotTableCell("ww1", 1, 1, "999,999.0009");

    });

});
