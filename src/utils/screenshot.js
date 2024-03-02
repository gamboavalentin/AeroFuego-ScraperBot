import os from 'os'
import { consoleViewAction } from './consoleView.js'

let path = ''

if (os.type() === 'Linux') {
  path = 'screenshot/'
} else if (os.type() === 'Windows_NT') {
  path = 'screenshot\\'
}

export async function pageScreenshot (page, fileName = 'error') {
  consoleViewAction('src/utils/screenshot.js', 'pageScreenshot', `Create screenshot [${path}${fileName}.webp].`)
  return await page.screenshot({
    fullPage: true,
    path: `${path}${fileName}.webp`,
    type: 'webp'
  })
}
