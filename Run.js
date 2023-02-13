const Favoritor = require('./Favoritor')
const Puppeteer = require('./Puppeteer')
const randomNum = require('random-number')
const Constants = require('./Constants')
const log = require('log-to-file')

const searchKeywords = [
    "Samsung Tv Art",
    "frame tv art",
    "Samsung Tv Art Renoir",
    "Samsung Tv Art farmhouse",
    "Samsung Tv Art Monet",
    "Samsung Tv Art Van Gogh",
    "Sailing tv art"
]

const shopName = "AlluringView"

run()

async function run() {
    let keywordIndex = 0
    while (true) {
        let browser = await Puppeteer.initialiseBrowser()
        let page = await Puppeteer.initialisePage(browser)
        let puppeteer = new Puppeteer(browser, page)
        let favoritor = new Favoritor(puppeteer)

        if(keywordIndex >= searchKeywords.length) {
            keywordIndex = 0
        }

        log("Run: Start favorite process for: " + searchKeywords[keywordIndex])
        try{
            await favoritor.favoriteListings(searchKeywords[keywordIndex], shopName)
        } catch(err) {
            log("Run: favoriteListings error: " + err)
        }
        keywordIndex ++
        let randomWaitTime = randomNum(Constants.fiveOption)
        let waitTime = randomWaitTime * Constants.hour
        log("Run: finished search for: " + searchKeywords[keywordIndex] + " | Start sleep for: " + randomWaitTime + " hours.")
        await puppeteer.close()
        await puppeteer.sleep(waitTime)
    }
}