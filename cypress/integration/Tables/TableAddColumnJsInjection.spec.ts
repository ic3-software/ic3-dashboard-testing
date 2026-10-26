// S-3 Cell values are spliced into JS source run by new Function, and the quoting fallback escapes only the first " [common/expression]
//
// A STRING expression (TidyTableNumericExprEvaluator.evalString) is executed via new Function: the cell values
// must be inserted as JS literals (no JS injection) and the "add quotes" fallback (e.g., #,###.0) must escape
// all the quotes of the value.
//
// Report to create on the server: shared:/Tests/Tables/Table Add Column JS Injection
//   - ww0: Table
//          MDX:
//              WITH
//                  MEMBER [Measures].[Evil]   AS 'x" + (window.__ic3Pwned = 1) + "'
//                  MEMBER [Measures].[Quotes] AS 'say "a" and "b"'
//              SELECT {[Measures].[Evil], [Measures].[Quotes]} ON 0 FROM [Sales]
//          (no rows axis => a single row; columns: 0:Evil 1:Quotes)
//          Data Transformations (in this order):
//              - Add Column : name "Safe"     , Expression Type STRING, String Expression : return "$Evil$"
//              - Add Column : name "Fallback" , Expression Type STRING, String Expression : $Quotes$ ok
//          => columns: 0:Evil 1:Quotes 2:Safe 3:Fallback
//
// Buggy behavior:
//      Safe     : JS executed is  return "x" + (window.__ic3Pwned = 1) + ""  => "x1" and window.__ic3Pwned set.
//      Fallback : return say "a" and "b" ok  => syntax error; quoting fallback escapes only the first " => error.

export {};

describe("Tables/Table Add Column JS Injection", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table Add Column JS Injection");
        cy.waitForQueryCount(1);
    });


    it("ww0: cell values are not executed as JS", () => {

        const widgetId = "ww0";

        cy.assertTableRowCount(widgetId, 1);
        
        cy.assertTableCellContent(widgetId, 0, 0, 'x" + (window.__ic3Pwned = 1) + "');
        cy.assertTableCellContent(widgetId, 0, 2, 'x" + (window.__ic3Pwned = 1) + "');

        cy.window().then(win => {
            expect((win as any).__ic3Pwned, "injected JS executed").to.be.undefined;
        });

    });

    it("ww0: quoting fallback escapes all the quotes", () => {

        const widgetId = "ww0";

        cy.assertTableCellContent(widgetId, 0, 1, 'say "a" and "b"');
        cy.assertTableCellContent(widgetId, 0, 3, 'say "a" and "b" ok');

    });

});
