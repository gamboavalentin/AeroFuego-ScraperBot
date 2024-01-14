import * as dotenv from 'dotenv'
import LocalData from '../src/models/localData.js'
import IdaList from '../src/models/IdaList.js'
import { consoleViewCicle } from '../src/utils/consoleView.js'

dotenv.config({ path: './src/config/.env' })

consoleViewCicle('START', 'test/eliminarViejosPrecios.test.js', 'index', 'Inicio de Test... 🛠️')

const localData = new LocalData()

const aeroTest = new IdaList(await localData.getAeroTest('idaList.json'))

aeroTest.deleteOldPrices('rga-cor', 'AA')

await localData.setAeroTest(aeroTest, 'deleteOldPrices.json')

consoleViewCicle('STOP', 'test/eliminarViejosPrecios.test.js', 'index', 'Test exitoso! ✅')
