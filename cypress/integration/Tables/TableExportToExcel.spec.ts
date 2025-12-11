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

                console.log(rows);

                const rowOffset = 9;
                const colOffset = 1;

                expect(rows.length).to.eq(13)
                expect(rows[rowOffset + 0].length).to.eq(4 + 1)
                expect(rows[rowOffset + 1][colOffset + 0]).to.eq('Personal')
                expect(rows[rowOffset + 1][colOffset + 1]).to.eq(148250)
                expect(rows[rowOffset + 1][colOffset + 2]).to.eq(250)
                expect(rows[rowOffset + 1][colOffset + 3]).to.eq(250)
                expect(rows[rowOffset + 2][colOffset + 0]).to.eq('Silver')
                expect(rows[rowOffset + 3][colOffset + 0]).to.eq('Server')

            });

        });

    })

});
