import * as dotenv from 'dotenv'
import LocalData from '../src/models/LocalData.js'
import IdaList from '../src/models/IdaList.js'
import { consoleViewCicle } from '../src/utils/consoleView.js'

dotenv.config({ path: './src/config/.env' })

consoleViewCicle('START', 'test/agruparPorPrecio.test.js', 'index', 'Inicio de Test... 🛠️')

const localData = new LocalData()

const idaList = new IdaList(await localData.getAeroTest('scrap.json'))

idaList.agruparPorPrecio()

await localData.setAeroTest(idaList, 'agrupadoPorPrecio.json')

consoleViewCicle('STOP', 'test/agruparPorPrecio.test.js', 'index', 'Test exitoso! ✅')
