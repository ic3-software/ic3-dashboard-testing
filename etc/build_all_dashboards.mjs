#!/usr/bin/env node

import dotenvJSON from 'dotenv-json';
import fetch from 'node-fetch';
import * as fs from "fs";

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const here = dirname(fileURLToPath(import.meta.url));

console.log("-------------------------------------------------------------------------------------------------")
console.log("script: build_all_dashboards.js (" + here + ")");

let credentials;
let baseUrl;

if (process.env.IC3_USER && process.env.IC3_PASSWORD) {

    // e.g., GitHub action runner
    credentials = process.env.IC3_USER + ":" + process.env.IC3_PASSWORD;
    baseUrl = process.env.CYPRESS_BASE_URL;

} else {
    dotenvJSON({path: here + "/../cypress.env.json"});

    credentials = process.env.IC3_USER + ":" + process.env.IC3_PASSWORD;
    baseUrl = process.env.baseUrl;
}

const response = await fetch(baseUrl + '/icCube/api/console/admin/DocsListGizmos', {
    method: "post",
    body: JSON.stringify({
        "path": "shared:/",
        "all": true,
    }),
    headers: {
        "Content-Type": "application/json",
        "X-AUTHORIZATION": Buffer.from(credentials).toString("base64")
    }
});

const body = await response.text();

let json;

try {
    json = JSON.parse(body);
} catch (err) {
    console.error("unexpected response\n" + body);
    throw err;
}

if (json.status !== "ok") {
    console.error("unexpected status:" + json.status);
    throw new Error("unexpected status:" + json.status);
}

const shared = json.payload.gizmos;

const FOLDERS = [
    "shared:/Live Demo",
    "shared:/Embedded" /* used by the iFrame integration public demo. */,
];

const folders = shared.filter(f => FOLDERS.find(F => f.path.startsWith(F)));

const all_dashboards = here + "/data/AllDashboards.ts";

let content = `
//
// Generated file: ${new Date()} 
//
// @see build_all_dashboards.js
//

import {UxDashboardTreeNodeFolder} from "../../cypress/integration/Generic/dashboards/DashboardsUtils";

export const ALL_DASHBOARDS: UxDashboardTreeNodeFolder[] = 
${JSON.stringify(folders, undefined, 2)}


`

fs.writeFileSync(all_dashboards, content);

console.log();
console.log("all dashboards written to : " + all_dashboards);
console.log();
