import * as dotenv from 'dotenv'
import { consoleViewCicle, consoleViewAction } from '../src/utils/consoleView.js'
import pageScraper from '../src/controllers/pageScraper.js'
import aeroArgScraper from '../src/webScrap/aerolineasArg.js'
import LocalData from '../src/models/localData.js'
import IdaList from '../src/models/IdaList.js'
import { newListas } from '../src/controllers/algoritmo.js'
import IdaVueltaList from '../src/models/IdaVueltaList.js'
import PromedioList from '../src/models/PromedioList.js'

dotenv.config({ path: '../src/src/config/.env' })

// ----------------- START TEST -----------------//
consoleViewCicle('START', 'test/app.test.js', 'index', 'Inicio de Test... 🛠️')
const { page, browser } = await pageScraper()

// ---- Local Data READ ---- ↴
consoleViewAction('test/promedio.test.js', 'index', 'localData GET Start... ⏱️')
const localData = new LocalData()

const idaListOld = new IdaList(await localData.getAeroTest('idaList.json'))
const idaVueltaListOld = new IdaVueltaList(await localData.getAeroTest('idaVueltaList.json'))
const idaPromedioOld = new PromedioList({ db: await localData.getAeroTest('idaPromedioList.json') })
const idaVueltaPromedioOld = new PromedioList({ db: await localData.getAeroTest('idaVueltaPromedioList.json') })
consoleViewAction('test/promedio.test.js', 'index', 'localData GET Pass. ✅')

// ---- SCRAP ---- ↴
consoleViewAction('test/promedio.test.js', 'index', 'Scrap Start... ⏱️')
let idaListScrap = new IdaList()

idaListScrap = await aeroArgScraper({ page, cantMesesProps: 2, idaList: idaListScrap })

await page.close()
await browser.close()
consoleViewAction('test/promedio.test.js', 'index', 'Scrap Pass. ✅')

// ---- newListas ---- ↴
consoleViewAction('test/promedio.test.js', 'index', 'newListas Start... ⏱️')
const { idaListNew, idaVueltaListNew, idaPromedioNew, idaVueltaPromedioNew } = newListas({
  idaListScrap,
  idaListOld,
  idaVueltaListOld,
  idaPromedioOld,
  idaVueltaPromedioOld,
  empresas: ['AA']
})
consoleViewAction('test/promedio.test.js', 'index', 'newListas Pass. ✅')

// ---- Local Data READ ---- ↴
consoleViewAction('test/promedio.test.js', 'index', 'localData SET Start... ⏱️')

await localData.setAeroTest(idaListNew, 'app/idaList.json')
await localData.setAeroTest(idaVueltaListNew, 'app/idaVueltaList.json')
await localData.setAeroTest(idaPromedioNew, 'app/idaPromedioList.json')
await localData.setAeroTest(idaVueltaPromedioNew, 'app/idaVueltaPromedioList.json')
consoleViewAction('test/promedio.test.js', 'index', 'localData SET Pass. ✅')

// ----------------- END TEST -----------------//

consoleViewCicle('STOP', 'test/app.test.js', 'index', 'Test exitoso! ✅')
