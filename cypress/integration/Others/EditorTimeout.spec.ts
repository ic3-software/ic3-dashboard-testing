// const europeanCountries = [
//     "Belgium",
//     "France",
//     "Germany",
//     "Italy",
//     "Netherlands",
//     "Poland",
//     "Russia",
// ];
//
// const northAmericaCountries = ["Canada", "Mexico", "United States"];


describe("Others/Constants", () => {

    beforeEach(() => {
        cy.login();
        cy.openEditorTestReport("Others/EditorTimeOut", false, false);
    });

    it("test editor time-out", () => {


        cy.wait(5100);
        cy.getWidget("ww0", "data-cy-request-ajax-timeout");

        cy.switchQueryEditorLimits();

        cy.getWidget("ww0").find('button[data-cy="runQueryNoEditorTimeout"]').click();
        cy.wait(5100);
        cy.assertPivotTableRowCount("ww0",1);

    });

})


