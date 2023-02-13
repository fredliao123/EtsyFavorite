const Favoritor = require('./Favoritor')
const Puppeteer = require('./Puppeteer')
const randomNum = require('random-number')
const tenOption = {
    min: 1,
    max: 2,//TODO
    integer: true
}

const searchKeywords = [
    "Samsung Tv Art",
    "frame tv art",
    "Samsung Tv Art Renoir",
    "Samsung Tv Art farmhouse",
    "Samsung Tv Art Monet",
    "Samsung Tv Art Van Gogh",
    "Sailing tv art"
]

const shopName = "LetsFallinArt"

run()

async function run() {
    let browser = await Puppeteer.initialiseBrowser()
    let page = await Puppeteer.initialisePage(browser)
    let puppeteer = new Puppeteer(browser, page)

    let favoritor = new Favoritor(puppeteer)
    let keywordIndex = 0
    while (true) {
        if(keywordIndex >= searchKeywords.length) {
            keywordIndex = 0
        }

        favoritor.favoriteListings(searchKeywords[keywordIndex], shopName)
        keywordIndex ++

    }
}