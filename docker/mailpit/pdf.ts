import { PDFDocument } from 'pdf-lib';

async function main() {
  const foo = Bun.file("./pdf.pdf");

  const pdfBytes = await foo.arrayBuffer()
  const pdfDoc = await PDFDocument.load(pdfBytes);

  const date = new Date()

  pdfDoc.setCreationDate(date);
  pdfDoc.setModificationDate(date);
  pdfDoc.setProducer('PDFium')

  const newPdfBytes = await pdfDoc.save();

  await Bun.write("./pdf-modified.pdf", newPdfBytes);

}

main();