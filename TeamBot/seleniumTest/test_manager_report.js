const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/manager-report');
    await page.screenshot({path: 'manager_report.png'});

    await browser.close();
})();