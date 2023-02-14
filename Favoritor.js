const Constants = require('./Constants')
const randomNum = require('random-number')
const log = require('log-to-file');

module.exports = class Favoritor {

    constructor(puppeteer) {
        this.puppeteer = puppeteer
    }

    async favoriteListings(searchKeyWord, shopName) {
        await this.puppeteer.goToUrl(Constants.etsyUrl)
        await this.search(searchKeyWord)
        await this.puppeteer.sleep(Constants.navigateSleepTime)
        let targetFavoriteCount = 0
        let randomFavoriteCount = 0
        let isLastClickedTargetFavorite = false
        while (targetFavoriteCount < Constants.totalFavorite) {
            let targetFavoriteButton = await this.getFavoriteButtonOnMatchingListing(shopName)
            let randomFavoriteButton = await this.getFavoriteButtonOnRandomListing(shopName)
            log("Target favorite button: " + targetFavoriteButton + " | Target favorite count: " + targetFavoriteCount)
            log("Random favorite button: " + randomFavoriteButton + " | Random favorite count: " + randomFavoriteCount)
            if(targetFavoriteButton != null && !isLastClickedTargetFavorite) {
                await this.clickOnFavoriteButton(targetFavoriteButton, shopName)
                log("Favorite: Favorite click shopName: " + shopName)
                targetFavoriteCount = targetFavoriteCount + 1
                isLastClickedTargetFavorite = true
            } else if (randomFavoriteCount <= targetFavoriteCount) {
                await this.clickOnFavoriteButton(randomFavoriteButton, shopName)
                log("Favorite: Random shop click")
                randomFavoriteCount = randomFavoriteCount + 1
                isLastClickedTargetFavorite = false
            } 
            await this.goToNextPage()
        }
        return
    }

    async search(searchKeyWord) {
        log("Searching keyword: " + searchKeyWord)
        let searchBox = await this.puppeteer.page.$('#global-enhancements-search-query')
        await searchBox.click({ clickCount: 3 })
        await searchBox.type(searchKeyWord)

        let searchButton = await this.puppeteer.page.$('button[type="submit"]')
        await searchButton.click()
        await this.puppeteer.sleep(Constants.clickSleepTime)
    }

    async getFavoriteButtonOnMatchingListing(shopName) {
        let ol = await this.puppeteer.page.$('.wt-grid.wt-grid--block.wt-pl-xs-0.tab-reorder-container')

        let items = await ol.$$('li')

        for (var item of items) {
            var shopNameElement = await item.$('.wt-text-caption.wt-text-truncate.wt-text-grey.wt-mb-xs-1.min-height')
            var name = await this.puppeteer.page.evaluate(el => el.textContent, shopNameElement)
            let cleanName = name.replace("Ad vertisement by Etsy seller", "").trim()
            if (cleanName == shopName) {
                var favoriteButton = await item.$('.btn--focus.wt-position-absolute.wt-btn.wt-btn--light.wt-btn--small.wt-z-index-2.wt-btn--filled.wt-btn--icon.neu-default-favorite.wt-position-right.wt-position-top.fav-opacity-hidden.neu-hover-on-card.neu-default-button-position')
                if (favoriteButton == null) {
                    continue
                }
                return favoriteButton
            }
        }
        return null
    }

    async getFavoriteButtonOnRandomListing(shopName) {
        let ol = await this.puppeteer.page.$('.wt-grid.wt-grid--block.wt-pl-xs-0.tab-reorder-container')

        let items = await ol.$$('li')

        let regeneraterandomNum = true
        let randomIndex

        while (regeneraterandomNum) {
            randomIndex = randomNum(Constants.a64Option)
            let randomName = this.getShopName(items[randomIndex])
            if (randomName == shopName || randomName == null) {
                randomIndex = randomNum(Constants.a64Option)
                regeneraterandomNum = true
            } else {
                regeneraterandomNum = false
            }
        }

        for (let i = 0; i < items.length; i++) {
            let item = items[i]
            let cleanName = this.getShopName(item)
            if (cleanName != shopName && i == randomIndex) {
                var favoriteButton = await item.$('.btn--focus.wt-position-absolute.wt-btn.wt-btn--light.wt-btn--small.wt-z-index-2.wt-btn--filled.wt-btn--icon.neu-default-favorite.wt-position-right.wt-position-top.fav-opacity-hidden.neu-hover-on-card.neu-default-button-position')
                if (favoriteButton == null) {
                    continue
                }
                return favoriteButton
            }
        }
        return null
    }

    async getShopName(item) {
        try{
            var shopNameElement = await item.$('.wt-text-caption.wt-text-truncate.wt-text-grey.wt-mb-xs-1.min-height')
            var name = await this.puppeteer.page.evaluate(el => el.textContent, shopNameElement)
            let cleanName = name.replace("Ad vertisement by Etsy seller", "").trim()
            return cleanName
        } catch(err) {
            log("GetShopName error: " + err)
            return null
        }
    }

    async clickOnFavoriteButton(favoriteButton, shopName) {
        await favoriteButton.click()
        let sleepTime = randomNum(Constants.hundredOption) * Constants.second
        log("Favorite: Favorite click sleep time: " + sleepTime)
        await this.puppeteer.sleep(sleepTime)
    }

    async goToNextPage() {
        log("Go to next page")
        let ul = await this.puppeteer.page.$$('.wt-action-group.wt-list-inline.search-pagination ')
        let items = await ul[ul.length - 1].$$('li')
        await items[items.length - 1].click()

        await this.puppeteer.sleep(Constants.navigateSleepTime)
        let sleepTime = randomNum(Constants.tenOption) * Constants.minute
        log("Favorite: Next page sleep time: " + sleepTime)
        await this.puppeteer.sleep(sleepTime)
    }

}