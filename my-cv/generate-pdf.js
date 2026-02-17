const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // A4 at 96dpi = 794 x 1123 pixels
  await page.setViewport({ width: 794, height: 1123 });

  const filePath = path.resolve(__dirname, 'dist/cv.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: 'dist/cv.pdf',
    width: '210mm',
    height: '297mm',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  console.log('PDF generated: cv.pdf');
})();


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // A4 at 96dpi = 794 x 1123 pixels
  await page.setViewport({ width: 794, height: 1123 });

  const filePath = path.resolve(__dirname, 'dist/cv-de.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: 'dist/cv-de.pdf',
    width: '210mm',
    height: '297mm',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  console.log('PDF generated: cv-de.pdf');
})();
