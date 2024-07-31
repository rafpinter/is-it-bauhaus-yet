const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    const downloadPath = path.resolve(__dirname, 'imgs');

    // Ensure the download directory exists
    if (!fs.existsSync(downloadPath)) {
        fs.mkdirSync(downloadPath);
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page._client().send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: downloadPath
    });

    await page.goto('http://localhost:3000');

    // Click the download button to trigger the download
    // await page.click('#download-button');

    // Wait for the download to complete
    await new Promise(resolve => setTimeout(resolve, 5000)); // Adjust the timeout as needed

    await browser.close();
})();
