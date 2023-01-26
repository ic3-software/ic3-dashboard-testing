#!/usr/bin/env node

import fs from "fs";
import dotenv from 'dotenv';
import fetch from 'node-fetch';

const here = process.env.INIT_CWD;

console.log("-------------------------------------------------------------------------------------------------")
console.log("script: build_all_dashboards.js (" + here + ")");

let credentials;

if (process.env.IC3_USER && process.env.IC3_PASSWORD) {

    // e.g., GitHub action runner
    credentials = process.env.IC3_USER + ":" + process.env.IC3_PASSWORD;

} else {

    const props = dotenv.parse(fs.readFileSync(here + "/../.env.dev"));
    credentials = props.IC3_USER + ":" + props.IC3_PASSWORD;
}

const response = await fetch('https://dev.icCube.com/icCube/api/console/admin/Dashboards', {
    method: "post",
    body: JSON.stringify({
        "path": "shared:/"
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

const shared = json.payload.trees;

const FOLDERS = [
    "/shared/Live Demo",
    "/shared/Embedded" /* used by the iFrame integration public demo. */,
];

const folders = shared.filter(f => FOLDERS.find(F => f.docsPath.startsWith(F)));

const all_dashboards = here + "/etc/data/AllDashboards.ts";

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
