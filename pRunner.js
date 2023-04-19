const {spawn} = require('child_process');
const os = require('os')


const maxParallelRuns = Math.round(os.cpus().length * 0.75);
const ciBuildId = `run-local-${os.userInfo().username}-${new Date().toISOString()}`;

const startDate = new Date();

function launchParallelWork(specFiles) {

    const runners = specFiles ? ['pRun.js'] : new Array(maxParallelRuns).fill('pRun.js');
    console.log("Starting " + runners.length + " run in parallel");

    return runners.map(fileName => {
        return new Promise((resolve, reject) => {
            const proc = spawn('node', [fileName], {
                shell: true,
                env: {
                    ...process.env,
                    ciBuildId: ciBuildId,
                    ic3CloudPlugin: true,
                    ic3SpecFiles: specFiles ? JSON.stringify(specFiles) : undefined
                }
            });

            const ret = {
                filesInError: [],
                totals: 0,
                totalsFailed: 0,
                unexpectedErrors: [],
            };

            proc.stdout.on('data', data => {
                const asString = ("" + data).trim();
                console.log(asString);
                if (asString.includes("ic3InError:") || asString.includes("ic3Failed:") || asString.includes("ic3Total:")) {
                    asString.split("\n").forEach(line => {
                        if (line.startsWith("ic3InError:")) {
                            ret.filesInError.push(line.slice("ic3InError:".length))
                        } else if (line.startsWith("ic3Failed:")) {
                            ret.totalsFailed += parseInt(line.slice("ic3Failed:".length).trim())
                        } else if (line.startsWith("ic3Total:")) {
                            ret.totals += parseInt(line.slice("ic3Total:".length).trim())
                        }
                    });
                }
            });

            proc.stderr.on('data', data => {
                const errorAsString = "" + data;
                if (errorAsString.includes("tsconfig-paths will be skipped")) {
                    // ignore
                } else {
                    ret.unexpectedErrors.push(errorAsString)
                }
            });

            proc.on('close', code => {
                if (code !== 0) {
                    console.error("close on error : " + code);
                    reject(new Error(`Failed to execute ${fileName}.`));
                } else {
                    resolve(ret);
                }
            });
        });
    });
}

function checkJobs(promises, maxFailedToRetryOrPreviousTotal) {
    Promise.all(promises)
        .then(results => {

            let unexpectedErrors = []
            let filesInError = []
            let totals = 0;
            let totalsFailed = 0;

            results.forEach(results => {
                unexpectedErrors.push(...results.unexpectedErrors);
                filesInError.push(...results.filesInError);
                totals += results.totals;
                totalsFailed += results.totalsFailed;
            });

            console.log("*************************************")

            const isRetry = maxFailedToRetryOrPreviousTotal < 0;

            if (!isRetry && filesInError.length && filesInError.length <= maxFailedToRetryOrPreviousTotal) {
                // retry the 10th ?
                const specFiles = filesInError.map(line => line.split(":")[0].trim());
                console.log("RETRYING failed test " + filesInError.length)
                console.log("")
                console.log("Runs failed : " + specFiles.join(", "))
                console.log("")

                const promises = launchParallelWork(specFiles)
                checkJobs(promises, -totals)

            } else {

                const difSeconds = (new Date().getTime() - startDate.getTime()) / 1000;
                const seconds = Math.floor(difSeconds % 60);
                const minutes = Math.floor((difSeconds / 60) % 60);
                const hours = Math.floor(difSeconds / (60 * 60));

                console.log("Final Results" + (isRetry ? " with Retry" : ""))
                console.log("")
                console.log("Test Time (" + maxParallelRuns + ") = " + (hours ? hours + "h" : "") + minutes + "m" + seconds + "s")

                totals = isRetry ? -maxFailedToRetryOrPreviousTotal : totals;

                unexpectedErrors.sort().forEach(line => console.log(line))
                filesInError.sort().forEach(line => console.log(line))
                if (!totalsFailed) {
                    console.log("All Test Ok : " + totals)
                } else {
                    console.log("Failed/Total : " + totalsFailed + "/" + totals)
                }

            }

        })
        .catch(error => {
            console.log("ERROR");
            console.log(error);
        });

}

const promises = launchParallelWork()
checkJobs(promises, 10)
