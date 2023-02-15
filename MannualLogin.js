const Favoritor = require('./Favoritor')
const Puppeteer = require('./Puppeteer')
const randomNum = require('random-number')
const Constants = require('./Constants')
const log = require('log-to-file')

const searchKeywords = [
    "Samsung Tv Art Renoir",
    "Samsung Tv Art farmhouse",
    "Samsung Tv Art Monet",
    "Samsung Tv Art Van Gogh",
    "Samsung Tv Art cityscape",
    "Sailing tv art",
    "Set of 3 Claude Monet Painting",
    "Set of 3 Van Gogh Painting"
]

const shopName = "SunbeamAvenueGallery"

mannualLogin()

async function mannualLogin() {
    let browser = await Puppeteer.initialiseBrowser()
    let page = await Puppeteer.initialisePage(browser)
    let puppeteer = new Puppeteer(browser, page)
    await puppeteer.goToUrl(Constants.etsyUrl)
}