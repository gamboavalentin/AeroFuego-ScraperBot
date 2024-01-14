import * as dotenv from 'dotenv'
import LocalData from '../src/models/localData.js'
import { newList } from '../src/controllers/algoritmo.js'
import { consoleViewCicle } from '../src/utils/consoleView.js'

dotenv.config({ path: './src/config/.env' })

consoleViewCicle('START', 'test/algoritmo.test.js', 'index', 'Inicio de Test... 🛠️')

const localData = new LocalData()

const scrap = await localData.getAeroTest('scrap.json')

const aeroTest = newList({ idaListNew: scrap, idaListOld: scrap })

await localData.setAeroTest(aeroTest)

consoleViewCicle('STOP', 'test/algoritmo.test.js', 'index', 'Test exitoso! ✅')
