const {run} = require("cypress-cloud");
const dotenvJSON = require("dotenv-json");
const {cloudPlugin} = require("cypress-cloud/plugin");


dotenvJSON({path: "cypress.env.json"});


// module.exports = {
//     projectId: 'PBTFOx',
//     recordKey: 'Tgx6jGAsZw6xrEXQ',
// }

(async function runTests() {

    const results = await run({

        parallel: true,
        browser: "chrome",

        cloudServiceUrl: process.env.sc_cloudServiceUrl,
        projectId: process.env.sc_projectId,
        recordKey: process.env.sc_recordKey,

        ciBuildId: process.env.ciBuildId ?? "toto",


        configFile: 'cypress.config-parallel.js',

        config: {

            specPattern: process.env.ic3SpecFiles == null ?
                ["**/*.spec.ts"]
                :
                JSON.parse(process.env.ic3SpecFiles).map(spec => "**/" + spec.trim()),

            baseUrl: process.env.baseUrl,

            viewportWidth: 1600,
            viewportHeight: 1200,

            video: false,

            supportFile: "cypress/support/e2e.ts",

            retries: {
                runMode: 2,
                openMode: 2,
            },

        },
    });

    if (results?.totalFailed !== 0) {
        const errors = [];

        results.runs.forEach(run => {
            if (run.stats.failures !== 0) {
                errors.push("ic3InError:" + run.spec['baseName'] + " : " + run.stats.failures + "/" + run.stats.tests + " Failures")
            }
        })
        errors.forEach(error => console.log(error))
        console.log("ic3Failed: " + results?.totalFailed);
        console.log("ic3Total: " + results?.totalTests);
    } else {
        console.log("ic3Failed: " + 0);
        console.log("ic3Total: " + results?.totalTests);
    }
})
();

