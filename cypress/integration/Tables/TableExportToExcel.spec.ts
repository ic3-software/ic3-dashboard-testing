// @ts-ignore
import readXlsxFile, {Row} from "read-excel-file";

export {};


describe("Tables/ExportToExcel", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table Export Excel");
        cy.waitForQueryCount(1);
    });


    it("Export with", () => {

        cy.sortTable("ww0", 1);
        cy.clickTableColumnMenuIcon("ww0", 1, "Pin to left")

        cy.assertTableColumnTitle("ww0", 0, "Amount")
        cy.assertTableValue("ww0", 0, 1, "Personal")

        cy.filterTableColumnWithMenuIcon("ww0", 1, "er");

        cy.assertTableValue("ww0", 0, 1, "Personal");
        cy.assertTableValue("ww0", 1, 1, "Silver");
        cy.assertTableValue("ww0", 2, 1, "Server");

        cy.exportToExcel("ww0");


        cy.readFileFromDownload("modifiedTidy.xlsx").then((blob) => {

            readXlsxFile(blob).then((rows: Row[]) => {

                expect(rows.length).to.eq(4)
                expect(rows[0].length).to.eq(4 + 1)
                expect(rows[1][2]).to.eq('Personal')
                expect(rows[1][0]).to.eq(148250)
                expect(rows[1][3]).to.eq(250)
                expect(rows[1][4]).to.eq(250)
                expect(rows[2][2]).to.eq('Silver')
                expect(rows[3][2]).to.eq('Server')

            });

        });

    })

});
