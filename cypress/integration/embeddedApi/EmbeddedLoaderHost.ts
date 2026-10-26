/**
 * Host page embedding icCube using the @ic3/reporting-api-embedded library (dist/Loader.js as installed in
 * node_modules) ; both are served by cy.intercept() from the icCube origin (same origin for the session cookie).
 *
 * The library exports are available in the host page as window.ic3EmbeddedLoader (DashboardsLoaderDivContext,
 * DashboardsLoaderFrame).
 *
 * icCube server only (not the localhost:3000 dev. server) : the DIV loader is fetching /icCube/report/console.
 */

export const LOADER_TIMEOUT = 30000;

export const REPORT_PARAMS_PATH = "shared:/Tests/embeddedApi/Report Params";

const LOADER_JS = "node_modules/@ic3/reporting-api-embedded/dist/Loader.js";

export function visitLoaderHost(containerId: string) {

    cy.readFile(LOADER_JS).then((loaderJs: string) => {

        cy.intercept("GET", "/icCube/report/cypress-ic3-embedded-loader.js", {
            headers: {"content-type": "application/javascript"},
            body: "(function () { var exports = {};\n" + loaderJs + "\nwindow.ic3EmbeddedLoader = exports; })();"
        });

    });

    cy.intercept("GET", "/icCube/report/cypress-ic3-embedded-host.html", {
        headers: {"content-type": "text/html"},
        body: `<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <script src="/icCube/report/cypress-ic3-embedded-loader.js"></script>
</head>
<body>
<div id="${containerId}" style="width: 1200px; height: 900px"></div>
</body>
</html>`
    });

    cy.visit("/icCube/report/cypress-ic3-embedded-host.html");
}

/**
 * Calls loadLibsAndInitialize() (DIV embedding) and stores its outcome into window[resultField] : the IReporting
 * instance or "rejected: <error>". The DashboardsLoaderDivContext is kept in window[contextField] for retries.
 */
export function loadLibsAndInitialize(containerId: string, contextField: string, resultField: string, appType?: string) {

    cy.window().then((win: any) => {

        win[contextField] = win[contextField] ?? new win.ic3EmbeddedLoader.DashboardsLoaderDivContext();
        win[resultField] = undefined;

        win[contextField].loadLibsAndInitialize({
            uid: "ic3-div-" + resultField,
            container: win.document.getElementById(containerId),
            appType: appType,
        }).then(
            (reporting: any) => win[resultField] = reporting,
            (error: any) => win[resultField] = "rejected: " + error
        );

    });

}
