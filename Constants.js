module.exports = {
    etsyUrl: "https://www.etsy.com",
    puppeteerDefaultArgs: [
        '--disable-background-networking',
        '--enable-features=NetworkService,NetworkServiceInProcess',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-breakpad',
        '--disable-client-side-phishing-detection',
        '--disable-component-extensions-with-background-pages',
        '--disable-default-apps',
        '--disable-dev-shm-usage',
        '--disable-extensions',
        // BlinkGenPropertyTrees disabled due to crbug.com/937609
        '--disable-features=TranslateUI,BlinkGenPropertyTrees',
        '--disable-hang-monitor',
        '--disable-ipc-flooding-protection',
        '--disable-popup-blocking',
        '--disable-prompt-on-repost',
        '--disable-renderer-backgrounding',
        '--disable-sync',
        '--force-color-profile=srgb',
        '--metrics-recording-only',
        '--no-first-run',
        '--enable-automation',
        '--password-store=basic',
        '--use-mock-keychain',
    ],
    chromeUserDataDirectory: "C:\\Users\\user\\AppData\\Local\\Chromium\\User Data",
    second: 1000,
    minute: 60 * 1000,
    hour: 60 * 1000, // TODO
    totalFavorite: 1, // TODO
    clickSleepTime: 1 * 1000,
    uploadSleepTime: 60 * 1000,
    publishSleepTime: 60 * 1000,
    navigateSleepTime: 10 * 1000,
    navigationTimeout: 180 * 1000,
    tenOption: {
        min: 1,
        max: 1,//TODO
        integer: true
    },
    fiveOption: {
        min: 1,
        max: 5,
        integer: true
    },
    hundredOption: {
        min: 15,
        max: 100,
        integer: true
    },
    a64Option: {
        min: 2,
        max: 60,
        integer: true
    }
}