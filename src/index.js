const fs = require("fs");
const PDFParser = require("pdf2json");
const getText = require("./lib/getText.js");

const pdfParser = new PDFParser();
const pdfFilePath = "./pdf/raw.pdf";
const jsonFilePath = "./raw.json";

// pdfParser.on("pdfParser_dataError", errData =>
//   console.error(errData.parserError)
// );
// pdfParser.on("pdfParser_dataReady", pdfData => {
//   fs.writeFile(jsonFilePath, "utf8", JSON.stringify(pdfData), () => {});
// });

// pdfParser.loadPDF(pdfFilePath);

// let inputStream = fs.createReadStream(pdfFilePath, { bufferSize: 64 * 1024 });
// let outputStream = fs.createWriteStream(jsonFilePath);

// inputStream
//   .pipe(new PDFParser())
//   .pipe(new StringifyStream())
//   .pipe(outputStream);

const getPdfObj = pdfFilePath => {
  return new Promise((res, rej) => {
    fs.readFile(pdfFilePath, (err, pdfBuffer) => {
      if (err) {
        rej(err);
        return;
      }
      pdfParser.on("pdfParser_dataError", errData => {
        rej(errData);
      });
      pdfParser.on("pdfParser_dataReady", pdfData => {
        res(pdfData);
      });
      pdfParser.parseBuffer(pdfBuffer);
    });
  });
};

// pdfParser.on("pdfParser_dataError", errData =>
//   console.error(errData.parserError)
// );
// pdfParser.on("pdfParser_dataReady", pdfData => {
//   fs.writeFile(jsonFilePath, pdfParser.getRawTextContent());
// });

// pdfParser.loadPDF(pdfFilePath);

getPdfObj(pdfFilePath)
  .then(pdfBuffer => {
    console.log(pdfBuffer["formImage"]["Pages"].map(getText)[0]);
    return JSON.stringify(pdfBuffer, null, 2);
  })
  .then(pdf => {
    fs.writeFile(jsonFilePath, pdf, err => console.log("error", err));
    // console.log(pdf);
  });
// .catch(e => {
//   console.log(e);
// });
// pdfParser.on("pdfParser_dataError", errData =>
//   console.error(errData.parserError)
// );
// pdfParser.on("pdfParser_dataReady", pdfData => {
//   fs.writeFile("./F1040EZ.json", JSON.stringify(pdfData));
// });
// pdfParser.on("pdfParser_dataReady", pdfData => {
//   fs.writeFile("./F1040EZ.txt", pdfParser.getRawTextContent());
// });

// pdfParser.loadPDF("./pdf/국회회의록_20대_367회_1차_외교통일위원회.PDF");
