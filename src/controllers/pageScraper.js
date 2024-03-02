import { consoleViewError } from '../utils/consoleView.js'
import { startBrowser } from '../config/browser.js'

// import { algoritmoPasaje, alertaMejorPrecio } from '../utils/algoritmos.js'

export default async function pageScraper () {
  let page = null
  let browser = null
  try {
    browser = await startBrowser()

    page = await browser.newPage()

    await page.setRequestInterception(true)

    page.on('request', (req) => {
      if (req.resourceType() === 'font' || req.resourceType() === 'image') {
        req.abort()
      } else {
        req.continue()
      }
    })

    page.setDefaultTimeout(60000)
  } catch (error) {
    consoleViewError('src/utils/pageScraper.js', 'pageScraper', `Error al cargar el Browser: ${error}`)
  }
  return { page, browser }
}
