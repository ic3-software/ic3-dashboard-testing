const Mocha = require("mocha");
const {Base} = Mocha.reporters;
const {
    EVENT_SUITE_BEGIN,
    EVENT_TEST_FAIL,
    EVENT_RUN_END
} = Mocha.Runner.constants;


let globalStats = {tests: 0, passes: 0, failures: 0, pending: 0};
let failures = [];

// on change -> npx tsc reporters/custom.ts

class FailuresSummaryReporter extends Base {
    specFailures;
    currentSpec;

    constructor(runner) {
        super(runner);

        // Initialize properties in constructor
        this.specFailures = [];
        this.currentSpec = '';

        runner.on(EVENT_SUITE_BEGIN, (suite) => {
            if (suite.root) {
                // 'suite.file' provides the absolute path to the current spec file.
                this.currentSpec = suite.file;
            }
        });

        runner.on(EVENT_TEST_FAIL, (test, error) => {
           // const url = Cypress.env('url') ?? 'empty';
            const fileName = Cypress.spec.name;

            const failure = {fileName, error};
            failures.push(failure);

            // Ensure specFailures is initialized
            if (!this.specFailures) {
                this.specFailures = [];
            }
            this.specFailures.push(failure);

            console.log(``)
          //  console.log(`❌ FAIL on report ${url}`)
            console.log(`❌ FAIL file: ${fileName}`);
            console.log(`Test title: ${test.title}`);
            console.log(error.message);
        });

        runner.on(EVENT_RUN_END, () => {
            // Safe check for specFailures existence and length
            const hasFailures = this.specFailures && this.specFailures.length > 0;

            if (hasFailures) {
                console.log(`❌ Error: ${this.currentSpec}`);
                this.specFailures.forEach((err) => {
                    console.log(`   - ${err.error.message}`);
                });
            } else {
                console.log(`✅ Completed: ${this.currentSpec}`);
            }

            // accumulate across specs
            globalStats.tests += this.stats.tests || 0;
            globalStats.passes += this.stats.passes || 0;
            globalStats.failures += this.stats.failures || 0;
            globalStats.pending += this.stats.pending || 0;

            // Reset for next spec
            this.specFailures = [];
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
