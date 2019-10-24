const puppeteer = require('puppeteer-core');

(async () => {
    const browser = await puppeteer.connect({
        "browserWSEndpoint": "ws://localhost:9222/devtools/browser/2a337e0a-d418-4028-919e-55bc0e4e7553"
    });

    const page = await browser.newPage();
    await page.waitFor(5000);
    await page.setViewport({
        width: 1800,
        height: 960,
        deviceScaleFactor: 1,
      });
    await page.goto("http://192.168.6.130:8065/csc510/channels/town-square");

    const textSelector = "#post_textbox";
    await page.waitForSelector(textSelector);
    await page.type(textSelector, "@teambot create monitor");
    await page.keyboard.press("Enter");

    await page.waitFor(2000);
    await page.type(textSelector, "@teambot yes");
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
    // await page.waitForSelector(textSelector);
    // await page.type(textSelector, "http://192.168.6.130:3000/authen");
    // await page.keyboard.press("Enter");
    
    await page.waitForSelector('.post-message__text-container');
    const msg = await page.$$('.post-message__text-container');
    const text = await (await msg[msg.length - 1].getProperty('textContent')).jsonValue();   

    // console.log(text);

    let url = text.match(/\bhttps?:\/\/\S+/gi);

    // console.log(url[0]);

    await page.waitFor(2000);
    const authen = await browser.newPage();
    await authen.goto(url[0]);
    await authen.type('body > form > div:nth-child(1) > input[type=text]', '451725e0bb5b36564c7bc33b6c0asdf8394327fb952911bf381ea25ae1174cdae1');
    await authen.type('body > form > div:nth-child(2) > input[type=text]', 'csc510');
    await authen.waitFor(2000);
    await authen.click('body > form > div.actions > input[type=submit]');
    await authen.waitFor(2000);
    await authen.close();
    
    await page.click("#sidebarItem_cti4a6q8kfrr5cfe6adtjimxao__wzrhj8qy7tnrxgfuc1k3be64sc");
    await page.waitFor(3000);

    // failed
    await page.click('#sidebarItem_town-square');
    await page.waitForSelector(textSelector);
    await page.type(textSelector, "@teambot @fakeUser");
    await page.keyboard.press("Enter"); 
    await page.waitFor(2000);
    await page.click("#sidebarItem_cti4a6q8kfrr5cfe6adtjimxao__wzrhj8qy7tnrxgfuc1k3be64sc");
    await page.waitFor(3000);
      
    // success
    await page.click('#sidebarItem_town-square');
    await page.waitForSelector(textSelector);
    await page.type(textSelector, "@teambot @yanchen");
    await page.keyboard.press("Enter"); 
    await page.waitFor(2000);
    await page.click("#sidebarItem_cti4a6q8kfrr5cfe6adtjimxao__wzrhj8qy7tnrxgfuc1k3be64sc");
    await page.waitFor(3000);

    // await browser.close();
  })();