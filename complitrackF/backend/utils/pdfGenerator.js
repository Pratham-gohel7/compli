// utils/pdfGenerator.js
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generatePDF = (data) => {
    return new Promise((resolve, reject) => {
        try {
            const fileName = `annual-report-${Date.now()}.pdf`;
            const folderPath = path.join(__dirname, "../public/pdfs");

            // Ensure folder exists
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }

            const filePath = path.join(folderPath, fileName);

            const doc = new PDFDocument();
            doc.pipe(fs.createWriteStream(filePath));

            // Example content — adjust this for your real data
            doc.fontSize(20).text("Annual Return Report", { align: "center" });
            doc.moveDown();
            doc.fontSize(12).text(JSON.stringify(data, null, 2));

            doc.end();

            doc.on("finish", () => resolve(fileName));
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = generatePDF;
