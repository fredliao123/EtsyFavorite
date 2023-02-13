const PuppeteerLib = require('puppeteer')
const Constants = require('./Constants')

module.exports = class Puppeteer {

    constructor(browser, page) {
        this.browser = browser
        this.page = page
    }

    static async initialiseBrowser() {
        const browser = await PuppeteerLib.launch({
            'headless': false,    // have window
            executablePath: null,
            userDataDir: Constants.chromeUserDataDirectory,
            ignoreDefaultArgs: Constants.puppeteerDefaultArgs,
            autoClose: false,
            defaultViewport: null,
            args: ['--lang=en-US,en',
                '--enable-audio-service-sandbox',
                '--no-sandbox',
            ],
        });
        return browser
    }

    static async initialisePage(browser) {
        let newPage = await browser.newPage();
        newPage.setDefaultNavigationTimeout(Constants.navigationTimeout);
        return newPage
    }

    async goToUrl(url) {
        await Promise.all([
            await this.page.goto(url),
        ]);
        await this.sleep(Constants.navigateSleepTime)
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async close() {
        await this.page.close()
        await this.browser.close()
    }
    
}