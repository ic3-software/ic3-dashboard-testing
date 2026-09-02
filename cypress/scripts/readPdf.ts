import path from "path";
import fs from "fs";
import pdf from "pdf-parse";

export async function readPdf(pathToPdf: string) {
    const pdf = require('pdf-parse');
    const fs = require('fs');
    const path = require('path')

    const pdfPath = path.resolve(pathToPdf)
    const dataBuffer = fs.readFileSync(pdfPath);
    return await pdf(dataBuffer);
}