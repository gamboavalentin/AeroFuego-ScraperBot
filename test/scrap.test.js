import * as dotenv from 'dotenv'
import pageScraper from '../src/controllers/pageScraper.js'
import aeroArgScraper from '../src/webScrap/aerolineasArg.js'
import LocalData from '../src/models/LocalData.js'
import IdaList from '../src/models/IdaList.js'
import { consoleViewAction, consoleViewCicle } from '../src/utils/consoleView.js'

dotenv.config({ path: './src/config/.env' })

consoleViewCicle('START', 'test/scrap.test.js', 'index', 'Inicio de Test... 🛠️')

const { page, browser } = await pageScraper()

if (page && browser) {
  const localData = new LocalData()

  const idaList = new IdaList(/* await localData.getAeroTest('scrap.json') */)

  consoleViewAction('test/scrap.test.js', 'index', 'aeroArgScraper Start ⏱️')

  const aeroArgScrap = await aeroArgScraper({ page, cantMesesProps: 2, idaList, switchTest: false })
  // aeroArgScrap = await aeroArgScraper({ page, cantMesesProps: 2, idaList, switchTest: true })

  await browser.close()

  consoleViewAction('test/scrap.test.js', 'index', 'aeroArgScraper Pass ✅')

  await localData.setAeroTest(aeroArgScrap, 'scrap.json')
}

consoleViewCicle('STOP', 'test/scrap.test.js', 'index', 'Test exitoso! ✅')
