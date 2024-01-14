import * as dotenv from 'dotenv'
import LocalData from '../src/models/localData.js'
import IdaList from '../src/models/IdaList.js'
import IdaVueltaList from '../src/models/IdaVueltaList.js'
import { consoleViewCicle } from '../src/utils/consoleView.js'
import { setAllId, ordenarPorPrecio } from '../src/controllers/algoritmo.js'

dotenv.config({ path: './src/config/.env' })

consoleViewCicle('START', 'test/idaVueltaList.test.js', 'index', 'Inicio de Test... 🛠️')

const localData = new LocalData()

const idaList = new IdaList(await localData.getAeroTest('idaList.json'))

let idaVueltaList = new IdaVueltaList()

idaVueltaList.createList(idaList, { max: 30, min: 2 })
idaVueltaList = setAllId(idaVueltaList)

idaVueltaList = ordenarPorPrecio(idaVueltaList)

await localData.setAeroTest(idaVueltaList, 'idaVueltaList.json')

consoleViewCicle('STOP', 'test/idaVueltaList.test.js', 'index', 'Test exitoso! ✅')
