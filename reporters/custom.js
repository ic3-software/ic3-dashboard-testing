const Mocha = require("mocha");
const {Base} = Mocha.reporters;

let globalStats = {tests: 0, passes: 0, failures: 0, pending: 0};
let failures = new Set();

class FailuresSummaryReporter extends Base {
    constructor(runner) {
        super(runner);

        runner.on("fail", (err, runnable) => {

            const url = Cypress.env('url') ?? 'empty';

            failures.add(Cypress.spec.name);

            console.log(``)
            console.log(`❌ FAIL on report ${url}`)
            console.log(`Test file: ${Cypress.spec.name}`);
            console.log(`Test title:: runnable.title`);
            console.log(err);
        });


        runner.on("end", () => {
            // Print spec summary
            if (this.specFailures.length > 0) {
                console.log(`❌ Error: ${this.currentSpec}`);
            } else {
                console.log(`✅ Completed: ${this.currentSpec}`);
            }
            // accumulate across specs
            globalStats.tests += this.stats.tests || 0;
            globalStats.passes += this.stats.passes || 0;
            globalStats.failures += this.stats.failures || 0;
            globalStats.pending += this.stats.pending || 0;
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
            console.log(`${i + 1}) ${f.title}`);
        });
    }
});
module.exports = FailuresSummaryReporter;
