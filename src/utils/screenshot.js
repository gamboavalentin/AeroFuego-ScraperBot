import os from 'os'

let path = ''

if (os.type() === 'Linux') {
  path = 'screenshot/'
} else if (os.type() === 'Windows_NT') {
  path = 'screenshot\\'
}

export async function pageScreenshot (page, fileName = 'error') {
  return await page.screenshot({
    fullPage: true,
    path: `${path}${fileName}.webp`,
    type: 'webp'
  })
}
