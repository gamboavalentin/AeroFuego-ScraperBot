import pageScraper from '../src/controllers/pageScraper.js'
import { consoleViewAction, consoleViewCicle } from '../src/utils/consoleView.js'
import { pageScreenshot } from '../src/utils/screenshot.js'

consoleViewCicle('START', 'test/screenshot.test.js', 'index', 'Inicio de Test... 🛠️')

const { page, browser } = await pageScraper()

await page.goto('https://www.google.com/', { waitUntil: 'load' })

consoleViewAction('test/screenshot.test.js', 'index', 'page.goto Pass ✅')

await pageScreenshot(page, 'test')

consoleViewAction('test/screenshot.test.js', 'index', 'pageScreenshot Pass ✅')

await browser.close()

consoleViewCicle('STOP', 'test/screenshot.test.js', 'index', 'Test exitoso! ✅')
