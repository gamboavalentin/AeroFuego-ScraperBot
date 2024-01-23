import * as dotenv from 'dotenv'
import { consoleViewCicle, consoleViewAction } from '../src/utils/consoleView.js'
import LocalData from '../src/models/localData.js'
import IdaList from '../src/models/IdaList.js'
import { newListas } from '../src/controllers/algoritmo.js'
import IdaVueltaList from '../src/models/IdaVueltaList.js'
import PromedioList from '../src/models/PromedioList.js'

dotenv.config({ path: '../src/src/config/.env' })

// ----------------- START TEST -----------------//
consoleViewCicle('START', 'test/newListas.test.js', 'index', 'Inicio de Test... 🛠️')

// ---- Local Data READ ---- ↴
consoleViewAction('test/newListas.test.js', 'index', 'localData GET Start... ⏱️')
const localData = new LocalData()

const idaListOld = new IdaList(await localData.getAeroTest('idaList.json'))
const idaVueltaListOld = new IdaVueltaList(await localData.getAeroTest('idaVueltaList.json'))
const idaPromedioOld = new PromedioList({ db: await localData.getAeroTest('idaPromedioList.json') })
const idaVueltaPromedioOld = new PromedioList({ db: await localData.getAeroTest('idaVueltaPromedioList.json') })
consoleViewAction('test/newListas.test.js', 'index', 'localData GET Pass. ✅')

// ---- SCRAP ---- ↴
const idaListScrap = new IdaList(await localData.getAeroTest('scrap.json'))

// ---- newListas ---- ↴
consoleViewAction('test/newListas.test.js', 'index', 'newListas Start... ⏱️')
const { idaListNew, idaVueltaListNew, idaPromedioNew, idaVueltaPromedioNew } = newListas({
  idaListNew: idaListScrap,
  idaListOld,
  idaVueltaListOld,
  idaPromedioOld,
  idaVueltaPromedioOld,
  empresas: ['AA'],
  paramsCantDias: { max: 120, min: 3 }
})
consoleViewAction('test/newListas.test.js', 'index', 'newListas Pass. ✅')

// ---- Local Data READ ---- ↴
consoleViewAction('test/newListas.test.js', 'index', 'localData SET Start... ⏱️')

await localData.setAeroTest(idaListNew, 'newList/idaList.json')
await localData.setAeroTest(idaVueltaListNew, 'newList/idaVueltaList.json')
await localData.setAeroTest(idaPromedioNew, 'newList/idaPromedioList.json')
await localData.setAeroTest(idaVueltaPromedioNew, 'newList/idaVueltaPromedioList.json')
consoleViewAction('test/promedio.test.js', 'index', 'localData SET Pass. ✅')

// ----------------- END TEST -----------------//

consoleViewCicle('STOP', 'test/newListas.test.js', 'index', 'Test exitoso! ✅')
