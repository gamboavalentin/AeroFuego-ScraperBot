import * as dotenv from 'dotenv'
import pageScraper from '../src/controllers/pageScraper.js'
import aeroArgScraper from '../src/webScrap/aerolineasArg.js'
import LocalData from '../src/models/localData.js'
import IdaList from '../src/models/IdaList.js'
import { consoleViewCicle } from '../src/utils/consoleView.js'

dotenv.config({ path: './src/config/.env' })

consoleViewCicle('START', 'test/scrap.test.js', 'index', 'Inicio de Test... 🛠️')

const { page, browser } = await pageScraper()

const localData = new LocalData()

const idaList = new IdaList(/* await localData.getAeroTest('scrap.json') */)

let aeroArgScrap = await aeroArgScraper({ page, cantMesesProps: 5, idaList, switchTest: false })
aeroArgScrap = await aeroArgScraper({ page, cantMesesProps: 5, idaList, switchTest: true })

await page.close()
await browser.close()

await localData.setAeroTest(aeroArgScrap, 'scrap.json')

consoleViewCicle('STOP', 'test/scrap.test.js', 'index', 'Test exitoso! ✅')
