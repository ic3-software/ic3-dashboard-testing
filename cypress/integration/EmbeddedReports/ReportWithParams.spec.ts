import {assertButtonsSelection} from "../Filters/FilterUtils";

export {};

describe("Embedded Reports/Report w/ Params", () => {

    // [
    //     {
    //         "channelName": "continent",
    //         "value": [
    //             {
    //                 "caption": "Asia",
    //                 "name": "Asia",
    //                 "uniqueName": "[Geography].[Geography].[Continent].&[AS]"
    //             },
    //             {
    //                 "caption": "Europe",
    //                 "name": "Europe",
    //                 "uniqueName": "[Geography].[Geography].[Continent].&[EU]"
    //             }
    //         ]
    //     }
    // ]

    // ic3params=%5B%0A%20%20%7B%0A%20%20%20%20%22channelName%22%3A%20%22continent%22%2C%0A%20%20%20%20%22value%22%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22caption%22%3A%20%22Asia%22%2C%0A%20%20%20%20%20%20%20%20%22name%22%3A%20%22Asia%22%2C%0A%20%20%20%20%20%20%20%20%22uniqueName%22%3A%20%22%5BGeography%5D.%5BGeography%5D.%5BContinent%5D.%26%5BAS%5D%22%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%22caption%22%3A%20%22Europe%22%2C%0A%20%20%20%20%20%20%20%20%22name%22%3A%20%22Europe%22%2C%0A%20%20%20%20%20%20%20%20%22uniqueName%22%3A%20%22%5BGeography%5D.%5BGeography%5D.%5BContinent%5D.%26%5BEU%5D%22%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%5D%0A%20%20%7D%0A%5D

    beforeEach(() => {

        cy.login();
        cy.openViewerTestReport({
            path: "shared:/Embedded/2wayFilterSync",
            params: '[{"channelName": "continent","value":[{"caption": "Asia","name": "Asia","uniqueName": "[Geography].[Geography].[Continent].&[AS]"},{"caption": "Europe","name": "Europe","uniqueName": "[Geography].[Geography].[Continent].&[EU]"}]}]',
        });

        cy.waitForQueryCount(2);
    });

    it("Basics", () => {

        assertButtonsSelection("ww2", "", ["Africa", "Asia", "Europe", "North America", "Oceania", "South America"], ["Asia", "Europe"], null)

    });

});
