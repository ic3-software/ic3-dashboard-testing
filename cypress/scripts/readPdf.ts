import * as fs from 'fs';
import * as path from 'path';

/**
 * Ensure the PDF file has been fully downloaded (flushed): ensure the file size is constant over a period of time.
 */
async function waitForFile(filePath: string, {checks = 3, intervalMs = 200, timeoutMs = 15000} = {}) {

    const start = Date.now();

    let lastSize = -1;
    let stableCount = 0;

    while (Date.now() - start < timeoutMs) {

        if (fs.existsSync(filePath)) {

            const {size} = fs.statSync(filePath);

            if (size > 0 && size === lastSize) {

                stableCount++;

                if (stableCount >= checks) {
                    return true;
                }

            } else {

                stableCount = 0;

            }

            lastSize = size;
        }

        await new Promise((r) => setTimeout(r, intervalMs));
    }

    throw new Error(`PDF file not ready : ${filePath}`);

}

export async function readPdf(pathToPdf: string) {

    const pdf = require('pdf-parse');
    const pdfPath = path.resolve(pathToPdf)

    // ✅ Completed: ***/integration/PrintPdf/PrintPdfEmpty.spec.ts
    // ❌ Error: ***/integration/PrintPdf/PrintPdfEmptyA4.spec.ts
    // - `cy.task('readPdf')` failed with the following error:
    //     > bad XRef entry
    // https://on.***.io/api/task
    // ❌ Error: ***/integration/PrintPdf/PrintPdfEmptyA4L.spec.ts
    // - `cy.task('readPdf')` failed with the following error:
    //     > Command token too long: 128
    // https://on.***.io/api/task
    // ✅ Completed: ***/integration/PrintPdf/PrintPdfTable.spec.ts
    // ✅ Completed: ***/integration/PrintPdf/PrintPdfWaiting.spec.ts

    // More likely the PDF is not ready yet (not fully flushed?).

    await waitForFile(pdfPath);

    const dataBuffer = fs.readFileSync(pdfPath);

    return await pdf(dataBuffer);

}