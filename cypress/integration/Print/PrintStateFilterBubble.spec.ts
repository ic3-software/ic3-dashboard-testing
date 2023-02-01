export {};

describe("Print/Print State Filter Bubble", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Print/Print State Filter Bubble");
        cy.waitForQueryCount(2);
    });

    it("ww0: Countries", () => {

        cy.selectButton("ww0", "Australia");
        cy.bubbleClickBubble("ww2", 2);
        cy.clickOutside() /* prevent hover color effect */;

        cy.assertButtonSelected("ww0", "Australia");
        cy.bubbleAssertBubbleCount("ww2", 2);
        cy.bubbleAssertSingleBubbleSelected("ww2", 2, 2);
        cy.assertEventValue("ww3", "Australia");
        cy.assertEventValue("ww4", "Sydney");

        cy.log("### window.reload ###")
        cy.selectButton("ww1", "print-in-browser");

        cy.waitForQueryStatus();
        cy.waitForPrintStatus();
        cy.waitForQueryCount(0);

        cy.assertButtonSelected("ww0", "Australia");
        cy.bubbleAssertBubbleCount("ww2", 2);
        cy.bubbleAssertSingleBubbleSelected("ww2", 2, 2);
        cy.assertEventValue("ww3", "Australia");
        cy.assertEventValue("ww4", "Sydney");

    });

});
