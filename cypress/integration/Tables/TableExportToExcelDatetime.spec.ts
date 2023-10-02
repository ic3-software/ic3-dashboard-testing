// @ts-ignore
import readXlsxFile, {Row} from "read-excel-file";

export {};

const path = require("path");

const downloadsFolder = Cypress.config("downloadsFolder");

describe("Tables/ExportToExcelDatetime", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Export to excel datetime");
        cy.waitForQueryCount(1);
    });


    it("Export with", () => {

       cy.exportToExcel("ww0");

        cy.readFile(path.join(downloadsFolder, "modifiedTidy.xlsx"), null).should("exist").then((blob) => {

            readXlsxFile(blob).then((rows: Row[]) => {

                expect(rows.length).to.eq(2);  // Including header
                expect(rows[0].length).to.eq(2);
                expect(rows[1][0].toString()).to.eq(new Date(Date.UTC(2018, 2, 25)).toString());
                expect(rows[1][1].toString()).to.eq(new Date(Date.UTC(2020, 9, 4, 10, 50, 11, 640)).toString());

            })

        });

    })

});
