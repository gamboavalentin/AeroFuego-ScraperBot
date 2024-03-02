import * as dotenv from 'dotenv'
import LocalData from '../src/models/LocalData.js'
import IdaList from '../src/models/IdaList.js'
import { consoleViewCicle } from '../src/utils/consoleView.js'
import { ordenarPorPrecio } from '../src/controllers/algoritmo.js'

dotenv.config({ path: './src/config/.env' })

consoleViewCicle('START', 'test/agruparPorPrecio.test.js', 'index', 'Inicio de Test... 🛠️')

const localData = new LocalData()

const aeroTest = ordenarPorPrecio(new IdaList(await localData.getAeroTest('scrap.json')))

await localData.setAeroTest(aeroTest, 'ordenadoPorPrecio.json')

consoleViewCicle('STOP', 'test/agruparPorPrecio.test.js', 'index', 'Test exitoso! ✅')
