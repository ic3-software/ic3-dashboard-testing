// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import Timeoutable = Cypress.Timeoutable;
import VisitOptions = Cypress.VisitOptions;
import Loggable = Cypress.Loggable;

require('@4tw/cypress-drag-drop')
require('cypress-real-events/support')
require('cypress-cdp')

type $widget = any;

type ValidTimeZones =
    "Africa/Abidjan"
    | "Africa/Accra"
    | "Africa/Addis_Ababa"
    | "Africa/Algiers"
    | "Africa/Asmera"
    | "Africa/Bamako"
    | "Africa/Bangu"
    | "Africa/Banjul"
    | "Africa/Bissau"
    | "Africa/Blantyre"
    | "Africa/Brazzaville"
    | "Africa/Bujumbura"
    | "Africa/Cairo"
    | "Africa/Casablanca"
    | "Africa/Ceuta"
    | "Africa/Conakry"
    | "Africa/Dakar"
    | "Africa/Dar_es_Salaam"
    | "Africa/Djibouti"
    | "Africa/Douala"
    | "Africa/El_Aaiun"
    | "Africa/Freetown"
    | "Africa/Gaborone"
    | "Africa/Harare"
    | "Africa/Johannesburg"
    | "Africa/Juba"
    | "Africa/Kampala"
    | "Africa/Khartoum"
    | "Africa/Kigali"
    | "Africa/Kinshasa"
    | "Africa/Lagos"
    | "Africa/Libreville"
    | "Africa/Lome"
    | "Africa/Luanda"
    | "Africa/Lubumbashi"
    | "Africa/Lusaka"
    | "Africa/Malabo"
    | "Africa/Maputo"
    | "Africa/Maseru"
    | "Africa/Mbabane"
    | "Africa/Mogadishu"
    | "Africa/Monrovia"
    | "Africa/Nairobi"
    | "Africa/Ndjamena"
    | "Africa/Niamey"
    | "Africa/Nouakchott"
    | "Africa/Ouagadougou"
    | "Africa/Porto-Novo"
    | "Africa/Sao_Tome"
    | "Africa/Tripoli"
    | "Africa/Tunis"
    | "Africa/Windhoek"
    | "America/Adak"
    | "America/Anchorage"
    | "America/Anguilla"
    | "America/Antigua"
    | "America/Araguaina"
    | "America/Argentina/La_Rioja"
    | "America/Argentina/Rio_Gallegos"
    | "America/Argentina/Salta"
    | "America/Argentina/San_Juan"
    | "America/Argentina/San_Luis"
    | "America/Argentina/Tucuman"
    | "America/Argentina/Ushuaia"
    | "America/Aruba"
    | "America/Asuncion"
    | "America/Bahia"
    | "America/Bahia_Banderas"
    | "America/Barbados"
    | "America/Belem"
    | "America/Belize"
    | "America/Blanc-Sablon"
    | "America/Boa_Vista"
    | "America/Bogota"
    | "America/Boise"
    | "America/Buenos_Aires"
    | "America/Cambridge_Bay"
    | "America/Campo_Grande"
    | "America/Cancun"
    | "America/Caracas"
    | "America/Catamarca"
    | "America/Cayenne"
    | "America/Cayman"
    | "America/Chicago"
    | "America/Chihuahua"
    | "America/Ciudad_Juarez"
    | "America/Coral_Harbour"
    | "America/Cordoba"
    | "America/Costa_Rica"
    | "America/Creston"
    | "America/Cuiaba"
    | "America/Curacao"
    | "America/Danmarkshavn"
    | "America/Dawson"
    | "America/Dawson_Creek"
    | "America/Denver"
    | "America/Detroit"
    | "America/Dominica"
    | "America/Edmonton"
    | "America/Eirunepe"
    | "America/El_Salvador"
    | "America/Fort_Nelson"
    | "America/Fortaleza"
    | "America/Glace_Bay"
    | "America/Godthab"
    | "America/Goose_Bay"
    | "America/Grand_Turk"
    | "America/Grenada"
    | "America/Guadeloupe"
    | "America/Guatemala"
    | "America/Guayaquil"
    | "America/Guyana"
    | "America/Halifax"
    | "America/Havana"
    | "America/Hermosillo"
    | "America/Indiana/Knox"
    | "America/Indiana/Marengo"
    | "America/Indiana/Petersburg"
    | "America/Indiana/Tell_City"
    | "America/Indiana/Vevay"
    | "America/Indiana/Vincennes"
    | "America/Indiana/Winamac"
    | "America/Indianapolis"
    | "America/Inuvik"
    | "America/Iqaluit"
    | "America/Jamaica"
    | "America/Jujuy"
    | "America/Juneau"
    | "America/Kentucky/Monticello"
    | "America/Kralendijk"
    | "America/La_Paz"
    | "America/Lima"
    | "America/Los_Angeles"
    | "America/Louisville"
    | "America/Lower_Princes"
    | "America/Maceio"
    | "America/Managua"
    | "America/Manaus"
    | "America/Marigot"
    | "America/Martinique"
    | "America/Matamoros"
    | "America/Mazatlan"
    | "America/Mendoza"
    | "America/Menominee"
    | "America/Merida"
    | "America/Metlakatla"
    | "America/Mexico_City"
    | "America/Miquelon"
    | "America/Moncton"
    | "America/Monterrey"
    | "America/Montevideo"
    | "America/Montserrat"
    | "America/Nassau"
    | "America/New_York"
    | "America/Nome"
    | "America/Noronha"
    | "America/North_Dakota/Beulah"
    | "America/North_Dakota/Center"
    | "America/North_Dakota/New_Salem"
    | "America/Ojinaga"
    | "America/Panama"
    | "America/Paramaribo"
    | "America/Phoenix"
    | "America/Port-au-Prince"
    | "America/Port_of_Spain"
    | "America/Porto_Velho"
    | "America/Puerto_Rico"
    | "America/Punta_Arenas"
    | "America/Rankin_Inlet"
    | "America/Recife"
    | "America/Regina"
    | "America/Resolute"
    | "America/Rio_Branco"
    | "America/Santarem"
    | "America/Santiago"
    | "America/Santo_Domingo"
    | "America/Sao_Paulo"
    | "America/Scoresbysund"
    | "America/Sitka"
    | "America/St_Barthelemy"
    | "America/St_Johns"
    | "America/St_Kitts"
    | "America/St_Lucia"
    | "America/St_Thomas"
    | "America/St_Vincent"
    | "America/Swift_Current"
    | "America/Tegucigalpa"
    | "America/Thule"
    | "America/Tijuana"
    | "America/Toronto"
    | "America/Tortola"
    | "America/Vancouver"
    | "America/Whitehorse"
    | "America/Winnipeg"
    | "America/Yakutat"
    | "Antarctica/Casey"
    | "Antarctica/Davis"
    | "Antarctica/DumontDUrville"
    | "Antarctica/Macquarie"
    | "Antarctica/Mawson"
    | "Antarctica/McMurdo"
    | "Antarctica/Palmer"
    | "Antarctica/Rothera"
    | "Antarctica/Syowa"
    | "Antarctica/Troll"
    | "Antarctica/Vostok"
    | "Arctic/Longyearbyen"
    | "Asia/Aden"
    | "Asia/Almaty"
    | "Asia/Amman"
    | "Asia/Anadyr"
    | "Asia/Aqtau"
    | "Asia/Aqtobe"
    | "Asia/Ashgabat"
    | "Asia/Atyrau"
    | "Asia/Baghdad"
    | "Asia/Bahrain"
    | "Asia/Baku"
    | "Asia/Bangkok"
    | "Asia/Barnaul"
    | "Asia/Beirut"
    | "Asia/Bishkek"
    | "Asia/Brunei"
    | "Asia/Calcutta"
    | "Asia/Chita"
    | "Asia/Choibalsan"
    | "Asia/Colombo"
    | "Asia/Damascus"
    | "Asia/Dhaka"
    | "Asia/Dili"
    | "Asia/Dubai"
    | "Asia/Dushanbe"
    | "Asia/Famagusta"
    | "Asia/Gaza"
    | "Asia/Hebron"
    | "Asia/Hong_Kong"
    | "Asia/Hovd"
    | "Asia/Irkutsk"
    | "Asia/Jakarta"
    | "Asia/Jayapura"
    | "Asia/Jerusalem"
    | "Asia/Kabul"
    | "Asia/Kamchatka"
    | "Asia/Karachi"
    | "Asia/Katmandu"
    | "Asia/Khandyga"
    | "Asia/Krasnoyarsk"
    | "Asia/Kuala_Lumpur"
    | "Asia/Kuching"
    | "Asia/Kuwait"
    | "Asia/Macau"
    | "Asia/Magadan"
    | "Asia/Makassar"
    | "Asia/Manila"
    | "Asia/Muscat"
    | "Asia/Nicosia"
    | "Asia/Novokuznetsk"
    | "Asia/Novosibirsk"
    | "Asia/Omsk"
    | "Asia/Oral"
    | "Asia/Phnom_Penh"
    | "Asia/Pontianak"
    | "Asia/Pyongyang"
    | "Asia/Qatar"
    | "Asia/Qostanay"
    | "Asia/Qyzylorda"
    | "Asia/Rangoon"
    | "Asia/Riyadh"
    | "Asia/Saigon"
    | "Asia/Sakhalin"
    | "Asia/Samarkand"
    | "Asia/Seoul"
    | "Asia/Shanghai"
    | "Asia/Singapore"
    | "Asia/Srednekolymsk"
    | "Asia/Taipei"
    | "Asia/Tashkent"
    | "Asia/Tbilisi"
    | "Asia/Tehran"
    | "Asia/Thimphu"
    | "Asia/Tokyo"
    | "Asia/Tomsk"
    | "Asia/Ulaanbaatar"
    | "Asia/Urumqi"
    | "Asia/Ust-Nera"
    | "Asia/Vientiane"
    | "Asia/Vladivostok"
    | "Asia/Yakutsk"
    | "Asia/Yekaterinburg"
    | "Asia/Yerevan"
    | "Atlantic/Azores"
    | "Atlantic/Bermuda"
    | "Atlantic/Canary"
    | "Atlantic/Cape_Verde"
    | "Atlantic/Faeroe"
    | "Atlantic/Madeira"
    | "Atlantic/Reykjavik"
    | "Atlantic/South_Georgia"
    | "Atlantic/St_Helena"
    | "Atlantic/Stanley"
    | "Australia/Adelaide"
    | "Australia/Brisbane"
    | "Australia/Broken_Hill"
    | "Australia/Darwin"
    | "Australia/Eucla"
    | "Australia/Hobart"
    | "Australia/Lindeman"
    | "Australia/Lord_Howe"
    | "Australia/Melbourne"
    | "Australia/Perth"
    | "Australia/Sydney"
    | "Europe/Amsterdam"
    | "Europe/Andorra"
    | "Europe/Astrakhan"
    | "Europe/Athens"
    | "Europe/Belgrade"
    | "Europe/Berlin"
    | "Europe/Bratislava"
    | "Europe/Brussels"
    | "Europe/Bucharest"
    | "Europe/Budapest"
    | "Europe/Busingen"
    | "Europe/Chisinau"
    | "Europe/Copenhagen"
    | "Europe/Dublin"
    | "Europe/Gibraltar"
    | "Europe/Guernsey"
    | "Europe/Helsinki"
    | "Europe/Isle_of_Man"
    | "Europe/Istanbul"
    | "Europe/Jersey"
    | "Europe/Kaliningrad"
    | "Europe/Kiev"
    | "Europe/Kirov"
    | "Europe/Lisbon"
    | "Europe/Ljubljana"
    | "Europe/London"
    | "Europe/Luxembourg"
    | "Europe/Madrid"
    | "Europe/Malta"
    | "Europe/Mariehamn"
    | "Europe/Minsk"
    | "Europe/Monaco"
    | "Europe/Moscow"
    | "Europe/Oslo"
    | "Europe/Paris"
    | "Europe/Podgorica"
    | "Europe/Prague"
    | "Europe/Riga"
    | "Europe/Rome"
    | "Europe/Samara"
    | "Europe/San_Marino"
    | "Europe/Sarajevo"
    | "Europe/Saratov"
    | "Europe/Simferopol"
    | "Europe/Skopje"
    | "Europe/Sofia"
    | "Europe/Stockholm"
    | "Europe/Tallinn"
    | "Europe/Tirane"
    | "Europe/Ulyanovsk"
    | "Europe/Vaduz"
    | "Europe/Vatican"
    | "Europe/Vienna"
    | "Europe/Vilnius"
    | "Europe/Volgograd"
    | "Europe/Warsaw"
    | "Europe/Zagreb"
    | "Europe/Zurich"
    | "Indian/Antananarivo"
    | "Indian/Chagos"
    | "Indian/Christmas"
    | "Indian/Cocos"
    | "Indian/Comoro"
    | "Indian/Kerguelen"
    | "Indian/Mahe"
    | "Indian/Maldives"
    | "Indian/Mauritius"
    | "Indian/Mayotte"
    | "Indian/Reunion"
    | "Pacific/Apia"
    | "Pacific/Auckland"
    | "Pacific/Bougainville"
    | "Pacific/Chatham"
    | "Pacific/Easter"
    | "Pacific/Efate"
    | "Pacific/Enderbury"
    | "Pacific/Fakaofo"
    | "Pacific/Fiji"
    | "Pacific/Funafuti"
    | "Pacific/Galapagos"
    | "Pacific/Gambier"
    | "Pacific/Guadalcanal"
    | "Pacific/Guam"
    | "Pacific/Honolulu"
    | "Pacific/Kiritimati"
    | "Pacific/Kosrae"
    | "Pacific/Kwajalein"
    | "Pacific/Majuro"
    | "Pacific/Marquesas"
    | "Pacific/Midway"
    | "Pacific/Nauru"
    | "Pacific/Niue"
    | "Pacific/Norfolk"
    | "Pacific/Noumea"
    | "Pacific/Pago_Pago"
    | "Pacific/Palau"
    | "Pacific/Pitcairn"
    | "Pacific/Ponape"
    | "Pacific/Port_Moresby"
    | "Pacific/Rarotonga"
    | "Pacific/Saipan"
    | "Pacific/Tahiti"
    | "Pacific/Tarawa"
    | "Pacific/Tongatapu"
    | "Pacific/Truk"
    | "Pacific/Wake"
    | "Pacific/Wallis";

const QUERY_STATUS_TIMEOUT = 30000;
const QUERY_COUNT_TIMEOUT = 30000;
const PRINT_STATUS_TIMEOUT = 30000;

const STATOS_SELECTION_BACKGROUND_COLOR = "rgb(234, 245, 254)";
const STATOS_SELECTION_COLOR_HEX = "#64b5f6";

function createPrintInBrowserURL(path: string): Partial<VisitOptions> & { url: string } {

    return {
        url: Cypress.config().baseUrl === "http://localhost:3000" ? "/viewer" : "/icCube/report/viewer",

        qs: {
            // ic3appLocalUrl: "dft",
            //
            // ic3dataSource: JSON.stringify({
            //     url: Cypress.config().baseUrl + "/icCube/gvi"
            // }),

            ic3report: path,

            ic3printParams: JSON.stringify({

                // fitToPage: "true",

                scale: 1.0,

                // A4

                pageSizeName: "A4",
                pageOrientation: "portrait",

                pageSizeUnits: "mm",
                pageWidth: 210,
                pageHeight: 297,

                marginTop: 10,
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 10,
            })
        }
    }
}


type WidgetBoxContentType =
    "data-cy-no-template-definition" |
    "data-cy-no-definition" |
    "data-cy-no-data" |
    "data-cy-waiting" |
    "data-cy-missing-schema" |
    "data-cy-report-not-available" |
    "data-cy-report-app-not-available" |
    "data-cy-gadget-not-available" |
    "data-cy-request-ajax-timeout" |
    "data-cy-request-cancelled" |
    "data-cy-schema-not-authorized" |
    "data-cy-template-definition-resolve-error" |
    "data-cy-template-definition-resolving" |
    "data-cy-template-render-error" |
    "data-cy-depends-on-theme-not-used" |
    "data-cy-depends-on-theme-id-unknown" |
    "data-cy-content-in-error" |
    "data-cy-no-into-view-yet"
    ;

type TreeMode = "control-icons";

interface PdfResult {
    numpages: number;
    numrender: number;
    info: any;
    metadata: any;
    version: string;
    text: string;
}

interface IOpenReport {
    path: string;
    params: string;
}

type TableMenuOption = "Unsort" | "Sort by ASC" | "Sort by DESC" | "Hide" | "Pin to left" | "Pin to right" | "Filter"

function getTableHeaderSelector(headerTitle: string, extra?: string): string {
    return ".MuiDataGrid-columnHeader[data-field='" + headerTitle + "'] " + (extra ?? "");
}

interface Cypress {
    // Utils
    migrateDate(date: string | null | undefined): string | null | undefined;

}

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {


    interface Chainable<Subject> {

        login(): void;

        performLogin(): void;

        /**
         * @param testAppName        as displayed in the editor report info minus "shared:Cypress - "
         * @param waitForQueryStatus defaulted to true
         * @param waitForPrintStatus defaulted to true
         */
        openAppTestReport(testAppName: string, waitForQueryStatus?: boolean, waitForPrintStatus?: boolean): void;

        /**
         * @param path               as displayed in the editor report info minus "shared:/Tests/"
         * @param waitForQueryStatus defaulted to true
         * @param waitForPrintStatus defaulted to true
         * @param userLocale open the report in this locale
         */
        openMdxConsole(): void;

        openViewerTestReport(path: string | IOpenReport, waitForQueryStatus?: boolean, waitForPrintStatus?: boolean, doNotForceWidgetRendering?: boolean,
                             userLocale?: string): void;

        openPrintInBrowserTestReport(path: string, waitForQueryStatus?: boolean, waitForPrintStatus?: boolean): void;

        reloadAndWait(waitForQueryStatus?: boolean, waitForPrintStatus?: boolean): void;

        openGadgetEditor(path?: string): void

        /**
         * @param path               as displayed in the editor report info minus "shared:/Tests/"
         * @param waitForQueryStatus defaulted to true
         * @param waitForPrintStatus defaulted to true
         */
        openEditorTestReport(path: string, waitForQueryStatus?: boolean, waitForPrintStatus?: boolean): void;

        waitForQueryCount(count: number): void;

        waitForChartRendering(count: number): void;

        waitForBoxContentHook(count: number): void;

        setChartRendering(alias: string): void;

        setBoxContentHook(alias: string): void;

        waitForQueryStatusForLargeDashboard(): void;

        waitForQueryStatus(): Chainable<Subject>;

        waitForPrintStatus(): Chainable<Subject>;

        refreshDashboard(): void;

        clickNextPage(): void;

        clickPreviousPage(): void;

        /**
         * Click in the editor top left icon.
         */
        switchEditorToQuickViewMode(): void;

        // -------------------------------------------------------------------------------------------------------------
        // Localization & administration
        // -------------------------------------------------------------------------------------------------------------

        openAdministration(): void;

        adminSetDashboardFilter(filter: string): void;

        adminGenerateTags(): void;

        adminTestFilter(): void;

        adminAssertTagsTestResult(text: string): void;

        adminAssertLocalizationRowCount(count: number): void;

        adminAssertLocalizationColumnCount(count: number): void;

        adminAssertLocalizationTableValue(row: number, col: number, value: string | null): void;

        adminAssertLocalizationTableTags(reportPath: string, tags: string[]): void;

        // -------------------------------------------------------------------------------------------------------------
        // Layout
        // -------------------------------------------------------------------------------------------------------------

        assertPageCount(count: number): void;

        assertWidgetDetails(pageNb: number, widgetId: string, left: number, top: number, width: number, height: number): void;

        assertWidgetDetailsEx(pageNb: number, widgetId: string, left: number, top: number, width: number, height: number): void;

        // -------------------------------------------------------------------------------------------------------------
        // Widget
        // -------------------------------------------------------------------------------------------------------------

        getWidget(widgetId: string, contentType?: WidgetBoxContentType): Chainable<Subject>;

        getWidgetWithNS(nsId: string, widgetId: string, contentType?: WidgetBoxContentType): Chainable<Subject>;

        getWidgetHeader(widgetId: string): Chainable<Subject>;

        assertWidgetHeader(widgetId: string, header: string): void;

        assertWidgetQueryLoading(widgetId: string): void;

        clickWidgetHeader(widgetId: string): Chainable<Subject>;

        assertWidgetDataOnError(widgetId: string): void;

        assertWidgetNoData(widgetId: string): void;

        assertWidgetWaiting(widgetId: string): void;

        assertWidgetMissing(widgetId: string): void;

        assertWidgetInvisible(widgetId: string): void;

        assertWidgetVisible(widgetId: string, visible: boolean): void;

        assertWidgetRenderStatus(widgetId: string, renderStatus: "RENDERING" | "RENDERED"): void;

        // -------------------------------------------------------------------------------------------------------------
        // Switch widget
        // -------------------------------------------------------------------------------------------------------------

        clickSwitch(widgetId: string): void;

        // -------------------------------------------------------------------------------------------------------------
        // Tidy Table
        // -------------------------------------------------------------------------------------------------------------

        assertTidyRowCount(widgetId: string, count: number): void;

        assertTidyColumnCount(widgetId: string, count: number): void;

        // -------------------------------------------------------------------------------------------------------------
        // Widget (Zoomed)
        // -------------------------------------------------------------------------------------------------------------

        getZoomedWidget(widgetId: string): Chainable<Subject>;

        assertZoomedHeader(widgetId: string, header: string): void;

        closeZoomedWidget(widgetId: string): void;

        // -------------------------------------------------------------------------------------------------------------
        // Drilldown
        // -------------------------------------------------------------------------------------------------------------

        clickDrilldownBack(widgetId: string, levels?: number): void;

        clickDrilldownLevel(widgetId: string, level: number): void;

        clickDrilldownMenu(widgetId: string, path: (number | string)[]): void;

        // -------------------------------------------------------------------------------------------------------------
        // User Menu
        // -------------------------------------------------------------------------------------------------------------

        assertUserMenuVisibility(widgetId: string, option: string, isVisible: boolean): void;

        clickUserMenu(widgetId: string, option: string, nsId?: string): void;

        clickUserMenuShowData(widgetId: string): void;

        clickUserMenuBack(widgetId: string): void;

        clickUserMenuClearSelection(widgetId: string): void;

        clickUserMenuToInitialState(widgetId: string): void;

        clickUserMenuClearSorting(widgetId: string): void;

        clickUserMenuZoom(widgetId: string, isInZoom?: boolean): void;

        exportToExcel(widgetId: string): void;

        clickUserMenuRefreshQuery(widgetId: string): void;

        clickUserMenuAddEventToQueries(widgetId: string): void;

        // -------------------------------------------------------------------------------------------------------------
        // Report App.
        // -------------------------------------------------------------------------------------------------------------

        appClickMenu(index: number): void;

        // -------------------------------------------------------------------------------------------------------------
        // Table
        // -------------------------------------------------------------------------------------------------------------

        sortTable(widgetId: string, column: number): void;

        clickTableColumnMenuIcon(widgetId: string, column: number, option: TableMenuOption): void;

        filterTableColumnWithMenuIcon(widgetId: string, colIdx: number, filter: string): void;

        clickTableHeaderMenu(widgetId: string, headerTitle: string, menuOption: TableMenuOption): void;

        clickTableRow(widgetId: string, rowIdx: number): void;

        clickTableCell(widgetId: string, rowIdx: number, colIdx: number, ctrl?: boolean): void;

        clickTableCellDrilldown(widgetId: string, rowIdx: number, colIdx: number): void;

        clickHeaderCheckbox(widgetId: string): void;

        getTableHeader(widgetId: string, headerTitle: string, extra?: string): Chainable<Subject>;

        assertTableRowCount(widgetId: string, count: number): void;

        assertTableColCount(widgetId: string, count: number): void;

        assertTableDomRowCount(widgetId: string, count: number): void;

        assertTableDomColCount(widgetId: string, count: number): void;

        assertTableDetails(pageNb: number, widgetId: string, withBoxHeader: boolean, withTableHeader: boolean,
                           height: number, rowCount: number, headerCount?: number): void;

        assertTableValue(widgetId: string, row: number, col: number, value: string | null): void;

        assertTableCellContent(widgetId: string, rowIdx: number, colIdx: number, cellValue: string): void;

        assertTableCellOnError(widgetId: string, rowIdx: number, colIdx: number): void;

        assertTableColumnsEqual(widgetId: string, expectedWidgetId: string, rowCount: number, colCount: number): void;

        assertTableColumnEqual(widgetId: string, expectedWidgetId: string, rowCount: number, colIdx: number): void;

        assertTableSingleRowSelected(widgetId: string, rowIdx: number, rowCount: number): void;

        assertTableRowSelected(widgetId: string | $widget, rowIdx: number): void;

        assertTableRowNotSelected(widgetId: string | $widget, rowIdx: number): void;

        assertTableColumnSelected(widgetId: string, colIdx: number): void;

        assertTableColumnTitle(widgetId: string, colIdx: number, expectedTitle: string): void;

        assertTableColumnHeader(widgetId: string, colIdx: number, expectedTitle: string): void;

        assertTableCellSelected(widgetId: string, rowIdx: number, cellIdx: number): void;

        assertTableCellBold(widgetId: string, rowIdx: number, cellIdx: number): void;

        assertTableHeaderBold(widgetId: string, title: string): void;

        assertTableColumnNotSelected(widgetId: string, colIdx: number): void;

        // -------------------------------------------------------------------------------------------------------------
        // Widget > 'show data' Table
        // -------------------------------------------------------------------------------------------------------------

        assertShowDataTableCellContent(widgetId: string, rowIdx: number, colIdx: number, cellValue: string): void;

        // -------------------------------------------------------------------------------------------------------------
        // Pivot Table
        // -------------------------------------------------------------------------------------------------------------

        sortPivotTable(widgetId: string, column: number, row?: number): void;

        drilldownPivotTableLeftHeader(widgetId: string, row: number, col: number): void;

        drilldownPivotTableTopHeader(widgetId: string, row: number, col: number): void;

        scrollPivotTable(widgetId: string, distance: number): void;

        selectPivotTableLeftHeader(widgetId: string, row: number, col: number): void;

        selectPivotTableTopHeader(widgetId: string, row: number, col: number): void;

        selectPivotTableCell(widgetId: string, row: number, col: number): void;

        assertPivotTableRowCount(widgetId: string, count: number): void;

        assertPivotTableColCount(widgetId: string, count: number): void;

        assertPivotTableDetails(pageNb: number, widgetId: string, withBoxHeader: boolean, withTableHeader: boolean, height: number, rowCount: number): void;

        assertPivotTableLeftHeader(widgetId: string, row: number, col: number, value: string | string[]): void;

        assertPivotTableTopHeader(widgetId: string, row: number, col: number, value: string): void;

        assertPivotTableCell(widgetId: string, row: number, col: number, value: string | string[]): void;

        assertPivotTableCellSelected(widgetId: string, row: number, col: number): void;

        assertPivotTableNoCellSelected(widgetId: string): void;

        assertPivotTableCellOnError(widgetId: string, row: number, col: number): void;

        assertPivotTableColumnsEqual(widgetId: string, expectedWidgetId: string, rowCount: number, colCount: number): void;

        assertPivotTableCellBold(widgetId: string, row: number, col: number): void;

        assertPivotTableTopHeaderBold(widgetId: string, row: number, col: number): void;

        assertPivotTableLeftHeaderBold(widgetId: string, row: number, col: number): void;

        // -------------------------------------------------------------------------------------------------------------
        // Repetition Widget
        // -------------------------------------------------------------------------------------------------------------

        assertRepetitionWidgetDetails(pageNb: number, widgetId: string, withBoxHeader: boolean, height: number, rowCount: number): void;

        assertRepetitionWidgetRowColumnCount(pageNb: number, widgetId: string, nestedWidgetId: string, rowCount: number, columnCount: number, rows?: string[], columns?: string[]): void;

        // -------------------------------------------------------------------------------------------------------------
        // Filter: Buttons
        // -------------------------------------------------------------------------------------------------------------

        selectButton(widgetId: string, label: string): void;

        assertButtonSelected(widgetId: string, label: string): void;

        assertButtonsSelected(widgetId: string, labels?: string[]): void;

        assertButtonNotSelected(widgetId: string, ...label: string[]): void;

        assertButtons(widgetId: string, labels: string[]): void;

        // -------------------------------------------------------------------------------------------------------------
        // Filter: Checkbox
        // -------------------------------------------------------------------------------------------------------------

        selectCheckbox(widgetId: string, label: string): void;

        assertCheckboxSelected(widgetId: string, ...label: string[]): void;

        assertCheckboxNotSelected(widgetId: string, label: string): void;

        assertCheckboxes(widgetId: string, labels: string[]): void;

        // -------------------------------------------------------------------------------------------------------------
        // Filter: Dropdown (autocomplete)
        // -------------------------------------------------------------------------------------------------------------

        clearDropdown(widgetId: string): void;

        openDropdown(widgetId: string): void;

        closeDropdown(widgetId: string): void;

        assertDropdownOptions(widgetId: string, labels: string[]): void;

        selectDropdownFromInput(widgetId: string, label: string): void;

        selectDropdownFromInputLazy(widgetId: string, label: string): void;

        selectDropdownFromPopup(widgetId: string, label: string): void;

        assertDropdownSingleSelection(widgetId: string, label: string | null): void;

        assertDropdownMultiSelection(widgetId: string, labels: string[]): void;

        // -------------------------------------------------------------------------------------------------------------
        // Filter: Tree (w/ or wo/ autocomplete)
        // -------------------------------------------------------------------------------------------------------------

        /**
         * Control Icons active.
         */
        selectTree(widgetId: string, treeMode: TreeMode, label: string): void;

        expandTree(widgetId: string, treeMode: TreeMode, label: string): void;

        assertTreeExists(widgetId: string, treeMode: TreeMode, label: string): void;

        assertTreeSelection(widgetId: string, treeMode: TreeMode, labels: string[]): void;

        openTreeDropdown(widgetId: string): void;

        closeTreeDropdown(widgetId: string): void;

        selectTreeWithAutocompleteFromPopup(widgetId: string, treeMode: TreeMode, labels: string[], close?: boolean): void;

        assertTreeWithAutocompleteSingleSelection(widgetId: string, treeMode: TreeMode, label: string | null): void;

        assertTreeWithAutocompleteMultiSelection(widgetId: string, treeMode: TreeMode, labels: string[]): void;

        // -------------------------------------------------------------------------------------------------------------
        // Filter: Slider
        // -------------------------------------------------------------------------------------------------------------

        selectSlider(widgetId: string, label: string): void;

        assertSliderWithoutSelection(widgetId: string): void;

        assertSliderSelected(widgetId: string, ...label: string[]): void;

        assertSliderNotSelected(widgetId: string, label: string): void;

        assertSlider(widgetId: string, labels: string[]): void;

        // -------------------------------------------------------------------------------------------------------------
        // Filter: Date Picker
        // -------------------------------------------------------------------------------------------------------------

        selectDatePickerFromInput(widgetId: string, date: string): void;

        datePickerChooseShortcut(widgetId: string, shortcut: string): void;

        // selectTodayDateFromPopup(widgetId: string): void;

        assertDatePicker(widgetId: string, date: string | null): void;

        assertDatePickerRangeFrom(widgetId: string, date: string | null): void;

        assertDatePickerRangeTo(widgetId: string, date: string | null): void;

        selectDatePickerRangeFromFromInput(widgetId: string, date: string): void;

        selectDatePickerRangeToFromInput(widgetId: string, date: string): void;

        // -------------------------------------------------------------------------------------------------------------
        // Filter: Filter Panel
        // -------------------------------------------------------------------------------------------------------------

        assertFilterPanelCount(widgetId: string, filterCount: number): void;

        assertFilterPanelItems(widgetId: string, filterNames: string[]): void;

        panelFilterAdd(widgetId: string, field: string, selectIdx?: number): void;

        panelFilterSaveView(widgetId: string, viewName: string): void;

        panelFilterLoadView(widgetId: string, viewName: string): void;

        panelFilterClear(widgetId: string, index: number): void;

        panelFilterSetDefaultFilter(widgetId: string): void;

        panelFilterRemove(widgetId: string, index: number): void;

        panelFilterSelectOperatorFromInput(widgetId: string, index: number, operator: string): void;

        panelFilterSetTextFieldValue(widgetId: string, index: number, value: string): void;

        panelFilterSetDateTimeFieldValue(widgetId: string, index: number, value: string, isDate?: boolean): void;

        panelFilterSetDateFieldValue(widgetId: string, index: number, value: string): void;

        panelFilterSetSelection(widgetId: string, index: number, values: (string | RegExp)[]): void;

        panelFilterIsAnyOfSearchAndSelectAll(widgetId: string, index: number, search: string): void;

        panelFilterSetSelectionSimple(widgetId: string, index: number, values: string | RegExp): void;

        // -------------------------------------------------------------------------------------------------------------
        // Filter panel : single
        // -------------------------------------------------------------------------------------------------------------

        singlePanelFilterSetSelection(widgetId: string, values: (string | RegExp)[]): void;

        // -------------------------------------------------------------------------------------------------------------
        // Chart: Bar
        // -------------------------------------------------------------------------------------------------------------

        selectSingleChartBarInGroup(widgetBoxId: string, group: number, child: number): void;

        assertSelectedSingleChartBarInGroup(widgetBoxId: string, group: number, child: number): void;

        // -------------------------------------------------------------------------------------------------------------
        // Chart: Donut
        // -------------------------------------------------------------------------------------------------------------

        donutClickSlice(widgetId: string | $widget, slice: number): void;

        donutAssertSliceCount(widgetId: string, count: number): void;

        donutAssertSingleSliceSelected(widgetId: string, slice: number, sliceCount: number): void;

        donutAssertSliceSelected(widgetId: string | $widget, slice: number): void;

        donutAssertSliceNotSelected(widgetId: string | $widget, slice: number): void;

        // -------------------------------------------------------------------------------------------------------------
        // Chart: Column
        // -------------------------------------------------------------------------------------------------------------

        columnClickColumn(widgetId: string, column: number): void;

        columnAssertColumnCount(widgetId: string, count: number): void;

        columnAssertSingleColumnSelected(widgetId: string, column: number, columnCount: number): void;

        columnAssertColumnSelected(widgetId: string | $widget, column: number): void;

        columnAssertColumnNotSelected(widgetId: string | $widget, column: number): void;

        // -------------------------------------------------------------------------------------------------------------
        // Chart: Histogram
        // -------------------------------------------------------------------------------------------------------------

        histogramClickColumn(widgetId: string, column: number): void;

        histogramAssertColumnCount(widgetId: string, count: number): void;

        histogramAssertSingleColumnSelected(widgetId: string, column: number, columnCount: number): void;

        histogramAssertColumnSelected(widgetId: string | $widget, column: number): void;

        histogramAssertColumnNotSelected(widgetId: string | $widget, column: number): void;

        // -------------------------------------------------------------------------------------------------------------
        // Chart: GeoMap
        // -------------------------------------------------------------------------------------------------------------

        geomapClickColorArea(widgetId: string, color: string, index: number): void;

        geomapAssertColorAreaCount(widgetId: string, color: string, count: number): void;

        geomapAssertSelectionColorAreaCount(widgetId: string, count: number): void;

        // -------------------------------------------------------------------------------------------------------------
        // Chart: Area
        // -------------------------------------------------------------------------------------------------------------

        areaClickPoint(widgetId: string, point: number): void;

        areaAssertPointCount(widgetId: string, count: number): void;

        areaAssertSinglePointSelected(widgetId: string, point: number, pointCount: number): void;

        areaAssertPointSelected(widgetId: string | $widget, point: number): void;

        areaAssertPointNotSelected(widgetId: string | $widget, point: number): void;

        // -------------------------------------------------------------------------------------------------------------
        // Chart: Bubble
        // -------------------------------------------------------------------------------------------------------------

        bubbleClickBubble(widgetId: string, bubble: number): void;

        bubbleAssertBubbleCount(widgetId: string, count: number): void;

        bubbleAssertSingleBubbleSelected(widgetId: string, bubble: number, bubbleCount: number): void;

        bubbleAssertBubbleSelected(widgetId: string | $widget, bubble: number): void;

        bubbleAssertBubbleNotSelected(widgetId: string | $widget, bubble: number): void;

        // -------------------------------------------------------------------------------------------------------------
        // Chart: Scatter Plot
        // -------------------------------------------------------------------------------------------------------------

        scatterClickPoint(widgetId: string, point: number): void;

        scatterAssertPointCount(widgetId: string, count: number): void;

        scatterAssertSinglePointSelected(widgetId: string, point: number, pointCount: number): void;

        scatterAssertPointSelected(widgetId: string | $widget, point: number): void;

        scatterAssertPointNotSelected(widgetId: string | $widget, point: number): void;

        // -------------------------------------------------------------------------------------------------------------
        // Chart: TreeMap
        // -------------------------------------------------------------------------------------------------------------

        treeMapClickRectangle(widgetId: string, rectangle: number): void;

        treeMapAssertRectangleCount(widgetId: string, count: number): void;

        treeMapAssertSingleRectangleSelected(widgetId: string, rectangle: number, rectangleCount: number): void;

        treeMapAssertRectangleSelected(widgetId: string | $widget, rectangle: number): void;

        treeMapAssertRectangleNotSelected(widgetId: string | $widget, rectangle: number): void;

        // -------------------------------------------------------------------------------------------------------------
        // Chart: Sankey
        // -------------------------------------------------------------------------------------------------------------

        sankeyClickArea(widgetId: string, area: string): void;

        // -------------------------------------------------------------------------------------------------------------
        // Misc.
        // -------------------------------------------------------------------------------------------------------------

        clickOutside(): Chainable<Subject>;

        keyCtrl(cb: () => void): void;

        keyShift(cb: () => void): void;

        /**
         * Assuming the widget contains a marked down:
         * <pre>
         *      ##### Event tag : @{event}!
         * </pre>
         */
        assertEventWithText(widgetId: string, tag: string, value: string | null): void;

        /**
         * Assuming the widget contains a marked down:
         * <pre>
         *      ##### Event value : @{event}!
         * </pre>
         */
        assertEventValue(widgetId: string, value: string | null): void;

        /**
         * Assuming the widget contains a marked down:
         * <pre>
         *      ##### Event value : @{event}!
         * </pre>
         *
         * uses migrateDate
         */
        assertDateEventValue(widgetId: string, value: string | null): void;

        /**
         * Assuming the widget contains a marked down:
         * <pre>
         *      ##### Event mdx : @{event:mdx}!
         * </pre>
         */
        assertEventMdx(widgetId: string, value: string | null): void;

        /**
         * Assuming the widget contains a marked down:
         * <pre>
         *      ##### Event key : @{event:mdx}!
         * </pre>
         */
        assertEventKey(widgetId: string, value: string | null): void;

        /**
         * Assuming the widget contains a marked down:
         * <pre>
         *      ##### Event set : @{event:mdx}!
         * </pre>
         */
        assertEventAsSet(widgetId: string, value: string | null): void;

        // -------------------------------------------------------------------------------------------------------------
        // Widget Editor
        // -------------------------------------------------------------------------------------------------------------

        addWidgetAndOpenEditor(widgetType: "ic3.FilterAutocomplete" | "ic3.FilterButtons" | "ic3.PivotTable" | "ic3.Table" | string, posX?: number, posY?: number): void;

        widgetEditorOpen(widgetId: string): void;

        widgetCopy(widgetId: string): void;

        widgetPaste(): void;

        widgetEditorChangeTab(tabName: "tab-queryFilter" | "tab-query" | "tab-interactions" | "tab-chart"): void;

        widgetEditorTabNotExists(tabName: "tab-queryFilter" | "tab-query" | "tab-interactions" | "tab-chart"): void;

        widgetEditorEnterMdxStatement(mdxStatement: string): void;

        widgetEditorQueryBuilderAssertNode(dropAxis: string, nodeName: string): void;

        widgetEditorOpenOptionGroup(name: "groupSelection" | "widgetIcons" | "widgetActionsGroup" | "columns"): void;

        widgetEditorChangeOption(input: string, option: string): void;

        widgetEditorAssertOption(input: string, option: string): void;

        widgetEditorChangeTextOption(name: string, newValue: string): void;

        widgetEditorChangeBoolean(name: string): void;

        widgetEditorApplyAndClose(): void;

        widgetEditorApply(): void;

        widgetEditorClose(): void;

        widgetEditorChangeCube(cubeName: string): void;

        widgetEditorMdxTreeHasNode(nodeName: string): void;

        widgetEditorMdxTreeFilter(filterText: string): void;

        widgetEditorFilter(filterText: string): void;

        paste(payload: string): Chainable<Subject>;

        // -------------------------------------------------------------------------------------------------------------
        // Exported files : XLS, CSV, PDF
        // -------------------------------------------------------------------------------------------------------------

        /**
         * returns an existing file from the download folder  (binary  blob format)
         */
        readFileFromDownload(fileName: string, options?: Partial<Loggable & Timeoutable>): Chainable<Subject>;

        /**
         * returns a string with the content of the pdf
         */
        readPdfFromDownload(fileName: string, options?: Partial<Loggable & Timeoutable>): Chainable<PdfResult>;

        pdfAssertOccurrences(tag: string, count: number): Chainable<Subject>;

        pdfAssertNumberOfPages(count: number): Chainable<Subject>;

        pdfTextShould(chainer: string, value: string): Chainable<Subject>;

        // -------------------------------------------------------------------------------------------------------------
        // CDP
        // -------------------------------------------------------------------------------------------------------------

        setBrowserTimeZone(timeZone: ValidTimeZones): Chainable<Subject>;

        // -------------------------------------------------------------------------------------------------------------
        // Keyboard
        // -------------------------------------------------------------------------------------------------------------

        /**
         * {ctrl}a{del}
         */
        keyboardDeleteAll(): Chainable<Subject>;

        // -------------------------------------------------------------------------------------------------------------
        // Print Button
        // -------------------------------------------------------------------------------------------------------------

        clickPrintButton(widgetId: string): void;

        // -------------------------------------------------------------------------------------------------------------
        // REST API
        // -------------------------------------------------------------------------------------------------------------

        sendRestAPI(url: string, params: any): Chainable<Subject>;

        loadSchema(schemaName: string): void;

        unloadSchema(schemaName: string): void;

    }
}

function fixURL(path: string): string {
    if (path.indexOf("/") === 0) {
        return path.substr(1);
    }
    return path;
}

function createViewingURL(path: string | IOpenReport, userLocale?: string): Partial<VisitOptions> & { url: string } {

    if (typeof path === "string") {

        return {
            url: Cypress.config().baseUrl === "http://localhost:3000" ? "/viewer" : "/icCube/report/viewer",

            qs: {
                ic3report: path.startsWith("shared:") ? fixURL(path) : "shared:/Tests/" + fixURL(path),

                ["ic3cypress.withMyPluginJS"]: path.startsWith("Demo/PluginJS") ? "1" : "0",
                ["ic3cypress.withMyPluginReact"]: path.startsWith("Demo/PluginReact") ? "1" : "0",
                ["ic3cypress.withMyPluginTheme"]: path.startsWith("Demo/PluginTheme") ? "1" : "0",
                ["ic3cypress.containerScaleUpEnabled"]: path.startsWith("ContainerScaling") ? "1" : "0",

                ic3locale: userLocale
            }
        }

    }

    return {
        url: Cypress.config().baseUrl === "http://localhost:3000" ? "/viewer" : "/icCube/report/viewer",

        qs: {
            ic3report: path.path.startsWith("shared:") ? fixURL(path.path) : "shared:/Tests/" + fixURL(path.path),
            ic3params: path.params,

            ["ic3cypress.withMyPluginJS"]: path.path.startsWith("Demo/PluginJS") ? "1" : "0",
            ["ic3cypress.withMyPluginReact"]: path.path.startsWith("Demo/PluginReact") ? "1" : "0",
            ["ic3cypress.withMyPluginTheme"]: path.path.startsWith("Demo/PluginTheme") ? "1" : "0",
            ["ic3cypress.containerScaleUpEnabled"]: path.path.startsWith("ContainerScaling") ? "1" : "0",

            ic3locale: userLocale
        }
    }
}

function createEditingURL(path: string): Partial<VisitOptions> & { url: string } {

    return {
        url: Cypress.config().baseUrl === "http://localhost:3000" ? "/editor" : "/icCube/report/editor",

        qs: {
            ic3report: "shared:/Tests/" + fixURL(path),
            ["ic3cypress.withMyPluginTheme"]: (path === "Gadgets/Gadget Change Theme" || path.startsWith("Demo/PluginTheme")) ? "1" : "0",
        }
    }
}

function createAdminURL(path: string): Partial<VisitOptions> & { url: string } {

    return {
        url: Cypress.config().baseUrl === "http://localhost:3000" ? "/admin" : "/icCube/report/admin",

        qs: {}
    }
}

function createGadgetEditorURL(path?: string): Partial<VisitOptions> & { url: string } {

    return {
        url: Cypress.config().baseUrl === "http://localhost:3000" ? "/gadgetEditor" : "/icCube/report/gadgetEditor",

        qs: path ? {
            ic3gadget: "shared:/Cypress/" + fixURL(path)
        } : undefined
    }
}

function createAppViewingURL(testAppName: string): Partial<VisitOptions> & { url: string } {

    return {
        url: Cypress.config().baseUrl === "http://localhost:3000" ? "/viewer" : "/icCube/report/viewer",

        qs: {
            ic3app: "shared:/" + fixURL("Cypress - " + testAppName),
        }
    }
}

Cypress.Commands.add('refreshDashboard', () => {

    cy.get("[data-cy='appMenu-button-refreshReport']")
        .click();

});

Cypress.Commands.add('clickNextPage', () => {
    cy.get("[data-cy='toolbar-nextPage']")
        .click();
});

Cypress.Commands.add('clickPreviousPage', () => {
    cy.get("[data-cy='toolbar-prevPage']")
        .click();
});

Cypress.Commands.add('login', () => {

    // -----------------------------------------------------------------------------------------------------------------
    // With the following Docs permissions (as defined in the cypress role):
    //
    // +application /shared READ
    // +dashboard /shared READ
    // +gadget /shared READ
    //
    // +gadget /shared/Cypress WRITE                                       -- required for GadgetChangeSettings.specs.ts
    // -----------------------------------------------------------------------------------------------------------------

    cy.session("login", () => {

        cy.clearAllLocalStorage();

        if (Cypress.config().baseUrl !== "http://localhost:3000") {

            cy.visit("/icCube/report/console")
            cy.performLogin();

        }

    })

});

Cypress.Commands.add('performLogin', () => {

    // -----------------------------------------------------------------------------------------------------------------
    // With the following Docs permissions (as defined in the cypress role):
    //
    // +application /shared READ
    // +dashboard /shared READ
    // +gadget /shared READ
    //
    // +gadget /shared/Cypress WRITE                                       -- required for GadgetChangeSettings.specs.ts
    // -----------------------------------------------------------------------------------------------------------------

    if (Cypress.config().baseUrl !== "http://localhost:3000") {

        cy.get("input[name='j_username']").type(Cypress.env("ic3_user"), {log: false});  // See ./cypress.env.json
        cy.get("input[name='j_password']").type(Cypress.env("ic3_password"), {log: false});
        cy.get("button[type='submit']").click();

    }

});


function forceRenderNotVisibleWidgets(doNotForceWidgetRendering?: boolean) {

    if (doNotForceWidgetRendering === true) {
        Cypress.doNotForceWidgetRendering = true;
    }
}

Cypress.Commands.add('openAppTestReport', (testAppName: string, waitForQueryStatus = true, waitForPrintStatus = true) => {

    const vURL = createAppViewingURL(testAppName);

    forceRenderNotVisibleWidgets();

    cy.visit(vURL);

    if (waitForQueryStatus) {
        cy.get('[data-cy="app-query-status"]', {timeout: QUERY_STATUS_TIMEOUT})
            .should('have.class', 'data-cy-ready')
        ;
    }

    if (waitForPrintStatus) {
        cy.get('[data-cy="print-status-status"]', {timeout: PRINT_STATUS_TIMEOUT})
            .should('have.class', 'data-cy-ready')
        ;
    }

});

Cypress.Commands.add('openMdxConsole', () => {

    const vURL = {
        url: Cypress.config().baseUrl === "http://localhost:3000" ? "/mdxConsole" : "/icCube/report/mdxConsole",
    }
    cy.visit(vURL);

})

Cypress.Commands.add('openViewerTestReport', (path: string | IOpenReport, waitForQueryStatus = true, waitForPrintStatus = true,
                                              doNotForceWidgetRendering?: boolean, userLocale?: string) => {

    const vURL = createViewingURL(path, userLocale);

    forceRenderNotVisibleWidgets(doNotForceWidgetRendering);
    cy.visit(vURL);

    if (waitForQueryStatus) {
        cy.get('[data-cy="app-query-status"]', {timeout: QUERY_STATUS_TIMEOUT})
            .should('have.class', 'data-cy-ready')
        ;
    }

    if (waitForPrintStatus) {
        cy.get('[data-cy="print-status-status"]', {timeout: PRINT_STATUS_TIMEOUT})
            .should('have.class', 'data-cy-ready')
        ;
    }

});

Cypress.Commands.add('openPrintInBrowserTestReport', (path: string, waitForQueryStatus = true, waitForPrintStatus = true) => {

    cy.viewport(794 + 50, 1123 + 50) /* A4: not relevant but better when looking at the Cypress runner */;

    if (path.startsWith("shared:")) {

        // e.g., Printing.spec.ts is using the whole path (embedded, livedemo, ...).

    } else {

        path = "shared:/Tests/" + path;

    }

    const vURL = createPrintInBrowserURL(path);

    // forceRenderNotVisibleWidgets(doNotForceWidgetRendering);

    cy.visit(vURL);

    if (waitForQueryStatus) {
        cy.get('[data-cy="app-query-status"]', {timeout: QUERY_STATUS_TIMEOUT})
            .should('have.class', 'data-cy-ready')
        ;
    }

    if (waitForPrintStatus) {
        cy.get('[data-cy="print-status-status"]', {timeout: PRINT_STATUS_TIMEOUT})
            .should('have.class', 'data-cy-ready')
        ;
    }

});

Cypress.Commands.add('reloadAndWait', (waitForQueryStatus = true, waitForPrintStatus = true,) => {

    cy.reload();

    if (waitForQueryStatus) {
        cy.get('[data-cy="app-query-status"]', {timeout: QUERY_STATUS_TIMEOUT})
            .should('have.class', 'data-cy-ready')
        ;
    }

    if (waitForPrintStatus) {
        cy.get('[data-cy="print-status-status"]', {timeout: PRINT_STATUS_TIMEOUT})
            .should('have.class', 'data-cy-ready')
        ;
    }

});


Cypress.Commands.add('openGadgetEditor', (path?: string) => {

    const vURL = createGadgetEditorURL(path);

    forceRenderNotVisibleWidgets();
    cy.visit(vURL);


});

let editorMode = false;


Cypress.Commands.add('openEditorTestReport', (path: string, waitForQueryStatus = true, waitForPrintStatus = true) => {

    const vURL = createEditingURL(path);

    forceRenderNotVisibleWidgets();
    cy.visit(vURL);

    if (waitForQueryStatus) {
        cy.get('[data-cy="app-query-status"]', {timeout: QUERY_STATUS_TIMEOUT})
            .should('have.class', 'data-cy-ready')
        ;
    }

    if (waitForPrintStatus) {
        cy.get('[data-cy="print-status-status"]', {timeout: PRINT_STATUS_TIMEOUT})
            .should('have.class', 'data-cy-ready')
        ;
    }

    editorMode = true;

});

Cypress.Commands.add('waitForQueryStatusForLargeDashboard', () => {

    cy.waitForQueryStatus().wait(1000) /* please make a smaller dashboard */;

});

Cypress.Commands.add('waitForQueryStatus', () => {

    return cy.get('[data-cy="app-query-status"]', {timeout: QUERY_STATUS_TIMEOUT})
        .should('have.class', 'data-cy-ready')
        ;

});

Cypress.Commands.add('waitForPrintStatus', () => {

    return cy.get('[data-cy="print-status-status"]', {timeout: PRINT_STATUS_TIMEOUT})
        .should('have.class', 'data-cy-ready')
        ;

});

Cypress.Commands.add('waitForQueryCount', (countAsNumber: number) => {

    // https://glebbahmutov.com/blog/cypress-tips-and-tricks/#interactive-and-headed-mode
    let waitTime = 250;
    if (Cypress.browser.isHeaded) {
        waitTime = 1000;
    }


    // -----------------------------------------------------------------------------------------------------------------
    // Try as much as possible to ensure no more than 'count' ongoing queries.
    // E.g., 18 actual queries but the test says: waitForQueryCount(9)
    //          => this method should fail
    // -----------------------------------------------------------------------------------------------------------------

    const count = "" + countAsNumber;
    cy.waitForQueryStatus();
    cy.get("div.ic3AppStats").invoke('attr', 'data-cy-queries-on-success').should('eq', count, {timeout: QUERY_COUNT_TIMEOUT})
        .get("div.ic3AppStats").invoke('attr', 'data-cy-queries').should('eq', count)
        .wait(waitTime)
        .get("div.ic3AppStats").invoke('attr', 'data-cy-queries').should('eq', count)
});

Cypress.Commands.add('waitForChartRendering', (count: number) => {

    cy.waitForQueryStatus();
    cy.get('.ic3WidgetBox-header[data-cy-render-status="RENDERED"')
        .should('have.length', count)

});

Cypress.Commands.add('waitForBoxContentHook', (count: number) => {

    cy.waitForQueryStatus().get("div.ic3AppStats")
        .invoke('attr', "data-cy-box-content-hook").should('eq', "" + count)
});

Cypress.Commands.add('setChartRendering', (alias: string) => {

    cy.get('div[data-cy-chart-rendering]')
        .invoke('attr', 'data-cy-chart-rendering')
        .as(alias)

});

Cypress.Commands.add('setBoxContentHook', (alias: string) => {

    cy.get('div[data-cy-box-content-hook]')
        .invoke('attr', 'data-cy-box-content-hook')
        .as(alias)

});

Cypress.Commands.add('switchEditorToQuickViewMode', () => {

    cy.get("[data-cy='appMenu-button-switchEditing']").click();

});

Cypress.Commands.add('openAdministration', () => {

    const vURL = createAdminURL(path);
    cy.visit(vURL);

});

Cypress.Commands.add('adminSetDashboardFilter', (filter: string) => {

    cy.get('div[data-cy="dashboard-filter"] input')
        .clear()
        .type(filter);

});

Cypress.Commands.add('adminGenerateTags', () => {

    cy.get('[data-cy="generate-tags"]').click();

});

Cypress.Commands.add('adminTestFilter', () => {

    cy.get('[data-cy="filter-test"]').click();

});

Cypress.Commands.add('adminAssertTagsTestResult', (text: string) => {

    cy.get('[data-cy="localization-tags-result"]').should('have.text', text);

});

Cypress.Commands.add('adminAssertLocalizationRowCount', (count: number) => {

    cy.get('[data-cy="localization-tags-result"]')
        .find('.MuiDataGrid-main')
        .invoke('attr', "aria-rowcount").should('eq', "" + (count + 1))

});

Cypress.Commands.add('adminAssertLocalizationColumnCount', (count: number) => {

    cy.get('[data-cy="localization-tags-result"] .MuiDataGrid-columnHeader')
        .should("have.length", count);

});

Cypress.Commands.add('adminAssertLocalizationTableValue', (row: number, col: number, value: string | null) => {

    cy.get('[data-cy="localization-tags-result"]')
        .find(".MuiDataGrid-root " +
            "div[data-rowindex='" + row + "'] " +
            "div[data-colindex='" + col + "']")
        .should("have.text", value ?? "")

});

Cypress.Commands.add('adminAssertLocalizationTableTags', (reportPath: string, tags: string[]) => {

    tags.forEach((tag, idx) => {
        cy.adminAssertLocalizationTableValue(idx, 0, reportPath);
        cy.adminAssertLocalizationTableValue(idx, 3, tag);
    });

});

// -------------------------------------------------------------------------------------------------------------
// Layout
// -------------------------------------------------------------------------------------------------------------

Cypress.Commands.add('assertPageCount', (count: number) => {

    cy.get("[data-cy-page-nb]")
        .should("have.length", count)
    ;

});

Cypress.Commands.add('assertWidgetDetails', (pageNb: number, widgetId: string, left: number, top: number, width: number, height: number) => {

    cy.get(`[data-cy-page-nb='${pageNb}'] [data-widget-id='${widgetId}']`)
        .should("have.length", 1)
        .should("have.css", "left", left + "px")
        .should("have.css", "top", top + "px")
        .should("have.css", "width", width + "px")
        .should("have.css", "height", height + "px")
    ;

});

Cypress.Commands.add('assertWidgetDetailsEx', (pageNb: number, widgetId: string, left: number, top: number, width: number, height: number) => {

    cy.get(`[data-cy-page-nb='${pageNb}'] [data-widget-id='${widgetId}']`)
        .should("have.length", 1)
        .invoke("css", "left")
        .should("match", new RegExp(left + "(.*)?px"));

    cy.get(`[data-cy-page-nb='${pageNb}'] [data-widget-id='${widgetId}']`)
        .should("have.length", 1)
        .invoke("css", "top")
        .should("match", new RegExp(top + "(.*)?px"));

    cy.get(`[data-cy-page-nb='${pageNb}'] [data-widget-id='${widgetId}']`)
        .should("have.length", 1)
        .invoke("css", "width")
        .should("match", new RegExp(width + "(.*)?px"));

    cy.get(`[data-cy-page-nb='${pageNb}'] [data-widget-id='${widgetId}']`)
        .should("have.length", 1)
        .invoke("css", "height")
        .should("match", new RegExp(height + "(.*)?px"));

});

// -------------------------------------------------------------------------------------------------------------
// Widget
// -------------------------------------------------------------------------------------------------------------

Cypress.Commands.add("getWidget", (widgetId: string, contentType?: WidgetBoxContentType) => {

    let checkRendering = true;

    if (widgetId.startsWith("!")) {
        widgetId = widgetId.slice(1);
        checkRendering = false;
    }

    const parts = widgetId.split(":");

    if (parts.length === 2) {
        return cy.getWidgetWithNS(parts[0], parts[1], contentType);
    }

    if (checkRendering) {
        if (contentType) {

            cy.get('[data-cy="widget-box-' + widgetId + '"] [data-cy="render-info"][data-cy-type="' + contentType + '"]')
                .should('have.length', 1)
            ;

        } else {

            cy.get('[data-cy="widget-box-' + widgetId + '"] .ic3WidgetBox-header[data-cy-render-status="RENDERED"]')
                .should('have.length', 1)
            ;

        }
    }

    return cy.get('[data-cy="widget-box-' + widgetId + '"]')
        .should('have.length', 1)
        .first()
        ;

});

Cypress.Commands.add('assertWidgetMissing', (widgetId: string) => {

    return cy.get('[data-cy="widget-box-' + widgetId + '"]')
        .should('have.length', 0)
        ;

});


Cypress.Commands.add('assertWidgetInvisible', (widgetId: string) => {

    return cy.get('[data-cy="widget-box-' + widgetId + '"]')
        .should('have.length', 1)
        .should('be.not.visible')
        ;

});


Cypress.Commands.add('assertWidgetVisible', (widgetId: string, visible: boolean) => {

    cy.getWidget(widgetId)
        .should("have.css", "display", visible ? "flex" : "none");
    ;

    // cy.get('[data-cy="widget-box-' + widgetId + '"] .ic3WidgetBox-header[data-cy-render-status="RENDERED"]')
    //     .should(visible ? 'be.visible' : 'not.be.visible')
    // ;

});


Cypress.Commands.add('assertWidgetRenderStatus', (widgetId: string, renderStatus: "RENDERING" | "RENDERED") => {

    const notFound = renderStatus === "RENDERING" ? "RENDERED" : "RENDERING";

    // Other status not found (timeout = 0 to assert what the status is now)
    cy.get(`[data-cy="widget-box-${widgetId}"] .ic3WidgetBox-header[data-cy-render-status="${notFound}"]`, {timeout: 0})
        .should('not.exist');
    // Status found (timeout = 0 to assert what the status is now)
    cy.get(`[data-cy="widget-box-${widgetId}"] .ic3WidgetBox-header[data-cy-render-status="${renderStatus}"]`, {timeout: 0})
        .should('have.length', 1);

});

Cypress.Commands.add("getWidgetWithNS", (nsId: string, widgetId: string, contentType?: WidgetBoxContentType) => {

    if (contentType) {

        cy.get('[data-ns-id="' + nsId + '"][data-widget-id="' + widgetId + '"] [data-cy="render-info"][data-cy-type="' + contentType + '"]')
            .should('have.length', 1)
        ;

    } else {

        cy.get('[data-ns-id="' + nsId + '"][data-widget-id="' + widgetId + '"] .ic3WidgetBox-header[data-cy-render-status="RENDERED"]')
            .should('have.length', 1)
        ;

    }

    return cy.get('[data-ns-id="' + nsId + '"][data-widget-id="' + widgetId + '"]')
        .should('have.length', 1)
        .first()
        ;

});

Cypress.Commands.add('getWidgetHeader', (widgetId: string) => {

    return cy.get('[data-cy="widget-box-header-' + widgetId + '"]')
        .should('have.length', 1)
        .first()
        ;

});

Cypress.Commands.add('assertWidgetHeader', (widgetId: string, header: string) => {

    return cy.get('[data-cy="widget-box-header-' + widgetId + '"]')
        .should('have.length', 1)
        .first()
        .should("have.text", header)

});

Cypress.Commands.add('assertWidgetQueryLoading', (widgetId: string) => {

    return cy.get('[data-cy="widget-box-' + widgetId + '"] div[data-cy="widget-query-loading-spinner"]')
        .should('have.length', 1);

});

Cypress.Commands.add('clickWidgetHeader', (widgetId: string) => {

    return cy.getWidgetHeader(widgetId).click();

});

Cypress.Commands.add('assertWidgetDataOnError', (widgetId: string) => {

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-userMenu button[data-cy='data-on-error']")
    ;

});

Cypress.Commands.add('assertWidgetNoData', (widgetId: string) => {

    cy.getWidget(widgetId, "data-cy-no-data");

});

Cypress.Commands.add('assertWidgetWaiting', (widgetId: string) => {

    cy.getWidget(widgetId, "data-cy-waiting");

});

// -------------------------------------------------------------------------------------------------------------
// Tidy
// -------------------------------------------------------------------------------------------------------------

Cypress.Commands.add("assertTidyRowCount", (widgetId: string, count: number) => {

    cy.getWidget(widgetId).find('[data-cy-tidy-row-count="' + count + '"]').should('have.length', 1);

});

Cypress.Commands.add("assertTidyColumnCount", (widgetId: string, count: number) => {

    cy.getWidget(widgetId).find('[data-cy-tidy-column-count="' + count + '"]').should('have.length', 1);

});


// -------------------------------------------------------------------------------------------------------------
// Widget (Zoomed)
// -------------------------------------------------------------------------------------------------------------

Cypress.Commands.add("getZoomedWidget", (widgetId: string) => {

    return cy.get('[data-ns-id="zoom"][data-widget-id="' + widgetId + '"]')
        .should('have.length', 1)
        .first()

});

Cypress.Commands.add("assertZoomedHeader", (widgetId: string, header: string) => {

    cy.getZoomedWidget(widgetId)
        .find('[data-cy="widget-box-header-' + widgetId + '"]')
        .contains(header)
    ;

});

Cypress.Commands.add("closeZoomedWidget", (widgetId: string) => {

    cy.getZoomedWidget(widgetId)
        .find("[data-cy='userMenu']")
        .click()
    ;

    cy.get("[data-cy='" + widgetId + "-maximize']")
        .click()
    ;

});

// -------------------------------------------------------------------------------------------------------------
// Drilldown
// -------------------------------------------------------------------------------------------------------------

Cypress.Commands.add('clickDrilldownBack', (widgetId: string, levels?: number) => {

    cy.getWidget(widgetId)
        .find("[data-cy='drilldownBack']")
        .click()
    ;

});

Cypress.Commands.add('clickDrilldownLevel', (widgetId: string, level: number) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-headerDrilldown [data-ic3-drilldown='${level}']`)
        .click()
    ;

});

Cypress.Commands.add('clickDrilldownMenu', (widgetId: string, path: (number | string)[]) => {

    path.forEach(p => {

        if (typeof p === "number") {
            cy.get("div[data-cy='drilldown-menu']")
                .find(`li[role="menuitem"]:nth-child(${p})`)
                .click()
            ;
        } else {
            cy.get("div[data-cy='drilldown-menu']")
                .find(`li[role="menuitem"] > p:contains('${p}')`)
                .click()
            ;
        }

    })

});

// -------------------------------------------------------------------------------------------------------------
// User Menu
// -------------------------------------------------------------------------------------------------------------

Cypress.Commands.add('assertUserMenuVisibility', (widgetId: string, option: string, visible: boolean) => {

    // ensure to click the "first" user menu (=> repetition widget)

    cy.get('[data-cy="widget-box-' + widgetId + '"]' + "> div.ic3WidgetBox-container  > :is( .ic3WidgetBox-headerNoTitle, .ic3WidgetBox-header) div.ic3WidgetBox-userMenu [data-cy='userMenu']")
        .click()
    ;

    cy.get("[data-cy='" + widgetId + "-" + option + "']")
        .should(visible ? 'exist' : 'not.exist')

    cy.get('.MuiModal-root').click()
});
Cypress.Commands.add('clickUserMenu', (widgetId: string, option: string, nsId?: string) => {

    // ensure to click the "first" user menu (=> repetition widget)

    cy.get('[data-cy="widget-box-' + widgetId + '"]' + (nsId ? '[data-ns-id="' + nsId + '"]' : '') + "> div.ic3WidgetBox-container > :is( .ic3WidgetBox-headerNoTitle, .ic3WidgetBox-header) div.ic3WidgetBox-userMenu [data-cy='userMenu']")
        .click()
    ;

    cy.get("[data-cy='" + widgetId + "-" + option + "']")
        .click()
    ;

});

Cypress.Commands.add('widgetCopy', (widgetId: string) => {
    cy.get('[data-cy="widget-box-' + widgetId + '"]')
        .click()
    ;
    cy.get('[data-cy="toolbar-copy"]').click();
});

Cypress.Commands.add('clickSwitch', (widgetId: string) => {
    cy.getWidget(widgetId)
        .find(".MuiSwitch-root").click();
});

Cypress.Commands.add('widgetPaste', () => {
    cy.get('[data-cy="toolbar-paste"]').click();
});

Cypress.Commands.add('clickUserMenuShowData', (widgetId: string) => {
    cy.clickUserMenu(widgetId, "showData");
});

Cypress.Commands.add('clickUserMenuBack', (widgetId: string) => {
    cy.clickUserMenu(widgetId, "back");
});

Cypress.Commands.add('clickUserMenuClearSelection', (widgetId: string) => {
    cy.clickUserMenu(widgetId, "clearSelection");
});

Cypress.Commands.add('clickUserMenuToInitialState', (widgetId: string) => {
    cy.clickUserMenu(widgetId, "toInitialSelection");
});

Cypress.Commands.add('clickUserMenuClearSorting', (widgetId: string) => {
    cy.clickUserMenu(widgetId, "clearSorting");
});

Cypress.Commands.add('clickUserMenuZoom', (widgetId: string, isInZoom?: boolean) => {
    cy.clickUserMenu(widgetId, "maximize", isInZoom ? "zoom" : undefined);
});

Cypress.Commands.add('exportToExcel', (widgetId: string) => {
    cy.clickUserMenu(widgetId, "export_xls");
});

Cypress.Commands.add('clickUserMenuRefreshQuery', (widgetId: string) => {
    cy.clickUserMenu(widgetId, "refreshQuery");
});

Cypress.Commands.add('clickUserMenuAddEventToQueries', (widgetId: string) => {
    cy.clickUserMenu(widgetId, "addEventToAllQueries");
    cy.get("[data-cy='button-ok']").click();
});

// -------------------------------------------------------------------------------------------------------------
// Report App.
// -------------------------------------------------------------------------------------------------------------

Cypress.Commands.add('appClickMenu', (index: number) => {

    cy.get("[data-cy='reportAppMenuIcon']")
        .click();

    cy.get(`[data-cy='reportAppMenuItem'][data-cy-index='${index}']`)
        .click();

});

// -------------------------------------------------------------------------------------------------------------
// Table
// -------------------------------------------------------------------------------------------------------------

Cypress.Commands.add("sortTable", (widgetId: string, column: number) => {

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content " +
            ".MuiDataGrid-columnHeader[aria-colindex='" + (column + 1) + "']")
        .click()

});

Cypress.Commands.add("clickTableColumnMenuIcon", (widgetId: string, column: number, option: TableMenuOption) => {

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content " +
            ".MuiDataGrid-columnHeader[aria-colindex='" + (column + 1) + "'] " +
            ".MuiDataGrid-menuIcon button")
        .click({force: true});

    cy.get(".MuiDataGrid-menu .MuiMenuItem-root").contains(option).click();

});

Cypress.Commands.add("filterTableColumnWithMenuIcon", (widgetId: string, colIdx: number, filter: string) => {

    cy.clickTableColumnMenuIcon(widgetId, colIdx, "Filter");
    cy.get(".MuiDataGrid-filterForm .MuiDataGrid-filterFormValueInput input").type(filter)
    cy.get(".MuiDataGrid-filterForm .MuiDataGrid-filterFormValueInput svg").should('exist');
    cy.get(".MuiDataGrid-filterForm .MuiDataGrid-filterFormValueInput svg").should('not.exist');
    cy.getWidget(widgetId).click(-1, -1, {force: true})

});


Cypress.Commands.add("clickTableRow", (widgetId: string, rowIdx: number) => {

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content div[data-rowindex='" + rowIdx + "']")
        .click()

});

Cypress.Commands.add("clickTableCell", (widgetId: string, rowIdx: number, colIdx: number, ctrl?: boolean) => {

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content " +
            "div[data-rowindex='" + rowIdx + "'] " +
            "div[data-colindex='" + colIdx + "']")
        .click({ctrlKey: ctrl})

});

Cypress.Commands.add("clickTableCellDrilldown", (widgetId: string, rowIdx: number, colIdx: number, ctrl?: boolean) => {

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content " +
            "div[data-rowindex='" + rowIdx + "'] " +
            "div[data-colindex='" + colIdx + "'] " +
            "div.Ic3TableCellDrilldown-iconDiv")
        .click();

});

Cypress.Commands.add("clickHeaderCheckbox", (widgetId: string) => {

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content .MuiDataGrid-columnHeaders .MuiCheckbox-root")
        .click()

});

Cypress.Commands.add("assertTableDomRowCount", (widgetId: string, count: number) => {

    cy.getWidget(widgetId)
        .find(".MuiDataGrid-row")
        .should("have.length", count)
    ;

});

Cypress.Commands.add("assertTableDomColCount", (widgetId: string, count: number) => {

    cy.get(`[data-widget-id='${widgetId}'] .MuiDataGrid-columnHeader`)
        .should("have.length", count)
    ;

});

Cypress.Commands.add("getTableHeader", (widgetId: string, headerTitle: string, extra?: string) => {

    return cy.getWidget(widgetId)
        .find(getTableHeaderSelector(headerTitle, extra))

});


Cypress.Commands.add("clickTableHeaderMenu", (widgetId: string, headerTitle: string, menuOption: string) => {

    cy.getTableHeader(widgetId, headerTitle)
        .realHover()
        .find(".MuiDataGrid-menuIcon")
        .click()
        .get(".MuiDataGrid-menu .MuiMenuItem-root").contains(menuOption).click()

});


Cypress.Commands.add("assertTableRowCount", (widgetId: string, count: number) => {

    cy.getWidget(widgetId)
        .find('.MuiDataGrid-main')
        .invoke('attr', "aria-rowcount").should('eq', "" + (count + 1))
});

Cypress.Commands.add("assertTableColCount", (widgetId: string, count: number) => {

    cy.get(`[data-widget-id='${widgetId}'] .MuiDataGrid-columnHeader`)
        .should("have.length", count)
    ;

});


Cypress.Commands.add("assertTableDetails", (pageNb: number, widgetId: string, withBoxHeader: boolean,
                                            withTableHeader: boolean, height: number, rowCount: number,
                                            headerCount = 1) => {

    cy.get(`[data-cy-page-nb='${pageNb}'] [data-widget-id='${widgetId}']`)
        .find('.ic3WidgetBox-header[data-cy-header-type="' + (withBoxHeader ? "with-header" : "without-header") + '"]')
        .should("have.length", 1)
    ;

    cy.get(`[data-cy-page-nb='${pageNb}'] [data-widget-id='${widgetId}'] .MuiDataGrid-columnHeaders`)
        .should("have.css", "height", withTableHeader ? (String(headerCount * 52) + "px") : "0px")
    ;

    cy.get(`[data-cy-page-nb='${pageNb}'] [data-widget-id='${widgetId}']`)
        .should("have.css", "height", height + "px")
    ;

    cy.get(`[data-cy-page-nb='${pageNb}'] [data-widget-id='${widgetId}'] .MuiDataGrid-row`)
        .should("have.length", rowCount)
    ;

});

Cypress.Commands.add("assertTableValue", (widgetId: string, row: number, col: number, value: string | null) => {

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content " +
            "div[data-rowindex='" + row + "'] " +
            "div[data-colindex='" + col + "'] span")
        .should("have.text", value ?? "")

});

Cypress.Commands.add("assertShowDataTableCellContent", (widgetId: string, row: number, col: number, value: string | null) => {

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content " +
            "div[data-rowindex='" + row + "'] " +
            "div[data-colindex='" + col + "']")
        .should("have.text", value ?? "")

});

Cypress.Commands.add("assertTableCellContent", (widgetId: string, rowIdx: number, colIdx: number, cellValue: string) => {

    cy.assertTableValue(widgetId, rowIdx, colIdx, cellValue) /* any difference in the implementation ? */;

});

Cypress.Commands.add("assertTableCellOnError", (widgetId: string, rowIdx: number, colIdx: number) => {

    cy.getWidget(widgetId)
        .find("div[data-rowindex='" + rowIdx + "'] " +
            "div[data-colindex='" + colIdx + "'] " +
            "span[data-cy='ic3-cell-error']")

});

Cypress.Commands.add("assertTableColumnsEqual", (widgetId: string, expectedWidgetId: string, rowCount: number, colCount: number) => {

    cy.assertTableRowCount(widgetId, rowCount);
    cy.assertTableColCount(widgetId, colCount);

    cy.assertTableRowCount(expectedWidgetId, rowCount);
    cy.assertTableColCount(expectedWidgetId, colCount);

    for (let col = 0; col < colCount; col++) {
        for (let row = 0; row < rowCount; row++) {

            cy.getWidget(expectedWidgetId)
                .find(".ic3WidgetBox-content " +
                    "div[data-rowindex='" + row + "'] " +
                    "div[data-colindex='" + col + "'] " +
                    "span")
                .then($expectedSpan => {

                    cy.getWidget(widgetId)
                        .find(".ic3WidgetBox-content " +
                            "div[data-rowindex='" + row + "'] " +
                            "div[data-colindex='" + col + "'] " +
                            "span")
                        .should("have.text", $expectedSpan.text())
                })
            ;

        }
    }

});

Cypress.Commands.add("assertTableColumnEqual", (widgetId: string, expectedWidgetId: string, rowCount: number, colIdx: number) => {

    cy.assertTableRowCount(widgetId, rowCount);
    cy.assertTableRowCount(expectedWidgetId, rowCount);

    for (let row = 0; row < rowCount; row++) {

        cy.getWidget(expectedWidgetId)
            .find(".ic3WidgetBox-content " +
                "div[data-rowindex='" + row + "'] " +
                "div[data-colindex='" + colIdx + "'] " +
                "span")
            .then($expectedSpan => {

                cy.getWidget(widgetId)
                    .find(".ic3WidgetBox-content " +
                        "div[data-rowindex='" + row + "'] " +
                        "div[data-colindex='" + colIdx + "'] " +
                        "span")
                    .should("have.text", $expectedSpan.text())
            });

    }

});


const path = require("path");
const downloadsFolder = Cypress.config("downloadsFolder");

Cypress.Commands.add("readFileFromDownload", (fileName: string, options?: Partial<Loggable & Timeoutable>) => {

    return cy.readFile(path.join(downloadsFolder, fileName), null, options ?? {timeout: PRINT_STATUS_TIMEOUT}).should("exist")
});

Cypress.Commands.add("readPdfFromDownload", (fileName: string, options?: Partial<Loggable & Timeoutable>) => {

    // wait for the file to exists before reading it
    cy.readFileFromDownload(fileName, options);

    return cy.task('readPdf', path.join(downloadsFolder, fileName));

});

Cypress.Commands.add("pdfAssertOccurrences", {prevSubject: true}, (subject, tag: string, count: number) => {

    return cy.wrap(subject).then((_pdfResult: any) => {
        const pdfResult = _pdfResult as PdfResult;
        const text = pdfResult?.text;

        const found = (text?.toString().split(tag).length ?? 0) - 1;

        expect(found).to.be.eq(count, "Could not find " + count + " times the tag '" + tag + "' in " + text?.toString())

    })

});

Cypress.Commands.add("pdfTextShould", {prevSubject: true}, (subject, chainer: string, value: string) => {

    return cy.wrap(subject).then((_pdfResult: any) => {
        const pdfResult = _pdfResult as PdfResult;
        const text = pdfResult?.text;

        if (chainer === "contain")
            expect(text).to.contains(value)
        else
            throw new Error("chainer not supported " + chainer)

    })

});

Cypress.Commands.add("pdfAssertNumberOfPages", {prevSubject: true}, (subject, count: number) => {

    return cy.wrap(subject).then((_pdfResult: any) => {
        const pdfResult = _pdfResult as PdfResult;

        expect(pdfResult?.numpages).to.be.eq(count, "Wrong number of pages, expected " + count + " , got '" + pdfResult?.numpages)

    })

});

Cypress.Commands.add("assertTableSingleRowSelected", (widgetId: string, rowIdx: number, rowCount: number) => {

    cy.getWidget(widgetId).then($w => {

        for (let rr = 0; rr < rowCount; rr++) {
            rr === rowIdx
                ? cy.assertTableRowSelected($w, rowIdx)
                : cy.assertTableRowNotSelected($w, rr)
            ;
        }

    })

});

Cypress.Commands.add("assertTableRowSelected", (widgetId: string | $widget, rowIdx: number) => {

    if (typeof widgetId === "string") {

        cy.getWidget(widgetId)
            .find(`.ic3WidgetBox-content div[data-rowindex='${rowIdx}'] div[role='gridcell']`)
            .should("have.css", "background-color", STATOS_SELECTION_BACKGROUND_COLOR);

    } else {

        cy.wrap(widgetId)
            .find(`.ic3WidgetBox-content div[data-rowindex='${rowIdx}'] div[role='gridcell']`)
            .should("have.css", "background-color", STATOS_SELECTION_BACKGROUND_COLOR);

    }

});

Cypress.Commands.add("assertTableRowNotSelected", (widgetId: string | $widget, rowIdx: number) => {

    if (typeof widgetId === "string") {

        cy.getWidget(widgetId)
            .find(`.ic3WidgetBox-content div[data-rowindex='${rowIdx}'] div[role='gridcell']`)
            .should("not.have.css", "background-color", STATOS_SELECTION_BACKGROUND_COLOR);

    } else {

        cy.wrap(widgetId)
            .find(`.ic3WidgetBox-content div[data-rowindex='${rowIdx}'] div[role='gridcell']`)
            .should("not.have.css", "background-color", STATOS_SELECTION_BACKGROUND_COLOR);

    }

});

Cypress.Commands.add("assertTableColumnTitle", (widgetId: string, colIdx: number, expectedTitle: string) => {

    cy.getWidget(widgetId)
        .find(".MuiDataGrid-columnHeader[aria-colindex='" + (colIdx + 1) + "']")
        .invoke('attr', "data-field").should('eq', expectedTitle)
});

Cypress.Commands.add("assertTableColumnHeader", (widgetId: string, colIdx: number, expectedTitle: string) => {

    cy.getWidget(widgetId)
        .find(".MuiDataGrid-columnHeader[aria-colindex='" + (colIdx + 1) + "'] .MuiDataGrid-columnHeaderTitle")
        .contains(expectedTitle)
});

Cypress.Commands.add("assertTableColumnSelected", (widgetId: string, colIdx: number) => {

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content " +
            "div[data-colindex='" + colIdx + "'][role='gridcell']")
        .should("have.css", "background-color", STATOS_SELECTION_BACKGROUND_COLOR);

});

Cypress.Commands.add("assertTableCellSelected", (widgetId: string, rowIdx: number, colIdx: number) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content div[data-rowindex='${rowIdx}'] div[data-colindex='${colIdx}'][role='gridcell']`)
        .should("have.css", "background-color", STATOS_SELECTION_BACKGROUND_COLOR);

});

Cypress.Commands.add("assertTableCellBold", (widgetId: string, rowIdx: number, colIdx: number) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content div[data-rowindex='${rowIdx}'] div[data-colindex='${colIdx}'][role='gridcell']`)
        .should("have.css", "font-weight", "700");

});

Cypress.Commands.add("assertTableHeaderBold", (widgetId: string, title: string) => {

    cy.getTableHeader(widgetId, title)
        .find(".MuiDataGrid-columnHeaderTitle")
        .should("have.css", "font-weight", "700");

});

Cypress.Commands.add("assertTableColumnNotSelected", (widgetId: string, colIdx: number) => {

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content " +
            "div[data-colindex='" + colIdx + "'][role='gridcell']")
        .should("not.have.css", "background-color", STATOS_SELECTION_BACKGROUND_COLOR);

});

// -------------------------------------------------------------------------------------------------------------
// Pivot Table
// -------------------------------------------------------------------------------------------------------------

Cypress.Commands.add("sortPivotTable", (widgetId: string, column: number, row = 0) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content .ic3-pt-header div[data-vr='${row}'][data-vc='${column}']`)
        .click()

});


Cypress.Commands.add("drilldownPivotTableLeftHeader", (widgetId: string, row: number, col: number) => {

    // using visual data-vr / data-vc (after a drilldown not the same anymore as data-r / data-c)

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content .ic3-pt-left-header div[data-vr='${row}'][data-vc='${col}'] svg`)
        .click()
    ;

});

Cypress.Commands.add("drilldownPivotTableTopHeader", (widgetId: string, row: number, col: number) => {

    // using visual data-vr / data-vc (after a drilldown not the same anymore as data-r / data-c)

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content .ic3-pt-header div[data-vr='${row}'][data-vc='${col}'] svg`)
        .click()
    ;

});

Cypress.Commands.add("scrollPivotTable", (widgetId: string, distance: number) => {

    // using visual data-vr / data-vc (after a drilldown not the same anymore as data-r / data-c)

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content .ic3-pt-body`)
        .realMouseWheel({deltaY: distance, scrollBehavior: false})
    ;

});

Cypress.Commands.add("selectPivotTableLeftHeader", (widgetId: string, row: number, col: number) => {

    // using visual data-vr / data-vc (after a drilldown not the same anymore as data-r / data-c)

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content .ic3-pt-left-header div[data-vr='${row}'][data-vc='${col}'] .ic3-pt-header-label`)
        .click()
    ;

});

Cypress.Commands.add("assertPivotTableLeftHeaderBold", (widgetId: string, row: number, col: number) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content .ic3-pt-left-header div[data-vr='${row}'][data-vc='${col}'] .ic3-pt-header-label`)
        .should("have.css", "font-weight", "700")
    ;

});

Cypress.Commands.add("selectPivotTableTopHeader", (widgetId: string, row: number, col: number) => {

    // using visual data-vr / data-vc (after a drilldown not the same anymore as data-r / data-c)

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content .ic3-pt-header div[data-vr='${row}'][data-vc='${col}'] .ic3-pt-header-label`)
        .click()
    ;

});

Cypress.Commands.add("assertPivotTableTopHeaderBold", (widgetId: string, row: number, col: number) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content .ic3-pt-header div[data-vr='${row}'][data-vc='${col}'] .ic3-pt-header-label`)
        .should("have.css", "font-weight", "700")
    ;

});

Cypress.Commands.add("selectPivotTableCell", (widgetId: string, row: number, col: number) => {

    // using visual data-vr / data-vc (after a drilldown not the same anymore as data-r / data-c)

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content .ic3-pt-rows div[data-r='${row}'][data-c='${col}']`)
        .click()
    ;

});

Cypress.Commands.add("assertPivotTableRowCount", (widgetId: string, count: number) => {

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content .ic3-pt-rows .ic3-pt-row")
        .should("have.length", count)
    ;

});

Cypress.Commands.add("assertPivotTableColCount", (widgetId: string, count: number) => {

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content .ic3-pt-header .ic3-pt-header-row")
        .should("have.length", 1)
        .find(".ic3-pt-col")
        .should("have.length", count)
    ;

});

Cypress.Commands.add("assertPivotTableDetails", (pageNb: number, widgetId: string, withBoxHeader: boolean, withTableHeader: boolean, height: number, rowCount: number) => {

    const headerType = withBoxHeader ? "with-header" : "without-header";
    cy.get(`[data-cy-page-nb='${pageNb}'] [data-widget-id='${widgetId}'] .ic3WidgetBox-header[data-cy-header-type="${headerType}"][data-cy-render-status="RENDERED"]`)
        .should("have.length", 1)
    ;

    cy.get(`[data-cy-page-nb='${pageNb}'] [data-widget-id='${widgetId}'] .ic3-pt .ic3-pt-header`)
        .should("have.length", withTableHeader ? 1 : 0)
    ;

    cy.get(`[data-cy-page-nb='${pageNb}'] [data-widget-id='${widgetId}']`)
        .should("have.css", "height", height + "px")
    ;

    cy.get(`[data-cy-page-nb='${pageNb}'] [data-widget-id='${widgetId}'] .ic3-pt`)
        .invoke('attr', "data-cy-row-size").should('eq', "" + rowCount)
    ;

});

Cypress.Commands.add("assertPivotTableLeftHeader", (widgetId: string, row: number, col: number, value: string | string[]) => {

    // using visual data-vr / data-vc (after a drilldown not the same anymore as data-r / data-c)

    if (!Array.isArray(value)) {

        cy.getWidget(widgetId)
            .find(`.ic3WidgetBox-content .ic3-pt-left-header div[data-vr='${row}'][data-vc='${col}']`)
            .invoke("attr", "data-name").should("eq", value);

    } else {

        cy.getWidget(widgetId).then($widget => {

            value.forEach((value, row) => {

                cy.wrap($widget)
                    .find(`.ic3WidgetBox-content .ic3-pt-left-header div[data-vr='${row}'][data-vc='${col}']`)
                    .invoke("attr", "data-name").should("eq", value)

            })
        })

    }

});

Cypress.Commands.add("assertPivotTableTopHeader", (widgetId: string, row: number, col: number, value: string) => {

    // using visual data-vr / data-vc (after a drilldown not the same anymore as data-r / data-c)

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content .ic3-pt-header div[data-vr='${row}'][data-vc='${col}']`)
        .invoke('attr', "data-name").should('eq', value)
});

Cypress.Commands.add("assertPivotTableCell", (widgetId: string, row: number, col: number, value: string | string[]) => {

    if (!Array.isArray(value)) {

        cy.getWidget(widgetId).contains(`.ic3WidgetBox-content .ic3-pt-rows .ic3-pt-row[ic3-row-idx='${row}'] div:nth-child(${col + 1}) span`, new RegExp("^" + value + "$"))

    } else {

        cy.getWidget(widgetId).then($widget => {

            value.forEach((value, row) => {

                cy.wrap($widget).contains(`.ic3WidgetBox-content .ic3-pt-rows .ic3-pt-row[ic3-row-idx='${row}'] div:nth-child(${col + 1}) span`, new RegExp("^" + value + "$"))

            })
        })

    }

});

Cypress.Commands.add("assertPivotTableCellSelected", (widgetId: string, row: number, col: number) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content .ic3-pt-rows div.ic3-pt-selected[data-r='${row}'][data-c='${col}']`)
    ;

});

Cypress.Commands.add("assertPivotTableCellBold", (widgetId: string, row: number, col: number) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content .ic3-pt-rows div[data-r='${row}'][data-c='${col}']`)
        .should('have.css', 'font-weight', '700')
    ;

});

Cypress.Commands.add("assertPivotTableNoCellSelected", (widgetId: string) => {

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content .ic3-pt-rows div.ic3-pt-selected")
        .should("have.length", 0)
    ;

});

Cypress.Commands.add("assertPivotTableCellOnError", (widgetId: string, row: number, col: number) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content .ic3-pt-rows .ic3-pt-row[ic3-row-idx='${row}'] div:nth-child(${col + 1}) span[data-cy='ic3-cell-error']`)
    ;

});

Cypress.Commands.add("assertPivotTableColumnsEqual", (widgetId: string, expectedWidgetId: string, rowCount: number, colCount: number) => {

    cy.assertPivotTableRowCount(widgetId, rowCount);
    cy.assertPivotTableColCount(widgetId, colCount);

    cy.assertPivotTableRowCount(expectedWidgetId, rowCount);
    cy.assertPivotTableColCount(expectedWidgetId, colCount);

    cy.getWidget(expectedWidgetId).then($expectedWidget => {
        cy.getWidget(widgetId).then($widget => {

            for (let col = 0; col < colCount; col++) {
                for (let row = 0; row < rowCount; row++) {

                    if (col === 0) {

                        // left header

                        cy.wrap($expectedWidget)
                            .find(`.ic3WidgetBox-content .ic3-pt-left-header div[data-vr='${row}'][data-vc='${col}'] .ic3-pt-header-label`)
                            .then($expectedLabel => {

                                cy.wrap($widget)
                                    .find(`.ic3WidgetBox-content .ic3-pt-left-header div[data-vr='${row}'][data-vc='${col}'] .ic3-pt-header-label`)
                                    .then($label => expect($label).to.have.text($expectedLabel.text()))

                            })

                    } else {

                        // cells

                        cy.wrap($expectedWidget)
                            .find(`.ic3WidgetBox-content .ic3-pt-rows .ic3-pt-row[ic3-row-idx='${row}'] div:nth-child(${col}) span`)
                            .then($expectedSpan => {

                                cy.wrap($widget)
                                    .find(`.ic3WidgetBox-content .ic3-pt-rows .ic3-pt-row[ic3-row-idx='${row}'] div:nth-child(${col}) span`)
                                    .then($span => expect($span).to.have.text($expectedSpan.text()))

                            })

                    }

                }
            }

        })
    })

});

// -------------------------------------------------------------------------------------------------------------
// Repetition Widget
// -------------------------------------------------------------------------------------------------------------

Cypress.Commands.add("assertRepetitionWidgetDetails", (pageNb: number, widgetId: string, withBoxHeader: boolean, height: number, rowCount: number) => {

    if (withBoxHeader) {

        cy.get(`[data-cy-page-nb='${pageNb}']`)
            .find(`.ic3WidgetBox-withHeader[data-widget-id='${widgetId}']`)
            .should("have.length", 1)
        ;

    } else {

        cy.get(`[data-cy-page-nb='${pageNb}']`)
            .find(`.ic3WidgetBox-withoutHeader[data-widget-id='${widgetId}']`)
            .should("have.length", 1)
        ;

    }

    cy.get(`[data-cy-page-nb='${pageNb}']`)
        .find(`[data-widget-id='${widgetId}']`)
        .should("have.css", "height", height + "px")
    ;

    cy.get(`[data-cy-page-nb='${pageNb}']`)
        .find(`[data-widget-id='${widgetId}']`)
        .find(`[data-widget-id^='${widgetId}~:Rep']`)
        .should("have.length", rowCount)
    ;

});


Cypress.Commands.add("assertRepetitionWidgetRowColumnCount", (pageNb: number, widgetId: string, nestedWidgetId: string, rowCount: number, columnCount: number, rows?: string[], columns?: string[]) => {

    cy.get('[data-cy="widget-box-' + widgetId + '"] .ic3WidgetBox-header[data-cy-render-status="RENDERED"]')
        .should('have.length', 1 + rowCount * columnCount)
    ;

    for (let rr = 0; rr < rowCount; rr++) {
        for (let cc = 0; cc < columnCount; cc++) {

            cy.get(`[data-widget-id^='${widgetId}~:Rep-${nestedWidgetId}-R:${rr}-C:${cc}']`)
                .should("have.length", 1)
            ;

            if (rows && columns) {

                const r = rows[rr];
                const c = columns[cc];

                cy.assertWidgetHeader(`${widgetId}~:Rep-${nestedWidgetId}-R:${rr}-C:${cc}`, `R:${r} C:${c}`)
            }
        }
    }

});

// -------------------------------------------------------------------------------------------------------------
// Filter
// -------------------------------------------------------------------------------------------------------------

// Buttons

Cypress.Commands.add("selectButton", (widgetId: string, label: string) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content button[data-name="${label}"]`)
        // .parent("div")
        .click()
    ;

});

Cypress.Commands.add("assertButtonSelected", (widgetId: string, label: string) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content button[data-name="${label}"].ic3-selected`)

});

Cypress.Commands.add("assertButtonsSelected", (widgetId: string, labels?: string[]) => {

    if (!labels || labels.length === 0) {
        cy.getWidget(widgetId)
            .find(".ic3WidgetBox-content")
            .find(`button.ic3-selected`)
            .should("have.length", 0)
    } else {
        labels.forEach(label => cy.assertButtonSelected(widgetId, label));
    }

});

Cypress.Commands.add("assertButtonNotSelected", (widgetId: string, ...labels: string[]) => {

    labels.forEach(label => {
        cy.getWidget(widgetId)
            .find(".ic3WidgetBox-content")
            .find(`button[data-name="${label}"]`)
            .should("not.have.class", "ic3-selected")

    });

});

Cypress.Commands.add("assertButtons", (widgetId: string, labels: string[]) => {

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content")
        .find("button")
        .should("have.length", labels.length)
    ;

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content")
        .find("button")
        .each(($el, index, $list) => {

            const expected = labels[index];
            const actual = $el.attr("data-name");

            expect(actual).to.equal(expected);

        })
    ;

});

// Checkbox

Cypress.Commands.add("selectCheckbox", (widgetId: string, label: string) => {

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content")
        .find(`label[data-name="${label}"]`)
        .parent("div")
        .click()
    ;

});

Cypress.Commands.add("assertCheckboxSelected", (widgetId: string, ...labels: string[]) => {

    labels?.forEach(label => {
        cy.getWidget(widgetId)
            .find(".ic3WidgetBox-content")
            .find(`label[data-name="${label}"] > span`)
            .should("have.class", "Mui-checked")
    });

    if (labels.length === 0) {
        cy.getWidget(widgetId)
            .find(".ic3WidgetBox-content .Mui-checked").should('not.exist')
    }

});

Cypress.Commands.add("assertCheckboxNotSelected", (widgetId: string, label: string) => {

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content")
        .find(`label[data-name="${label}"] > span`)
        .should("not.have.class", "Mui-checked")
    ;

});

Cypress.Commands.add("assertCheckboxes", (widgetId: string, labels: string[]) => {

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content")
        .find("label")
        .should("have.length", labels.length)
    ;

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content")
        .find("label")
        .each(($el, index, $list) => {

            const expected = labels[index];
            const actual = $el.attr("data-name");

            expect(actual).to.equal(expected);

        })
    ;

});

// Dropdown (autocomplete)

Cypress.Commands.add("clearDropdown", (widgetId: string) => {

    cy.getWidget(widgetId)
        .find("input")
        .focus()
    ;

    cy.getWidget(widgetId)
        .find("button.MuiAutocomplete-clearIndicator")
        .click()
    ;

});

Cypress.Commands.add("openDropdown", (widgetId: string) => {

    cy.getWidget(widgetId)
        .find("input")
        .focus()
    ;

    cy.getWidget(widgetId)
        .find('button.MuiAutocomplete-popupIndicator')
        .click()
    ;

});

Cypress.Commands.add("closeDropdown", (widgetId: string) => {

    cy.getWidget(widgetId)
        .find('button.MuiAutocomplete-popupIndicator')
        .click()
    ;

});

Cypress.Commands.add("assertDropdownOptions", (widgetId: string, labels: string[]) => {

    cy.openDropdown(widgetId);

    cy.get("div.MuiAutocomplete-popper[role='presentation']")
        .find(`[data-cy^="filter-o-ac-"]`)
        .should("have.length", labels.length)
    ;

    cy.get("div.MuiAutocomplete-popper[role='presentation']")
        .find(`[data-cy^="filter-o-ac"]`)
        .each(($el, index, $list) => {

            const expected = "filter-o-ac-" + labels[index];
            const actual = $el.attr("data-cy");

            expect(actual).to.equal(expected);
        })
    ;

    // labels.forEach(label => {
    //     cy.get("div.MuiAutocomplete-popper[role='presentation']")
    //         .find(`[data-cy="filter-o-ac-${label}"]`)
    //     ;
    // });

    cy.closeDropdown(widgetId);

});

Cypress.Commands.add("selectDropdownFromInput", (widgetId: string, label: string) => {

    cy.getWidget(widgetId)
        .find("input")
        .clear()
        .type(label)
        .get('li.MuiAutocomplete-option[data-option-index="0"]')
        .click()
    ;

});

Cypress.Commands.add("selectDropdownFromInputLazy", (widgetId: string, label: string) => {

    cy.getWidget(widgetId)
        .find("input")
        .clear()
        .type(label)
        .wait(500)
        .get('li.MuiAutocomplete-option[data-option-index="0"]')
        .click()
        .wait(250)
        .getWidget(widgetId)
        .find(".ic3WidgetBox-header")
        .click();
    ;

});

Cypress.Commands.add("selectDropdownFromPopup", (widgetId: string, label: string) => {

    cy.openDropdown(widgetId);

    cy.get("div.MuiAutocomplete-popper[role='presentation']")
        .find(`[data-cy="filter-o-ac-${label}"]`)
        .click()
    ;

});

Cypress.Commands.add("assertDropdownSingleSelection", (widgetId: string, label: string | null) => {

    if (label != null) {

        cy.getWidget(widgetId)
            .find("input")
            .should("have.value", label)
        ;

    } else {

        cy.getWidget(widgetId)
            .find("input")
            .should($input => {
                const val = $input.val();
                expect(val).to.satisfy((v: string) => v == null || v === '')
            })
        ;

    }

});

Cypress.Commands.add("assertDropdownMultiSelection", (widgetId: string, labels: string[]) => {

    if (labels.length > 0) {

        labels.forEach(label => {

            cy.getWidget(widgetId)
                .find(`[data-cy="filter-c-ac-${label}"]`)
            ;

        })

    } else {

        cy.getWidget(widgetId)
            .find(`[data-cy^="filter-c-ac-"]`)
            .should("not.exist")
        ;

    }

});

// Tree (w/ or wo/ autocomplete)

Cypress.Commands.add("selectTree", (widgetId: string, treeMode: TreeMode, label: string) => {

    if (treeMode === "control-icons") {

        cy.getWidget(widgetId)
            .find(`[data-cy='ic-checkbox'][data-name='${label}']`)
            .find("input")
            .click()
        ;

    } else {

        cy.getWidget(widgetId)
            .find(`[data-cy='ic-checkbox'][data-name='${label}']`)
            .click()
        ;

    }

});

Cypress.Commands.add("expandTree", (widgetId: string, treeMode: TreeMode, label: string) => {

    if (treeMode === "control-icons") {

        cy.getWidget(widgetId)
            .find(`[data-cy='ic-checkbox'][data-name='${label}']`)
            .parent(".ic3LazyTreeView-itemLabelContainer")
            .siblings(".ic3LazyTreeView-itemIcon")
            .click()
        ;

    } else {

        cy.getWidget(widgetId)
            .find(`[data-cy='ic-checkbox'][data-name='${label}']`)
            .parent(".ic3LazyTreeView-itemLabelContainer")
            .siblings(".ic3LazyTreeView-itemIcon")
            .click()
        ;

    }

});

Cypress.Commands.add("assertTreeExists", (widgetId: string, treeMode: TreeMode, label: string) => {

    if (treeMode === "control-icons") {

        cy.getWidget(widgetId)
            .find(`[data-cy='ic-checkbox'][data-name='${label}']`)
            .should("have.length", 1)
        ;

    } else {

        cy.getWidget(widgetId)
            .find(`[data-cy='ic-checkbox'][data-name='${label}']`)
            .should("have.length", 1)
        ;

    }

});

Cypress.Commands.add("assertTreeSelection", (widgetId: string, treeMode: TreeMode, labels: string[]) => {

    if (labels.length > 0) {

        labels.forEach(label => {

            cy.getWidget(widgetId)
                .find(`[data-cy='ic-checkbox'][data-name='${label}']`)
                .closest(".ic3LazyTreeView-itemRoot.ic3-selected")
            ;

        });

    } else {

        cy.getWidget(widgetId)
            .find(".ic3LazyTreeView-itemRoot.ic3-selected")
            .should("not.exist")
        ;

    }

});

Cypress.Commands.add("openTreeDropdown", (widgetId: string) => {

    cy.getWidget(widgetId)
        .find("input")
        .focus()
    ;

    cy.getWidget(widgetId)
        .find('button.MuiAutocomplete-popupIndicator')
        .click()
    ;

});

Cypress.Commands.add("closeTreeDropdown", (widgetId: string) => {

    cy.getWidget(widgetId)
        .find('button.MuiAutocomplete-popupIndicator')
        .click()
    ;

});

Cypress.Commands.add("selectTreeWithAutocompleteFromPopup", (widgetId: string, treeMode: TreeMode, labels: string[], close = false) => {

    cy.openTreeDropdown(widgetId);

    labels.forEach(label => {

        if (treeMode === "control-icons") {

            cy.get("div.MuiAutocomplete-popper[role='presentation']")
                .find(`[data-cy='ic-checkbox'][data-name='${label}']`)
                .find("input")
                .click()
            ;

        } else {

            cy.get("div.MuiAutocomplete-popper[role='presentation']")
                .find(`[data-cy='ic-checkbox'][data-name='${label}']`)
                .click()
            ;

        }

    })

    close && cy.closeTreeDropdown(widgetId);

});

Cypress.Commands.add("assertTreeWithAutocompleteSingleSelection", (widgetId: string, treeMode: TreeMode, label: string | null) => {

    // first the input widget

    if (label != null) {

        cy.getWidget(widgetId)
            .find("input")
            .should("have.value", label)
        ;

    } else {

        cy.getWidget(widgetId)
            .find("input")
            .should($input => {
                const val = $input.val();
                expect(val).to.satisfy((v: string) => v == null || v === '')
            })
        ;

    }

    // then the tree itself

    cy.openDropdown(widgetId);

    const labels = label != null ? [label] : [];

    if (labels.length > 0) {

        labels.forEach(label => {

            cy.get("div.MuiAutocomplete-popper[role='presentation']")
                .find(`[data-cy='ic-checkbox'][data-name='${label}']`)
                .closest(".ic3LazyTreeView-itemRoot.ic3-selected")
            ;

        });

    } else {

        cy.get("div.MuiAutocomplete-popper[role='presentation']")
            .find(".ic3LazyTreeView-itemRoot.ic3-selected")
            .should("not.exist")
        ;

    }

    cy.closeDropdown(widgetId);

})

Cypress.Commands.add("assertTreeWithAutocompleteMultiSelection", (widgetId: string, treeMode: TreeMode, labels: string[]) => {

    // first the input widget

    if (labels.length > 0) {

        labels.forEach(label => {

            cy.getWidget(widgetId)
                .find(`[data-cy="filter-c-ac-${label}"]`)
            ;

        })

    } else {

        cy.getWidget(widgetId)
            .find(`[data-cy^="filter-c-ac-"]`)
            .should("not.exist")
        ;

    }

    // then the tree itself

    cy.openDropdown(widgetId);

    if (labels.length > 0) {

        labels.forEach(label => {

            cy.get("div.MuiAutocomplete-popper[role='presentation']")
                .find(`[data-cy='ic-checkbox'][data-name='${label}']`)
                .closest(".ic3LazyTreeView-itemRoot.ic3-selected")
            ;

        });

    } else {

        cy.get("div.MuiAutocomplete-popper[role='presentation']")
            .find(".ic3LazyTreeView-itemRoot.ic3-selected")
            .should("not.exist")
        ;

    }

    cy.closeDropdown(widgetId);

})

// Slider

Cypress.Commands.add("selectSlider", (widgetId: string, label: string) => {

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content")
        .find('[data-cy="ic-slider"]')
        .find('span.MuiSlider-markLabel')
        .contains(label)
        .click()
    ;

});

Cypress.Commands.add("assertSliderWithoutSelection", (widgetId: string) => {

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content")
        .find('[data-cy="ic-slider"][data-cy-selection="no"]')
    ;

});

Cypress.Commands.add("assertSliderSelected", (widgetId: string, ...labels: string[]) => {

    labels.forEach(label => {
        cy.getWidget(widgetId)
            .find(".ic3WidgetBox-content [data-cy='ic-slider'] span.MuiSlider-markLabel")
            .contains(label)
            .should("have.class", "MuiSlider-markLabelActive")
    })

    if (labels.length === 0) {

        cy.getWidget(widgetId)
            .find(".ic3WidgetBox-content .ic3FilterSlider-EmptySelection")
            .should('have.length', 1)
    }

});

Cypress.Commands.add("assertSliderNotSelected", (widgetId: string, label: string) => {

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content")
        .find('[data-cy="ic-slider"]')
        .find('span.MuiSlider-markLabel')
        .contains(label)
        .should("not.have.class", "MuiSlider-markLabelActive")
    ;

});

Cypress.Commands.add("assertSlider", (widgetId: string, labels: string[]) => {

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content")
        .find('[data-cy="ic-slider"]')
        .find('span.MuiSlider-markLabel')
        .should("have.length", labels.length)
    ;

    cy.getWidget(widgetId)
        .find(".ic3WidgetBox-content")
        .find('[data-cy="ic-slider"]')
        .find('span.MuiSlider-markLabel')
        .each(($el, index, $list) => {

            const expected = labels[index];
            const actual = $el.html();

            expect(actual).to.equal(expected);

        })
    ;

});

function setDateOnMuiDatePicker($div: any, date: string) {

    if (date) {

        const gotoStart = editorMode
            ? "{leftArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}{leftArrow}"
            : "{ctrl}a{del}";

        cy.wrap($div).find('input').type(gotoStart)
            .type(date);

    } else {

        cy.wrap($div).find('input').type("{ctrl}a{del}")

    }

    // Click away to activate the new value.
    cy.clickOutside();
}

function setDateOnMuiDatePickerR($div: any, date: string, where: "first" | "last") {

    if (date) {
        // Mui is somehow capturing the enter , so we need to apply on tab :-(
        if (where === "first")
            cy.wrap($div).find('input').eq(0).type("{leftArrow}{del}{leftArrow}{del}{leftArrow}{del}")
                .type(date + "{enter}");
        else
            cy.wrap($div).find('input').eq(1).type("{leftArrow}{del}{leftArrow}{del}{leftArrow}{del}")
                .type(date).realPress("Tab");
    } else {
        cy.wrap($div).find('input').eq(where === "first" ? 0 : 1).type("{leftArrow}{del}{leftArrow}{del}{leftArrow}{del}")
    }

}

Cypress.Commands.add("selectDatePickerFromInput", (widgetId: string, date: string) => {

    cy.getWidget(widgetId).find(".ic3WidgetBox-content").then(($widget: any) => setDateOnMuiDatePicker($widget, date));

});

Cypress.Commands.add("selectDatePickerRangeFromFromInput", (widgetId: string, date: string) => {

    cy.getWidget(widgetId).find('[data-cy-from-date]')
        .then(($fromDate: any) => setDateOnMuiDatePickerR($fromDate, date, "first"));

});

Cypress.Commands.add("selectDatePickerRangeToFromInput", (widgetId: string, date: string) => {

    cy.getWidget(widgetId).find('[data-cy-to-date]')
        .then(($toDate: any) => setDateOnMuiDatePickerR($toDate, date, "last"));

});

function assertDate(widgetId: string, tag: string, _date: string | null, nthChild?: number) {

    const date = Cypress.migrateDate(_date ?? "");

    // https://mui.com/x/react-date-pickers/base-concepts/#testing-caveats
    const cleanText = (s: string) => s.replace(/\u200e|\u2066|\u2067|\u2068|\u2069/g, '');


    cy.getWidget(widgetId)
        .then((cc: any) => {
            if (date == null || date?.length > 4) {
                return cc.find('[' + tag + '="' + date + '"]')// retry wait
            }
            return cc;
        })
        .find("input")
        .eq(nthChild ?? 0)
        .then(input => {
            const cleaned = cleanText("" + input.val()).replaceAll(" / ", "/");
            cy.wrap(cleaned).should('equal', date)
        })

}

Cypress.Commands.add("assertDatePicker", (widgetId: string, date: string | null) => {

    assertDate(widgetId, "data-cy-date", date);

});


Cypress.Commands.add("assertDatePickerRangeFrom", (widgetId: string, date: string | null) => {

    assertDate(widgetId, "data-cy-from-date", date, 0);

});

Cypress.Commands.add("assertDatePickerRangeTo", (widgetId: string, date: string | null) => {


    assertDate(widgetId, "data-cy-to-date", date, 1);

});

Cypress.Commands.add("panelFilterAdd", (widgetId: string, fieldLabel: string, selectIdx = 0) => {

    cy.getWidget(widgetId)
        .get("[data-cy='addFilter']")
        .click()
    ;

    cy.get("[data-cy='fieldSelectorAutocomplete']")
        .find("input")
        .clear()
        .type(fieldLabel)
        .get('li.MuiAutocomplete-option[data-option-index="' + selectIdx + '"]')
        .click()
    ;

});

Cypress.Commands.add("panelFilterSaveView", (widgetId: string, viewName: string) => {

    cy.getWidget(widgetId)
        .get("[data-cy='view']")
        .click()
    ;

    cy.get("[data-cy='save-view']")
        .click()
    ;

    cy.get("[data-cy='viewName'] input")
        .type(viewName)
    ;

    cy.get("[data-cy='button-ok']")
        .click()
    ;

    cy.clickOutside();

});

Cypress.Commands.add("panelFilterLoadView", (widgetId: string, viewName: string) => {

    cy.getWidget(widgetId)
        .get("[data-cy='view']")
        .click()
    ;

    cy.get("[data-cy='view-item'] span")
        .contains(viewName)
        .click()
    ;

});

Cypress.Commands.add("panelFilterRemove", (widgetId: string, index: number) => {

    cy.getWidget(widgetId)
        .get("[data-cy='filters'] [data-cy='filter-item']")
        .eq(index)
        .find("[data-cy='remove-filter']")
        .click()
    ;

});

Cypress.Commands.add("assertFilterPanelCount", (widgetId: string, count: number) => {
    cy.getWidget(widgetId).get("[data-cy='filters'] [data-cy='filter-item']").should('have.length', count)
});

Cypress.Commands.add("assertFilterPanelItems", (widgetId: string, filterNames: string[]) => {

    cy.assertFilterPanelCount(widgetId, filterNames.length);

    filterNames.forEach((name, index) => {

        cy.getWidget(widgetId)
            .get("[data-cy='filters'] [data-cy='filter-item']")
            .eq(index)
            .find(".ic3FilterPanel-fieldName")
            .contains(name);

    });
});

Cypress.Commands.add("panelFilterClear", (widgetId: string, index: number) => {

    if (index === -1) {
        cy.getWidget(widgetId)
            .find("[data-cy='clear-filter']")
            .click()
            .get("[data-cy='filters'] [data-cy='filter-item']")
            .eq(0)
    } else {
        cy.getWidget(widgetId)
            .get("[data-cy='filters'] [data-cy='filter-item']")
            .eq(index)
            .find("[data-cy='clear-filter']")
            .click()
    }
});

Cypress.Commands.add("panelFilterSelectOperatorFromInput", (widgetId: string, index: number, operator: string) => {

    cy.getWidget(widgetId)
        .get("[data-cy='filters'] [data-cy='filter-item']")
        .eq(index)
        .find("[data-cy='operatorSelectorAutocomplete'] input")
        .clear()
        .type(operator)
        .get('li.MuiAutocomplete-option[data-option-index="0"]')
        .click()
    ;

});

Cypress.Commands.add("panelFilterSetTextFieldValue", (widgetId: string, index: number, value: string) => {

    cy.getWidget(widgetId)
        .get("[data-cy='filters'] [data-cy='filter-item']")
        .eq(index)
        .find("[data-cy='value-selector-text'] input")
        .type(value + "{enter}")
    ;

});

Cypress.Commands.add("panelFilterSetDateFieldValue", (widgetId: string, index: number, date: string) => {

    cy.panelFilterSetDateTimeFieldValue(widgetId, index, date, true)

});


Cypress.Commands.add("panelFilterSetDateTimeFieldValue", (widgetId: string, index: number, date: string, isDate = false) => {

    // Open date/time picker
    cy.getWidget(widgetId)
        .get("[data-cy='filters'] [data-cy='filter-item']")
        .eq(index)
        .find("[data-cy='value-selector-text'] input")
        .click();

    // Enter value
    cy.getWidget(widgetId)
        .get("[data-cy='filters'] [data-cy='filter-item']")
        .eq(index)
        .get('.ic3FilterPanel-dateTimePicker')
        .then(($div: any) => setDateOnMuiDatePicker($div, date))
        .find("[data-cy='set-value']")
        .click()
});

Cypress.Commands.add("panelFilterSetDefaultFilter", (widgetId: string) => {

    cy.getWidget(widgetId)
        .find("[data-cy='userMenu']")
        .click()
    ;

    cy.get("[data-cy='" + widgetId + "-SetInitialFilterConfig']")
        .click()
    ;

});

Cypress.Commands.add("panelFilterSetSelection", (widgetId: string, index: number, values: (string | RegExp)[]) => {

    const filter = cy.getWidget(widgetId)
        .find("[data-cy='filters'] [data-cy='filter-item']")
        .eq(index)
    ;

    filter.find("[data-cy='value-selector-text']")
        .find(".MuiInputBase-root")
        .click()
    ;

    values.forEach(v => {
        cy.get("[data-cy='search-content']")
            .find('p')
            .contains(v)
            .click({scrollBehavior: false})
        ;
    });

    cy.get("[data-cy='confirm-selection']")
        .click()
    ;

});

Cypress.Commands.add("panelFilterIsAnyOfSearchAndSelectAll", (widgetId: string, index: number, search: string) => {

    const filter = cy.getWidget(widgetId)
        .find("[data-cy='filters'] [data-cy='filter-item']")
        .eq(index)
    ;

    filter.find("[data-cy='value-selector-text']")
        .find(".MuiInputBase-root")
        .click()
    ;

    cy.get("[data-cy='search-field'] input")
        .type(search)
    ;

    cy.wait(1000);

    cy.get("[data-cy='confirm-add-search-results']")
        .click()
    ;

    cy.get("[data-cy='confirm-selection']")
        .click()
    ;

});

Cypress.Commands.add("singlePanelFilterSetSelection", (widgetId: string, values: (string | RegExp)[]) => {

    cy.getWidget(widgetId)
        .find("[data-cy='value-selector-text']")
        .find("input")
        .click()
    ;

    values.forEach(v => {
        cy.get("[data-cy='search-content']")
            .find('p')
            .contains(v)
            .click({scrollBehavior: false})
        ;
    });

    cy.get("[data-cy='confirm-selection']")
        .click()
    ;

});

Cypress.Commands.add("panelFilterSetSelectionSimple", (widgetId: string, index: number, value: string | RegExp) => {
    const filter = cy.getWidget(widgetId)
        .get("[data-cy='filters'] [data-cy='filter-item']")
        .eq(index)
    ;
    filter.find("[data-cy='search-content']")
        .find('p')
        .contains(value)
        .click()
    ;
});

// -------------------------------------------------------------------------------------------------------------
// Chart: Bar
// -------------------------------------------------------------------------------------------------------------

Cypress.Commands.add("selectSingleChartBarInGroup", (widgetId: string, group: number, child: number) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(${group + 1}) g[role='menuitem']:nth-child(${child + 1})`)
        .click({force: true})
    ;

});

Cypress.Commands.add("assertSelectedSingleChartBarInGroup", (widgetId: string, group: number, child: number) => {

    cy.getWidget(widgetId)
        .click(0, 0)  // avoid on hover effect
        .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(${group + 1}) g[role='menuitem']:nth-child(${child + 1})`)
        .then((g) => {
            expect(g.attr("fill")).equal(STATOS_SELECTION_COLOR_HEX);
        })
    ;

});

// -------------------------------------------------------------------------------------------------------------
// Chart: Donut
// -------------------------------------------------------------------------------------------------------------

Cypress.Commands.add('donutClickSlice', (widgetId: string | $widget, slice: number) => {
    if (typeof widgetId === "string") {

        cy.getWidget(widgetId)
            .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1) g[role='menuitem']:nth-child(${slice}) path`)
            .click({force: true})

    } else {

        cy.wrap(widgetId)
            .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1) g[role='menuitem']:nth-child(${slice}) path`)
            .click({force: true})

    }

});

Cypress.Commands.add('donutAssertSliceCount', (widgetId: string, count: number) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1)  g[role='menuitem']`)
        .should("have.length", count)

});

Cypress.Commands.add('donutAssertSingleSliceSelected', (widgetId: string, slice: number, sliceCount: number) => {

    cy.getWidget(widgetId).then($w => {

        for (let ss = 1; ss <= sliceCount; ss++) {
            ss === slice
                ? cy.donutAssertSliceSelected($w, ss)
                : cy.donutAssertSliceNotSelected($w, ss)
            ;
        }

    })

});

Cypress.Commands.add('donutAssertSliceSelected', (widgetId: string | $widget, slice: number) => {

    if (typeof widgetId === "string") {

        cy.getWidget(widgetId)
            .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1)  g[role='menuitem']:nth-child(${slice})`)
            .invoke('attr', "fill").should('eq', STATOS_SELECTION_COLOR_HEX)


    } else {

        cy.wrap(widgetId)
            .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1)  g[role='menuitem']:nth-child(${slice})`)
            .invoke('attr', "fill").should('eq', STATOS_SELECTION_COLOR_HEX)


    }

});

Cypress.Commands.add('donutAssertSliceNotSelected', (widgetId: string | $widget, slice: number) => {

    if (typeof widgetId === "string") {

        cy.getWidget(widgetId)
            .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1)  g[role='menuitem']:nth-child(${slice})`)
            .invoke('attr', "fill").should('not.eq', STATOS_SELECTION_COLOR_HEX)

    } else {

        cy.wrap(widgetId)
            .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1)  g[role='menuitem']:nth-child(${slice})`)
            .invoke('attr', "fill").should('not.eq', STATOS_SELECTION_COLOR_HEX)

    }

});

// -------------------------------------------------------------------------------------------------------------
// Chart: Column
// -------------------------------------------------------------------------------------------------------------

Cypress.Commands.add('columnClickColumn', (widgetId: string, column: number) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1) g[role='menuitem']:nth-child(${column}) path`)
        .click()

});

Cypress.Commands.add('columnAssertColumnCount', (widgetId: string, count: number) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1)  g[role='menuitem']`)
        .should("have.length", count)

});

Cypress.Commands.add('columnAssertSingleColumnSelected', (widgetId: string, column: number, columnCount: number) => {

    cy.getWidget(widgetId).then($w => {

        for (let ss = 1; ss <= columnCount; ss++) {
            ss === column
                ? cy.columnAssertColumnSelected($w, ss)
                : cy.columnAssertColumnNotSelected($w, ss)
            ;
        }

    })

});

Cypress.Commands.add('columnAssertColumnSelected', (widgetId: string | $widget, column: number) => {

    if (typeof widgetId === "string") {

        cy.getWidget(widgetId)
            .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1)  g[role='menuitem']:nth-child(${column})`)
            .invoke('attr', "fill").should('eq', STATOS_SELECTION_COLOR_HEX)

    } else {

        cy.wrap(widgetId)
            .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1)  g[role='menuitem']:nth-child(${column})`)
            .invoke('attr', "fill").should('eq', STATOS_SELECTION_COLOR_HEX)

    }

});

Cypress.Commands.add('columnAssertColumnNotSelected', (widgetId: string | $widget, column: number) => {

    if (typeof widgetId === "string") {

        cy.getWidget(widgetId)
            .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1)  g[role='menuitem']:nth-child(${column})`)
            .invoke('attr', "fill").should('not.eq', STATOS_SELECTION_COLOR_HEX)

    } else {

        cy.wrap(widgetId)
            .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1)  g[role='menuitem']:nth-child(${column})`)
            .invoke('attr', "fill").should('not.eq', STATOS_SELECTION_COLOR_HEX)

    }

});

// -------------------------------------------------------------------------------------------------------------
// Chart: Histogram
// -------------------------------------------------------------------------------------------------------------

Cypress.Commands.add('histogramClickColumn', (widgetId: string, column: number) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1) g[role='menuitem']:nth-child(${column}) path`)
        .click({force: true})

});

Cypress.Commands.add('histogramAssertColumnCount', (widgetId: string, count: number) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1)  g[role='menuitem']`)
        .should("have.length", count)

});

Cypress.Commands.add('histogramAssertSingleColumnSelected', (widgetId: string, column: number, columnCount: number) => {

    cy.getWidget(widgetId).then($w => {

        for (let ss = 1; ss <= columnCount; ss++) {
            ss === column
                ? cy.columnAssertColumnSelected($w, ss)
                : cy.columnAssertColumnNotSelected($w, ss)
            ;
        }

    })

});

Cypress.Commands.add('histogramAssertColumnSelected', (widgetId: string | $widget, column: number) => {

    if (typeof widgetId === "string") {

        cy.getWidget(widgetId)
            .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1)  g[role='menuitem']:nth-child(${column})`)
            .invoke('attr', "fill").should('eq', STATOS_SELECTION_COLOR_HEX)

    } else {

        cy.wrap(widgetId)
            .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1)  g[role='menuitem']:nth-child(${column})`)
            .invoke('attr', "fill").should('eq', STATOS_SELECTION_COLOR_HEX)

    }

});

Cypress.Commands.add('histogramAssertColumnNotSelected', (widgetId: string | $widget, column: number) => {

    if (typeof widgetId === "string") {

        cy.getWidget(widgetId)
            .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1)  g[role='menuitem']:nth-child(${column})`)
            .invoke('attr', "fill").should('not.eq', STATOS_SELECTION_COLOR_HEX)

    } else {

        cy.wrap(widgetId)
            .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1)  g[role='menuitem']:nth-child(${column})`)
            .invoke('attr', "fill").should('not.eq', STATOS_SELECTION_COLOR_HEX)

    }

});

// -------------------------------------------------------------------------------------------------------------
// Chart: GeoMap
// -------------------------------------------------------------------------------------------------------------

Cypress.Commands.add('geomapClickColorArea', (widgetId: string, color: string, index: number) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content svg g[fill='${color}']`)
        .eq(index - 1)
        .click({force: true})

});

Cypress.Commands.add('geomapAssertColorAreaCount', (widgetId: string, color: string, count: number) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content svg g[fill='${color}']`)
        .should("have.length", count)

});

Cypress.Commands.add('geomapAssertSelectionColorAreaCount', (widgetId: string, count: number) => {

    cy.geomapAssertColorAreaCount(widgetId, STATOS_SELECTION_COLOR_HEX, count);

});

// -------------------------------------------------------------------------------------------------------------
// Chart: Area
// -------------------------------------------------------------------------------------------------------------

Cypress.Commands.add('areaClickPoint', (widgetId: string, point: number) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content svg g circle`)
        .eq(point - 1)
        .click()

});

Cypress.Commands.add('areaAssertPointCount', (widgetId: string, point: number) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content svg g circle`)
        .should("have.length", point)

});

Cypress.Commands.add('areaAssertSinglePointSelected', (widgetId: string, point: number, pointCount: number) => {

    cy.getWidget(widgetId).then($w => {

        for (let pp = 1; pp <= pointCount; pp++) {
            pp === point
                ? cy.areaAssertPointSelected($w, pp)
                : cy.areaAssertPointNotSelected($w, pp)
            ;
        }

    })

});

Cypress.Commands.add('areaAssertPointSelected', (widgetId: string | $widget, point: number) => {

    if (typeof widgetId === "string") {

        cy.getWidget(widgetId)
            .find(`.ic3WidgetBox-content svg g circle`)
            .eq(point - 1)
            .closest("g[fill='" + STATOS_SELECTION_COLOR_HEX + "']")

    } else {

        cy.wrap(widgetId)
            .find(`.ic3WidgetBox-content svg g circle`)
            .eq(point - 1)
            .closest("g[fill='" + STATOS_SELECTION_COLOR_HEX + "']")

    }

});

Cypress.Commands.add('areaAssertPointNotSelected', (widgetId: string | $widget, point: number) => {

    if (typeof widgetId === "string") {

        cy.getWidget(widgetId)
            .find(`.ic3WidgetBox-content svg g circle`)
            .eq(point - 1)
            .closest("g[fill='#00d4ea']" /* default color */)

    } else {

        cy.wrap(widgetId)
            .find(`.ic3WidgetBox-content svg g circle`)
            .eq(point - 1)
            .closest("g[fill='#00d4ea']" /* default color */)

    }

});

// -------------------------------------------------------------------------------------------------------------
// Chart: Bubble
// -------------------------------------------------------------------------------------------------------------

Cypress.Commands.add('bubbleClickBubble', (widgetId: string, bubble: number) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content svg g circle`)
        .eq(bubble - 1)
        .click()

});

Cypress.Commands.add('bubbleAssertBubbleCount', (widgetId: string, bubble: number) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content svg g circle`)
        .should("have.length", bubble)

});

Cypress.Commands.add('bubbleAssertSingleBubbleSelected', (widgetId: string, bubble: number, bubbleCount: number) => {

    cy.getWidget(widgetId).then($w => {

        for (let pp = 1; pp <= bubbleCount; pp++) {
            pp === bubble
                ? cy.bubbleAssertBubbleSelected($w, pp)
                : cy.bubbleAssertBubbleNotSelected($w, pp)
            ;
        }

    })

});

Cypress.Commands.add('bubbleAssertBubbleSelected', (widgetId: string | $widget, bubble: number) => {

    if (typeof widgetId === "string") {

        cy.getWidget(widgetId)
            .find(`.ic3WidgetBox-content svg g circle`)
            .eq(bubble - 1)
            .closest("g[fill='" + STATOS_SELECTION_COLOR_HEX + "']")
    } else {

        cy.wrap(widgetId)
            .find(`.ic3WidgetBox-content svg g circle`)
            .eq(bubble - 1)
            .closest("g[fill='" + STATOS_SELECTION_COLOR_HEX + "']")
    }

});

Cypress.Commands.add('bubbleAssertBubbleNotSelected', (widgetId: string | $widget, bubble: number) => {

    if (typeof widgetId === "string") {

        cy.getWidget(widgetId)
            .find(`.ic3WidgetBox-content svg g circle`)
            .eq(bubble - 1)
            .closest("g[fill='#00d4ea']" /* default color */)

    } else {

        cy.wrap(widgetId)
            .find(`.ic3WidgetBox-content svg g circle`)
            .eq(bubble - 1)
            .closest("g[fill='#00d4ea']" /* default color */)

    }

});

// -------------------------------------------------------------------------------------------------------------
// Chart: Scatter Plot
// -------------------------------------------------------------------------------------------------------------

Cypress.Commands.add('scatterClickPoint', (widgetId: string, point: number) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content svg g circle`)
        .eq(point - 1)
        .click()

});

Cypress.Commands.add('scatterAssertPointCount', (widgetId: string, point: number) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content svg g circle`)
        .should("have.length", point)

});

Cypress.Commands.add('scatterAssertSinglePointSelected', (widgetId: string, point: number, pointCount: number) => {

    cy.getWidget(widgetId).then($w => {

        for (let pp = 1; pp <= pointCount; pp++) {
            pp === point
                ? cy.scatterAssertPointSelected($w, pp)
                : cy.scatterAssertPointNotSelected($w, pp)
            ;
        }

    })

});

Cypress.Commands.add('scatterAssertPointSelected', (widgetId: string | $widget, point: number) => {

    if (typeof widgetId === "string") {

        cy.getWidget(widgetId)
            .find(`.ic3WidgetBox-content svg g circle`)
            .eq(point - 1)
            .closest("g[fill='" + STATOS_SELECTION_COLOR_HEX + "']")

    } else {

        cy.wrap(widgetId)
            .find(`.ic3WidgetBox-content svg g circle`)
            .eq(point - 1)
            .closest("g[fill='" + STATOS_SELECTION_COLOR_HEX + "']")

    }

});

Cypress.Commands.add('scatterAssertPointNotSelected', (widgetId: string | $widget, point: number) => {

    if (typeof widgetId === "string") {

        cy.getWidget(widgetId)
            .find(`.ic3WidgetBox-content svg g circle`)
            .eq(point - 1)
            .closest("g[fill='#00d4ea']" /* default color */)

    } else {

        cy.wrap(widgetId)
            .find(`.ic3WidgetBox-content svg g circle`)
            .eq(point - 1)
            .closest("g[fill='#00d4ea']" /* default color */)

    }

});

// -------------------------------------------------------------------------------------------------------------
// Chart: TreeMap
// -------------------------------------------------------------------------------------------------------------

Cypress.Commands.add('treeMapClickRectangle', (widgetId: string, rectangle: number) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1) g[role='menuitem']:nth-child(${rectangle}) path`)
        .click({force: true})

});

Cypress.Commands.add('treeMapAssertRectangleCount', (widgetId: string, count: number) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1)  g[role='menuitem']`)
        .should("have.length", count)

});

Cypress.Commands.add('treeMapAssertSingleRectangleSelected', (widgetId: string, rectangle: number, rectangleCount: number) => {

    cy.getWidget(widgetId).then($w => {

        for (let ss = 1; ss <= rectangleCount; ss++) {
            ss === rectangle
                ? cy.treeMapAssertRectangleSelected($w, ss)
                : cy.treeMapAssertRectangleNotSelected($w, ss)
            ;
        }

    })

});

Cypress.Commands.add('treeMapAssertRectangleSelected', (widgetId: string | $widget, rectangle: number) => {

    if (typeof widgetId === "string") {

        cy.getWidget(widgetId)
            .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1)  g[role='menuitem']:nth-child(${rectangle})`)
            .invoke('attr', "fill").should('eq', STATOS_SELECTION_COLOR_HEX)

    } else {

        cy.wrap(widgetId)
            .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1)  g[role='menuitem']:nth-child(${rectangle})`)
            .invoke('attr', "fill").should('eq', STATOS_SELECTION_COLOR_HEX)

    }

});

Cypress.Commands.add('treeMapAssertRectangleNotSelected', (widgetId: string | $widget, rectangle: number) => {

    if (typeof widgetId === "string") {

        cy.getWidget(widgetId)
            .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1)  g[role='menuitem']:nth-child(${rectangle})`)
            .invoke('attr', "fill").should('not.eq', STATOS_SELECTION_COLOR_HEX)

    } else {

        cy.wrap(widgetId)
            .find(`.ic3WidgetBox-content svg g[role='group']:nth-child(1)  g[role='menuitem']:nth-child(${rectangle})`)
            .invoke('attr', "fill").should('not.eq', STATOS_SELECTION_COLOR_HEX)

    }

});

// -------------------------------------------------------------------------------------------------------------
// Chart: Sankey
// -------------------------------------------------------------------------------------------------------------

Cypress.Commands.add('sankeyClickArea', (widgetId: string, area: string) => {

    cy.getWidget(widgetId)
        .find(`.ic3WidgetBox-content svg tspan:contains(${area})`)
        .click({force: true})

});

// -------------------------------------------------------------------------------------------------------------
// Misc.
// -------------------------------------------------------------------------------------------------------------

Cypress.Commands.add('clickOutside', function () {
    return cy.get('body').click(0, 0); //0,0 here are the x and y coordinates
});

Cypress.Commands.add("keyCtrl", (cb: (() => void)) => {

    cy.get("body")
        .type("{ctrl}", {release: false})
        .then(() => cb())
    ;

    cy.get("body")
        .type("{ctrl}", {release: true})
    ;

});

Cypress.Commands.add("keyShift", (cb: (() => void)) => {

    cy.get("body")
        .type("{shift}", {release: false})
        .then(() => cb())
    ;

    cy.get("body")
        .type("{shift}", {release: true})
    ;

});

function assertEventWithText(value: string | null, widgetId: string, tag: string, isNotEvent?: boolean) {

    const htmlElem = tag === "mdx" ? "h6" : "h5";
    let preTag = isNotEvent ? "" : "Event ";
    const innerText = value ? `${preTag}${tag} : ${value}!` : `${preTag}${tag} : !`;

    cy.getWidget(widgetId).contains(htmlElem, innerText)

}

Cypress.Commands.add("assertEventWithText", (widgetId: string, tag: string, value: string | null = null) => {

    assertEventWithText(value, widgetId, tag, true);

});


Cypress.Commands.add("assertEventValue", (widgetId: string, value: string | null = null) => {

    cy.log("ASSERT-EVENT-VALUE [" + widgetId + "][" + value + "]")
    assertEventWithText(value, widgetId, "value");

});

Cypress.Commands.add("assertDateEventValue", (widgetId: string, date: string | null = null) => {

    date = Cypress.migrateDate(date) ?? null;

    Cypress.isBrowser('firefox')

    cy.log("ASSERT-DATE-EVENT-VALUE [" + widgetId + "][" + date + "]")
    assertEventWithText(date, widgetId, "value");

});

Cypress.Commands.add("assertEventMdx", (widgetId: string, value: string | null = null) => {

    cy.log("ASSERT-EVENT-MDX [" + widgetId + "][" + value + "]")
    assertEventWithText(value, widgetId, "mdx");

});

Cypress.Commands.add("assertEventKey", (widgetId: string, value: string | null = null) => {

    assertEventWithText(value, widgetId, "key");

});

Cypress.Commands.add("assertEventAsSet", (widgetId: string, value: string | null = null) => {

    assertEventWithText(value, widgetId, "set");

});


Cypress.Commands.add("addWidgetAndOpenEditor", (widgetType: string, posX = 100, posY = 100) => {

    cy.get("[data-cy='appMenu-button-newWidget']").click();
    cy.get("[data-cy='ic3ItemChooser-" + widgetType + "']").click();

    cy.get('[data-cy-page-nb="0"]')
        .trigger('mousedown', posX, posY, {force: true})
        .wait(100)
        .trigger('mouseup', posX, posY, {force: true})

    cy.get('[data-cy="toolbar-openOptionsEditor"]').click();

});

Cypress.Commands.add("widgetEditorOpen", (widgetId: string) => {

    if (widgetId.startsWith("wg")) {
        cy.clickUserMenu(widgetId, 'editGadget');
    } else {
        cy.clickUserMenu(widgetId, 'editWidget');
    }

});

Cypress.Commands.add("widgetEditorChangeTab", (tabName: string) => {

    cy.get('.ic3App-drawer [data-cy="' + tabName + '"]').click({force: true})
    cy.get('.ic3App-drawer .Mui-selected[data-cy="' + tabName + '"]').should('exist');

});

Cypress.Commands.add("widgetEditorTabNotExists", (tabName: string) => {

    cy.get('.ic3App-drawer [data-cy="' + tabName + '"]').should('not.exist');

});

Cypress.Commands.add("widgetEditorEnterMdxStatement", (statement: string) => {

    cy.widgetEditorChangeTab("tab-query");
    cy.get('button[data-cy="switchMdxToStatement"]').click();
    cy.get('.cm-content')
        .invoke('text', statement)
        .wait(500)

});

Cypress.Commands.add("widgetEditorChangeTextOption", (name: string, newValue: string) => {

    cy.get(`div[data-cy='${name}'] input`).type(newValue);

});

Cypress.Commands.add("widgetEditorQueryBuilderAssertNode", (dropAxis: string, nodeName: string) => {
    cy.get('.ic3EditorDrawerShell-content .ic3WidgetEditorQueryPanel-Axis[data-cy="' + dropAxis + '"]')
        .find(".MuiChip-label .ic3ListCounter-Label").first().contains(nodeName);
})

Cypress.Commands.add("widgetEditorOpenOptionGroup", (name: string) => {

    cy.get(`.ic3App-drawer .MuiAccordion-root[data-cy=${name}]`).click()

});

Cypress.Commands.add("widgetEditorChangeOption", (input: string, option: string) => {

    cy.get(`.ic3App-drawer div[data-cy='${input}'] input`)
        .clear()
        .type(option)
        .get('li.MuiAutocomplete-option[data-option-index="0"]')
        .click()
    ;

});

Cypress.Commands.add("widgetEditorAssertOption", (input: string, option: string) => {

    cy.get(`.ic3App-drawer div[data-cy='${input}'] input`)
        .should("have.value", option)
    ;

});
Cypress.Commands.add("widgetEditorChangeBoolean", (input: string) => {

    cy.get(`.ic3App-drawer [data-cy='${input}'] input`)
        .click()
    ;

});

Cypress.Commands.add("widgetEditorApplyAndClose", () => {

    cy.widgetEditorApply();
    cy.widgetEditorClose();

});

Cypress.Commands.add("widgetEditorApply", () => {

    cy.get('.ic3App-drawer [data-cy="apply"]').click({force: true});

});

Cypress.Commands.add("widgetEditorClose", () => {

    cy.get('.ic3App-drawer [data-cy="close"]').click({force: true});

});

Cypress.Commands.add("widgetEditorChangeCube", (cubeName: string) => {

    cy.get('.ic3App-drawer .ic3WidgetEditorQueryPanel-Cube input').clear().type(cubeName + "{downArrow}{enter}");

});
Cypress.Commands.add("widgetEditorMdxTreeHasNode", (text: string) => {

    cy.get('.ic3App-drawer div.ic3QueryBuilderNode-itemText').contains(text);

});

Cypress.Commands.add("keyboardDeleteAll", {
    prevSubject: true,
}, (element) => {

    if (Cypress.platform === 'darwin')
        return cy.wrap(element).type('{command}a{del}')
    else
        return cy.wrap(element).type('{ctrl}a{del}')
});

Cypress.Commands.add("widgetEditorMdxTreeFilter", (filter: string) => {

    if (filter)
        cy.get('.ic3WidgetEditorQueryPanel-Filter input').clear().type(filter);
    else
        cy.get('.ic3WidgetEditorQueryPanel-Filter input').clear();
});

Cypress.Commands.add("widgetEditorFilter", (filter: string) => {

    if (filter)
        cy.get('.ic3EditorFilterBar-searchFilter input').clear().type(filter);
    else
        cy.get('.ic3EditorFilterBar-searchFilter input').clear();
});

Cypress["migrateDate"] = (date: string | undefined | null) => {

    if (!date || !date.startsWith("0") || date.includes("/") || date.includes("-"))
        return date;
    return date.substring(1);
}


/**
 * For MacOS compatibility
 */
const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
Cypress.Commands.overwrite('type', (originalFn: any, element: any, text: string, options: any) => {
    if (isMac && text && text.includes("{ctrl}")) {
        text = text.replace("{ctrl}", "{cmd}")
    }
    return originalFn(element, text, options)
})


Cypress.Commands.add('clickPrintButton', (widgetId: string) => {

    return cy.getWidget(widgetId)
        .get('[data-cy="ic-print-button')
        .click({force: true});

});

Cypress.Commands.add('setBrowserTimeZone', (timeZone: ValidTimeZones) => {

    return cy.CDP('Emulation.setTimezoneOverride', {
        timezoneId: timeZone
    });

});

Cypress.Commands.add("sendRestAPI", (url: string, params: any) => {

    const CREDENTIALS = Cypress.env("ic3_user") + ":" + Cypress.env("ic3_password");

    return cy.wrap(fetch(url, {

        credentials: "omit",

        body: JSON.stringify(params),

        method: 'POST',

        headers: {
            "X-Authorization": Buffer.from(CREDENTIALS).toString("base64"),
            "Content-Type": "application/json"
        }

    }).then(response => response.text()));

});

Cypress.Commands.add('loadSchema', (schemaName: string) => {

    cy.sendRestAPI(
        Cypress.config().baseUrl + "/icCube/api/console/admin/LoadSchema",
        {
            "schemaName": schemaName,
        }
    ).should("eq", `{"version":"1","status":"ok","payload":{"schemaName":"${schemaName}","status":"LOADED"}}`);

});

Cypress.Commands.add('unloadSchema', (schemaName: string) => {

    cy.sendRestAPI(
        Cypress.config().baseUrl + "/icCube/api/console/admin/UnloadSchema",
        {
            "schemaName": schemaName,
        }
    ).should("eq", `{"version":"1","status":"ok","payload":{"schemaName":"${schemaName}","status":"UNLOADED"}}`);

});

Cypress.Commands.add("datePickerChooseShortcut", (widgetId: string, shortcut: string) => {

    return cy.getWidget(widgetId)
        .find('[data-cy="shortcut-picker"]')
        .click({force: true})
        .get('.MuiChip-label:contains(' + shortcut + ')')
        .eq(0)
        .click();

});