const Mocha = require("mocha");
const {Base} = Mocha.reporters;

let globalStats = {tests: 0, passes: 0, failures: 0, pending: 0};
let failures = [];

class FailuresSummaryReporter extends Base {
    constructor(runner) {
        super(runner);

        runner.on("fail", (test, err) => {
            const fileName = test.file || test.ctx?.file;
            const error = err && (err.stack || err.message) || "Unknown error";

            failures.push({fileName, error});

            console.log(`❌ FAIL: ${fileName}`);
            console.log(error);
        });

        // runner.on("pass", (test, err) => {
        //         const title = test.fullTitle();
        //         console.log(`Ok: ${title}`);
        // });

        runner.on("end", () => {
            // accumulate across specs
            globalStats.tests += this.stats.tests;
            globalStats.passes += this.stats.passes;
            globalStats.failures += this.stats.failures;
            globalStats.pending += this.stats.pending;
        });
    }
}

// Print summary once, when Cypress process exits
process.on("exit", () => {
    console.log("\n================ Final Test Summary ================");
    console.log(`Total:   ${globalStats.tests}`);
    console.log(`Passed:  ${globalStats.passes}`);
    console.log(`Failed:  ${globalStats.failures}`);
    console.log(`Pending: ${globalStats.pending}`);
    console.log("====================================================");

    if (failures.length > 0) {
        console.log("\n--- Failed Tests ---");
        failures.forEach((f, i) => {
            console.log(`${i + 1}) ${f.fileName}`);
        });
    }
});

module.exports = FailuresSummaryReporter;
