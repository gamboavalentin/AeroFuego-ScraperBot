import { consoleViewAction, consoleViewError } from './consoleView.js'
import { pageScreenshot } from './screenshot.js'

const maxReload = 3

export default async function (page, pageUrl) {
  let countLoad = 0
  let error = false
  do {
    countLoad++
    consoleViewAction('src/utils/reloadPageForSelector.js', 'default', `page Load [${countLoad}/${maxReload}]`)
    await page.setCacheEnabled(false)

    try {
      await Promise.all([
        page.waitForNavigation(),
        page.goto(pageUrl, { waitUntil: 'load' })
      ])
    } catch (err) {
      await pageScreenshot(page, 'page-goto')
      error = true
    }

    // espera a que carge los calendarios
    try {
      await page.waitForSelector('.fdc-from-box')
    } catch (err) {
      error = true
    }
  } while (error && countLoad >= maxReload)

  if (error && countLoad >= maxReload) {
    consoleViewError('src/utils/reloadPageForSelector.js', 'default', `No Load Page [pageUrl=${pageUrl}]`)
  }
  return { error, page_: page }
}
