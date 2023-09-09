import {hexToRgb} from "../../support/utils";

export {};

function getTableCell(widgetId: string, rowIdx: number, colIdx: number) {
    return cy.getWidget(widgetId).find('[data-rowindex="' + rowIdx + '"] [data-colindex="' + colIdx + '"]')
}

// Same code as PivotTableRenderers
describe("Tables/Table Renderers", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Tables/Table Renderers");
        cy.waitForQueryCount(2);
    });

    it("ww1", () => {

        const widgetId = "ww9";

        // progress bar
        getTableCell(widgetId, 0, 1).find(".ic3RendererProgressBar-bar ")
            .should('be.visible')
            .should('have.css', 'background-color', hexToRgb('#00d4ea'))

        // progress rating
        getTableCell(widgetId, 0, 2).find(".ic3RendererRating .MuiRating-root span:nth-child(1) .MuiRating-icon")
            .should('be.visible')
            .should('have.css', 'color', hexToRgb('#efcd5a'))
        getTableCell(widgetId, 0, 2).find(".ic3RendererRating .MuiRating-root span:nth-child(2) .MuiRating-icon")
            .should('be.visible')
            .should('have.css', 'color', 'rgba(0, 0, 0, 0.26)')
        getTableCell(widgetId, 2, 2).find(".ic3RendererRating .MuiRating-root span:nth-child(5) .MuiRating-icon")
            .should('be.visible')
            .should('have.css', 'color', hexToRgb('#efcd5a'))
        getTableCell(widgetId, 4, 2).find(".ic3RendererRating .MuiRating-root span:nth-child(1) .MuiRating-icon")
            .should('be.visible')
            .should('have.css', 'color', 'rgba(0, 0, 0, 0.26)')

        //icon renderer
        getTableCell(widgetId, 0, 3).find(".ic3RendererIconSet .ic3RendererIconSet-icon")
            .should('be.visible')
            .should('have.css', 'fill', 'rgb(94, 194, 117)')
        getTableCell(widgetId, 2, 3).find(".ic3RendererIconSet .ic3RendererIconSet-icon")
            .should('be.visible')
            .should('have.css', 'fill', 'rgb(234, 0, 54)')

        //Rich text Renderer
        getTableCell(widgetId, 0, 4).find(".ic3RendererRichText")
            .should('be.visible')
            .should('have.css', 'font-size', '22px')
            .should('have.css', 'font-family', 'arial');
        getTableCell(widgetId, 3, 4).find(".ic3RendererRichText")
            .should('be.visible')
            .should('have.css', 'font-size', '22px')
            .should('have.css', 'font-family', 'arial')

        //link
        getTableCell(widgetId, 0, 5).find("a.ic3RendererLink")
            .should('be.visible')
            .invoke('attr', 'href')
            .should('eq', 'https://en.wikipedia.org/wiki/Africa');


        // charts
        const widgetId2 = "ww0";
        getTableCell(widgetId2, 0, 1).find(".ic3RendererSparkColumn svg")
            .should('be.visible')
        getTableCell(widgetId2, 0, 2).find(".ic3RendererSparkLine" +
            " svg")
            .should('be.visible')

    })

});
