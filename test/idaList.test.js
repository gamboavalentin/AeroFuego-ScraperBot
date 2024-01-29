import * as dotenv from 'dotenv'
import LocalData from '../src/models/localData.js'
import IdaList from '../src/models/IdaList.js'
import { consoleViewCicle } from '../src/utils/consoleView.js'
import { ordenarPorPrecio } from '../src/controllers/algoritmo.js'

dotenv.config({ path: './src/config/.env' })

consoleViewCicle('START', 'test/idaList.test.js', 'index', 'Inicio de Test... 🛠️')

const localData = new LocalData()

let idaList = new IdaList(await localData.getAeroTest('scrap.json'))

idaList.agruparPorPrecio()

idaList = ordenarPorPrecio(idaList)

await localData.setAeroTest(idaList, 'idaList.json')

consoleViewCicle('STOP', 'test/idaList.test.js', 'index', 'Test exitoso! ✅')
