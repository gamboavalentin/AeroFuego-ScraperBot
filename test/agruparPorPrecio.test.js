import * as dotenv from 'dotenv'
import LocalData from '../src/models/localData.js'
import IdaList from '../src/models/IdaList.js'
import { consoleViewCicle } from '../src/utils/consoleView.js'
import { agruparPorPrecio } from '../src/controllers/algoritmo.js'

dotenv.config({ path: './src/config/.env' })

consoleViewCicle('START', 'test/agruparPorPrecio.test.js', 'index', 'Inicio de Test... 🛠️')

const localData = new LocalData()

const aeroTest = agruparPorPrecio(new IdaList(await localData.getAeroTest('scrap.json')))

await localData.setAeroTest(aeroTest, 'agrupadoPorPrecio.json')

consoleViewCicle('STOP', 'test/agruparPorPrecio.test.js', 'index', 'Test exitoso! ✅')
