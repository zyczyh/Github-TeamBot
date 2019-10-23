const puppeteer = require('puppeteer-core');

(async () => {
    const browser = await puppeteer.connect({
        "browserWSEndpoint": "ws://localhost:9222/devtools/browser/8fbce3f5-ee42-4c75-9621-1a7f56b70f82"
    });
    const page = await browser.newPage();
    await page.goto("http://192.168.6.130:8065/csc510/channels/team19");

    const textSelector = "#post_textbox";
    await page.waitForSelector(textSelector);
    await page.type(textSelector, "@teambot create monitor");
    await page.keyboard.press("Enter");

    await page.waitFor(2000);
    await page.type(textSelector, "yes");
    await page.keyboard.press("Enter");

    // bot id selector
    await page.waitFor(2000);
    await page.click("#sidebarItem_cti4a6q8kfrr5cfe6adtjimxao__wzrhj8qy7tnrxgfuc1k3be64sc");

    // scroll to bottom, not work
    // await page.evaluate( () => {
    //         let ele = document.getElementById('post-list');
    //         ele.scrollTop = ele.scrollHeight;
    // });

    // for test, delete later
    await page.waitForSelector(textSelector);
    await page.type(textSelector, "http://192.168.6.130:3000/authen");
    await page.keyboard.press("Enter");
    
    await page.waitForSelector('.post-message__text-container');
    const msg = await page.$$('.post-message__text-container');
    const text = await (await msg[msg.length - 1].getProperty('textContent')).jsonValue();   

    // console.log(text);

    let url = text.match(/\bhttps?:\/\/\S+/gi);

    // console.log(url[0]);

    const authen = await browser.newPage();
    await authen.goto(url[0]);
    await authen.type('body > form > div:nth-child(1) > input[type=text]', '451725e0bb5b36564c7bc33b6c0asdf8394327fb952911bf381ea25ae1174cdae1');
    await authen.type('body > form > div:nth-child(2) > input[type=text]', 'csc510');
    await authen.click('body > form > div.actions > input[type=submit]');


    

    // await browser.close();
  })();