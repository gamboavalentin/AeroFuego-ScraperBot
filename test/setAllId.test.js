import * as dotenv from 'dotenv'
import LocalData from '../src/models/localData.js'
import IdaList from '../src/models/IdaList.js'
import { consoleViewCicle } from '../src/utils/consoleView.js'

dotenv.config({ path: './src/config/.env' })

consoleViewCicle('START', 'test/setAllId.test.js', 'index', 'Inicio de Test... 🛠️')

const localData = new LocalData()

const aeroTest = new IdaList(await localData.getAeroTest())

aeroTest.setAllId()

await localData.setAeroTest(aeroTest)

consoleViewCicle('STOP', 'test/setAllId.test.js', 'index', 'Test exitoso! ✅')
