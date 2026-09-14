import { readSheet } from "read-excel-file/universal";
import type { Row } from "read-excel-file/universal";

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

        cy.readFile(path.join(downloadsFolder, "modifiedTidy.xlsx"), null).should("exist").then((buffer) => {

            const blob = new Blob([buffer as any]);

            readSheet(blob).then((rows: Row[]) => {

                expect(rows.length).to.eq(11);
                expect(rows[9].length).to.eq(3);
                expect((rows[10] as any)[1].toString()).to.eq(new Date(Date.UTC(2018, 2, 25)).toString());
                expect((rows[10] as any)[2].toString()).to.eq(new Date(Date.UTC(2020, 9, 4, 10, 50, 11, 640)).toString());

            })

        });

    })

});
