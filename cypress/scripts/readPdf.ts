import * as fs from 'fs';
import * as path from 'path';

// /**
//  * Ensure the PDF file has been fully downloaded (flushed): ensure the file size is constant over a period of time.
//  */
// async function waitForFile(filePath: string, {checks = 3, intervalMs = 300, timeoutMs = 15000} = {}) {
//
//     const start = Date.now();
//
//     let lastSize = -1;
//     let stableCount = 0;
//
//     while (Date.now() - start < timeoutMs) {
//
//         if (fs.existsSync(filePath)) {
//
//             const {size} = fs.statSync(filePath);
//
//             if (size > 0 && size === lastSize) {
//
//                 stableCount++;
//
//                 if (stableCount >= checks) {
//                     return true;
//                 }
//
//             } else {
//
//                 stableCount = 0;
//
//             }
//
//             lastSize = size;
//         }
//
//         await new Promise((r) => setTimeout(r, intervalMs));
//     }
//
//     throw new Error(`PDF file not ready : ${filePath}`);
//
// }
//
// export async function readPdf(pathToPdf: string) {
//
//     const { PDFParse } = require('pdf-parse');
//     const pdfPath = path.resolve(pathToPdf)
//
//     const waitStartMS = Date.now();
//
//     await waitForFile(pdfPath);
//
//     const waitMS = Date.now() - waitStartMS;
//
//     const dataBuffer = fs.readFileSync(pdfPath);
//
//     const parser = new PDFParse({ data: dataBuffer });
//
//     try {
//
//         return await parser.getText();
//
//     } catch (error) {
//
//         // Artifacts: see cypressManual.yml / cypress.config-manual.ts
//
//         const debugDir = path.join(path.dirname(pdfPath), '_corrupt-pdfs');
//         fs.mkdirSync(debugDir, { recursive: true });
//         const debugPath = path.join(debugDir, `${Date.now()}-${path.basename(pdfPath)}`);
//         fs.copyFileSync(pdfPath, debugPath);
//
//         const message = error instanceof Error ? error.message : String(error);
//
//         const header = dataBuffer.subarray(0, 8).toString('latin1');
//         const tail = dataBuffer.subarray(-32).toString('latin1').replace(/\s+/g, ' ').trim();
//
//         throw new Error(
//             [
//                 `PDF error ${pdfPath}`,
//                 `size=${dataBuffer.byteLength}B`,
//                 `waited=${waitMS}ms`,
//                 `header=${header}`,
//                 `tail=${tail}`,
//                 `error=${message}`,
//             ].join(' | '), {cause: error}
//         );
//
//     }
//
// }

export async function readPdf(pathToPdf: string) {

    const {PDFParse} = require('pdf-parse');
    const pdfPath = path.resolve(pathToPdf)

    const dataBuffer = fs.readFileSync(pdfPath);

    const parser = new PDFParse({data: dataBuffer});

    return await parser.getText();
}