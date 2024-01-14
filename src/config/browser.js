import os from 'os'
import puppeteer from 'puppeteer'
import { consoleViewError } from '../utils/consoleView.js'

async function startBrowser () {
  let browser
  if (os.type() === 'Linux') {
    try {
      browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser', //= > Servidor de Linux
        headless: true, // Para Abrir el Browser => false
        args: ['--no-sandbox'],
        ignoreHTTPSErrors: true,
        defaultViewport: {
          width: 1920,
          height: 1080
        }
      })
    } catch (err) {
      consoleViewError('src/config/browser.js', 'startBrowser', `puppeteer.launch [${err}]`)
    }
    return browser
  } else if (os.type() === 'Windows_NT') {
    try {
      browser = await puppeteer.launch({
        headless: false, // Para Abrir el Browser => false
        args: ['--no-sandbox'],
        ignoreHTTPSErrors: true,
        defaultViewport: {
          width: 1920,
          height: 1080
        }
      })
    } catch (err) {
      consoleViewError('src/config/browser.js', 'startBrowser', `puppeteer.launch [${err}]`)
    }
    return browser
  }
}

export { startBrowser }
