export {};

// ---------------------------------------------------------------------------------------------------------------------
// Filter panel: paste a list of values in the IS_ANY_OF / IS_NONE_OF selection popover.
//
// Dashboard filters (Sales (LiveDemo)):
//      0 : [Geography].[Geography].[City]                  IS_ANY_OF   (level, large: popover with search box)
//      1 : [Geography].[Geography].[City].[Country]        IS_ANY_OF   (level property)
//      2 : [Geography].[Region]                            IS_ANY_OF   (hierarchy/tree: paste not applicable)
//      3 : [Geography].[Geography].[City].[Continent]      IS_ANY_OF   (level property, small)
//      4 : [Product].[Article].[Article]                   IS_NONE_OF
//
// The paste is a synthetic 'paste' event carrying a DataTransfer: a synthetic event never performs the browser's
// default text insertion, so for the "normal paste" cases we check that the handler did NOT call preventDefault()
// (i.e. the browser would insert the text) instead of checking the input value.
// ---------------------------------------------------------------------------------------------------------------------

describe("Filters/Filter Panel Paste List", () => {

    beforeEach(() => {
        cy.login();
        cy.openViewerTestReport("Filters/Filter Panel/Paste List");
        cy.waitForQueryCount(0);
    });

    const wPanel = "ww0";
    const wEvent = "ww1";

    const CITY = 0;
    const COUNTRY = 1;
    const REGION = 2;
    const ARTICLE = 4;

    // -----------------------------------------------------------------------------------------------------------------
    // Helpers
    // -----------------------------------------------------------------------------------------------------------------

    function filterItem(index: number) {
        return cy.getWidget(wPanel)
            .find("[data-cy='filters'] [data-cy='filter-item']")
            .eq(index);
    }

    function openPopover(index: number) {
        filterItem(index)
            .find("[data-cy='value-selector-text']")
            .should("exist")    // fails if the filter is rendered as the inline checkbox selector (useSimpleFilterCutoff)
            .find(".MuiInputBase-root")
            .click();

        cy.get("[data-cy='search-field'] input").should("be.visible");
    }

    function searchInput() {
        return cy.get("[data-cy='search-field'] input");
    }

    /**
     * Dispatches a real (bubbling) 'paste' event on the popover search input and yields whether the
     * handler called preventDefault().
     */
    function paste(text: string) {
        return searchInput().then($input => {
            const input = $input[0] as HTMLInputElement;
            const win = input.ownerDocument.defaultView as Window & typeof globalThis;

            input.focus();

            const dataTransfer = new win.DataTransfer();
            dataTransfer.setData("text/plain", text);

            const event = new win.ClipboardEvent("paste", {
                clipboardData: dataTransfer,
                bubbles: true,
                cancelable: true,
                composed: true,
            });

            input.dispatchEvent(event);

            return cy.wrap(event.defaultPrevented, {log: false});
        });
    }

    function confirm() {
        cy.get("[data-cy='confirm-selection']").click();
        cy.get("[data-cy='confirm-selection']").should("not.exist");
    }

    function cancel() {
        cy.get("[data-cy='confirm-selection']")
            .closest(".MuiPaper-root")
            .contains("button", /^cancel$/i)
            .click();
        cy.get("[data-cy='confirm-selection']").should("not.exist");
    }

    function rows() {
        return cy.get("[data-cy='search-content'] [data-cy^='fp-item-']");
    }

    /**
     * The paste match is asynchronous: the matched members are selected (and ticked) only once the marker is
     * 'applied'. Leaving paste mode before that cancels the paste.
     */
    function waitPasteApplied() {
        cy.get("[data-cy-paste='applied']").should("exist");
        cy.get("[data-cy-paste='matching']").should("not.exist");
    }

    function assertChip(count: number) {
        waitPasteApplied();
        cy.get("[data-cy='paste-list-chip']")
            .should("be.visible")
            .and("contain.text", `Pasted list · ${count} values`);
    }

    function assertNoPasteMode() {
        cy.get("[data-cy='paste-list-chip']").should("not.exist");
        cy.get("[data-cy='paste-feedback']").should("not.exist");
        cy.get("[data-cy-paste]").should("not.exist");
    }

    function assertFeedback(found: number, total: number, notFound = 0) {
        waitPasteApplied();
        cy.get("[data-cy='paste-feedback']")
            .should("contain.text", `${found} of ${total} found and added to selection`);

        if (notFound > 0) {
            cy.get("[data-cy='paste-not-found-toggle']").should("contain.text", `${notFound} not found`);
        } else {
            cy.get("[data-cy='paste-not-found-toggle']").should("not.exist");
        }
    }

    /**
     * The list shows only the matched members, all ticked.
     */
    function assertMatchedList(captions: string[]) {
        rows().should("have.length", captions.length);
        captions.forEach(c => {
            cy.get("[data-cy='search-content']").contains("p", c);
        });
        rows().find("input[type='checkbox']:checked").should("have.length", captions.length);
    }

    function assertPastedList(captions: string[], total = captions.length) {
        assertChip(total);
        assertMatchedList(captions);
        assertFeedback(captions.length, total, total - captions.length);
    }

    function assertClosedValues(index: number, captions: string[], absent: string[] = []) {
        const field = () => filterItem(index).find("[data-cy='value-selector-text']");
        captions.forEach(c => field().should("contain.text", c));
        absent.forEach(c => field().should("not.contain.text", c));
    }

    /**
     * The exact event format is not asserted (unknown member order / format): the event must be set and
     * contain the given parts. The actual text is logged.
     */
    function assertEventContains(parts: string[]) {
        cy.getWidget(wEvent)
            .find("h5")
            .should($h5 => {
                const text = $h5.text();
                expect(text, "event value").not.to.eq("Event value : !");
                parts.forEach(p => expect(text, "event value").to.contain(p));
            })
            .then($h5 => cy.log("EVENT [" + $h5.text() + "]"));
    }

    function selectBySearch(caption: string) {
        searchInput().clear().type(caption);
        cy.get("[data-cy='search-content']").contains("p", caption).click({scrollBehavior: false});
        searchInput().clear();
    }

    const THREE = ["Alexandria", "Cairo", "Johannesburg"];

    // -----------------------------------------------------------------------------------------------------------------
    // Hint
    // -----------------------------------------------------------------------------------------------------------------

    it("1. hint in the search box", () => {
        openPopover(CITY);
        searchInput().should("have.attr", "placeholder", "Search or paste a list of values");
    });

    // -----------------------------------------------------------------------------------------------------------------
    // Separators
    // -----------------------------------------------------------------------------------------------------------------

    it("2. newline list", () => {
        openPopover(CITY);
        paste("Alexandria\nCairo\nJohannesburg").should("eq", true);
        assertPastedList(THREE);
    });

    it("2. CRLF list with trailing line break", () => {
        openPopover(CITY);
        paste("Alexandria\r\nCairo\r\nJohannesburg\r\n").should("eq", true);
        assertPastedList(THREE);
    });

    [
        ["tab", "\t"],
        ["comma", ","],
        ["semicolon", ";"],
        ["pipe", "|"],
    ].forEach(([name, sep]) => {
        it(`3. ${name} separated list`, () => {
            openPopover(CITY);
            paste(THREE.join(sep)).should("eq", true);
            assertPastedList(THREE);
        });
    });

    it("5. single value is a normal paste", () => {
        openPopover(CITY);
        paste("Cairo").should("eq", false);
        assertNoPasteMode();
    });

    // -----------------------------------------------------------------------------------------------------------------
    // Matching
    // -----------------------------------------------------------------------------------------------------------------

    it("6. matching is exact and case-insensitive", () => {
        openPopover(CITY);
        paste("alexandria\nCAIRO\nJohannesburg").should("eq", true);
        assertPastedList(THREE);
    });

    it("6. partial caption does not match", () => {
        openPopover(CITY);
        paste("Cair\nAlexandria").should("eq", true);
        assertPastedList(["Alexandria"], 2);
    });

    it("13. duplicates count once", () => {
        openPopover(CITY);
        paste("Cairo\nCairo\nAlexandria").should("eq", true);
        assertPastedList(["Alexandria", "Cairo"]);
    });

    // -----------------------------------------------------------------------------------------------------------------
    // Not found
    // -----------------------------------------------------------------------------------------------------------------

    it("7. not found values: toggle, list and copy", () => {
        openPopover(CITY);

        cy.window().then(win => {
            cy.stub(win.navigator.clipboard, "writeText").as("writeText").resolves();
        });

        paste("Cairo\nAtlantis\nAlexandria\nEldorado").should("eq", true);

        assertChip(4);
        assertMatchedList(["Alexandria", "Cairo"]);
        assertFeedback(2, 4, 2);

        cy.get("[data-cy='paste-not-found']").should("not.exist");
        cy.get("[data-cy='paste-not-found-toggle']").click();
        cy.get("[data-cy='paste-not-found']")
            .should("be.visible")
            .and("contain.text", "Atlantis")
            .and("contain.text", "Eldorado")
            .and("not.contain.text", "Cairo");

        cy.get("[data-cy='paste-not-found-copy']").click();
        cy.get("@writeText").should("have.been.calledOnceWith", "Atlantis\nEldorado");
    });

    it("7. one unknown value among three", () => {
        openPopover(CITY);
        paste("Cairo\nAtlantis\nAlexandria").should("eq", true);
        assertChip(3);
        assertFeedback(2, 3, 1);
        cy.get("[data-cy='paste-not-found-toggle']").click();
        cy.get("[data-cy='paste-not-found']").should("contain.text", "Atlantis");
    });

    // -----------------------------------------------------------------------------------------------------------------
    // Nothing applied automatically
    // -----------------------------------------------------------------------------------------------------------------

    it("8. Enter does not close the popover", () => {
        openPopover(CITY);
        paste(THREE.join("\n"));
        assertChip(3);

        searchInput().type("{enter}");
        cy.get("[data-cy='confirm-selection']").should("be.visible");
        assertChip(3);
    });

    it("8. OK applies the matched members", () => {
        openPopover(CITY);
        paste(THREE.join("\n"));
        assertChip(3);
        confirm();

        assertClosedValues(CITY, THREE);
        assertEventContains(THREE);   // captions are also part of the city member keys
    });

    it("8. Cancel discards the paste", () => {
        openPopover(CITY);
        paste(THREE.join("\n"));
        assertChip(3);
        cancel();

        assertClosedValues(CITY, [], THREE);
        cy.assertEventValue(wEvent, "");
    });

    it("8. clicking outside applies", () => {
        openPopover(CITY);
        paste(THREE.join("\n"));
        assertChip(3);

        cy.clickOutside();
        cy.get("[data-cy='confirm-selection']").should("not.exist");

        assertClosedValues(CITY, THREE);
    });

    it("8. control: clicking outside applies a manual selection", () => {
        openPopover(CITY);
        selectBySearch("Cairo");

        cy.clickOutside();
        cy.get("[data-cy='confirm-selection']").should("not.exist");

        assertClosedValues(CITY, ["Cairo"]);
    });

    it("9. unticked member is not applied", () => {
        openPopover(CITY);
        paste(THREE.join("\n"));
        assertChip(3);

        cy.get("[data-cy='search-content']").contains("p", "Cairo").click({scrollBehavior: false});
        rows().find("input[type='checkbox']:checked").should("have.length", 2);

        confirm();
        assertClosedValues(CITY, ["Alexandria", "Johannesburg"], ["Cairo"]);
    });

    it("10. paste adds to the existing selection", () => {
        openPopover(CITY);
        selectBySearch("Marseille");
        confirm();
        assertClosedValues(CITY, ["Marseille"]);

        openPopover(CITY);
        paste("Cairo\nAlexandria");
        assertFeedback(2, 2);
        confirm();

        assertClosedValues(CITY, ["Marseille", "Cairo", "Alexandria"]);
    });

    // -----------------------------------------------------------------------------------------------------------------
    // Leaving paste mode
    // -----------------------------------------------------------------------------------------------------------------

    it("11. deleting the chip leaves paste mode", () => {
        openPopover(CITY);
        paste(THREE.join("\n"));
        assertChip(3);

        cy.get("[data-cy='paste-list-chip'] .MuiChip-deleteIcon").click();

        assertNoPasteMode();
        rows().should("have.length.greaterThan", 3);   // normal list back

        confirm();
        assertClosedValues(CITY, THREE);
    });

    it("11. clicking the search box X leaves paste mode", () => {
        openPopover(CITY);
        paste(THREE.join("\n"));
        assertChip(3);

        cy.get("[data-cy='search-field'] button").last().click();

        assertNoPasteMode();
        rows().should("have.length.greaterThan", 3);

        confirm();
        assertClosedValues(CITY, THREE);
    });

    it("11. typing in the search box leaves paste mode", () => {
        openPopover(CITY);
        paste(THREE.join("\n"));
        assertChip(3);

        searchInput().type("Cai");
        assertNoPasteMode();

        searchInput().clear();
        confirm();
        assertClosedValues(CITY, THREE);
    });

    it("11. typing in the search box: pasted members shown ticked", () => {
        openPopover(CITY);
        paste(THREE.join("\n"));
        assertChip(3);

        searchInput().type("Cai");
        assertNoPasteMode();

        cy.get("[data-cy='search-content']")
            .contains("p", "Cairo")
            .closest("[data-cy^='fp-item-']")
            .find("input[type='checkbox']")
            .should("be.checked");
    });

    // -----------------------------------------------------------------------------------------------------------------
    // Level property / IS_NONE_OF / hierarchy
    // -----------------------------------------------------------------------------------------------------------------

    it("level property filter (Country)", () => {
        openPopover(COUNTRY);
        searchInput().should("have.attr", "placeholder", "Search or paste a list of values");

        paste("Egypt\nsouth africa\nAtlantis").should("eq", true);
        assertPastedList(["Egypt", "South Africa"], 3);

        confirm();
        assertClosedValues(COUNTRY, ["Egypt", "South Africa"]);
    });

    it("12. IS_NONE_OF excludes the pasted members", () => {
        openPopover(ARTICLE);
        paste("Personal\nSilver").should("eq", true);
        assertPastedList(["Personal", "Silver"]);

        confirm();
        assertClosedValues(ARTICLE, ["Personal", "Silver"]);
        assertEventContains([]);
    });

    it("hierarchy (tree) filter: no paste list", () => {
        openPopover(REGION);
        searchInput().should("have.attr", "placeholder", "Search");

        paste("Africa\nEurope").should("eq", false);
        assertNoPasteMode();
    });

    it("closed value field: paste does nothing special", () => {
        filterItem(CITY)
            .find("[data-cy='value-selector-text'] input")
            .then($input => {
                const input = $input[0];
                const win = input.ownerDocument.defaultView as Window & typeof globalThis;
                const dataTransfer = new win.DataTransfer();
                dataTransfer.setData("text/plain", THREE.join("\n"));
                input.dispatchEvent(new win.ClipboardEvent("paste", {clipboardData: dataTransfer, bubbles: true, cancelable: true}));
            });

        cy.get("[data-cy='paste-list-chip']").should("not.exist");
        cy.get("[data-cy='confirm-selection']").should("not.exist");
        assertClosedValues(CITY, [], THREE);
    });

});
