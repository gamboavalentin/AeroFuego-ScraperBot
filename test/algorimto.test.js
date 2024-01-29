import * as dotenv from 'dotenv'
import LocalData from '../src/models/localData.js'
import { newListas } from '../src/controllers/algoritmo.js'
import { consoleViewCicle } from '../src/utils/consoleView.js'
import IdaList from '../src/models/IdaList.js'
import IdaVueltaList from '../src/models/IdaVueltaList.js'
import PromedioList from '../src/models/PromedioList.js'

dotenv.config({ path: './src/config/.env' })

consoleViewCicle('START', 'test/algoritmo.test.js', 'index', 'Inicio de Test... ⏱️')

const localData = new LocalData()

const idaListOld = new IdaList(await localData.getAeroTest('idaList.json'))
const idaVueltaListOld = new IdaVueltaList(await localData.getAeroTest('idaVueltaList.json'))
const idaPromedioOld = new PromedioList({ db: await localData.getAeroTest('idaPromedioList.json') })
const idaVueltaPromedioOld = new PromedioList({ db: await localData.getAeroTest('idaVueltaPromedioList.json') })
const scrap = new IdaList(await localData.getAeroTest('scrap.json'))

consoleViewCicle('START', 'test/algoritmo.test.js', 'getLocalData', 'Pass. ✅')

const datos = {
  idaListOld,
  idaVueltaListOld,
  idaListScrap: scrap,
  empresas: ['AA'],
  paramsCantDias: { max: 120, min: 3 },
  idaPromedioOld,
  idaVueltaPromedioOld
}

const { idaListNew, idaVueltaListNew, idaPromedioNew, idaVueltaPromedioNew } = newListas(datos)

consoleViewCicle('START', 'test/algoritmo.test.js', 'newListas', 'Pass. ✅')

await localData.setAeroTest(idaListNew, 'idaList.json')
await localData.setAeroTest(idaVueltaListNew, 'idaVueltaList.json')
await localData.setAeroTest(idaPromedioNew, 'idaPromedioList.json')
await localData.setAeroTest(idaVueltaPromedioNew, 'idaVueltaPromedioList.json')

consoleViewCicle('START', 'test/algoritmo.test.js', 'setAeroTest', 'Pass. ✅')

consoleViewCicle('STOP', 'test/algoritmo.test.js', 'index', 'Test exitoso! 🏁')
