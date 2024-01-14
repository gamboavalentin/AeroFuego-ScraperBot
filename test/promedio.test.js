import * as dotenv from 'dotenv'
import { consoleViewCicle, consoleViewAction } from '../src/utils/consoleView.js'
import PromedioList from '../src/models/PromedioList.js'
import { promedio } from '../src/controllers/algoritmo.js'
import IdaList from '../src/models/IdaList.js'
import LocalData from '../src/models/localData.js'

dotenv.config({ path: './src/config/.env' })

consoleViewCicle('START', 'test/promedio.test.js', 'index', 'Inicio de Test... 🛠️')

const localData = new LocalData()

const idalist = new IdaList(await localData.getAeroTest('idaList.json'))
const idaVueltalist = new IdaList(await localData.getAeroTest('idaVueltaList.json'))

// -------- promedioList --------↴

consoleViewAction('test/promedio.test.js', 'index', 'promedioList Start ⏱️')

const idapromedioListNew = new PromedioList({})
const idaVueltapromedioListNew = new PromedioList({})

consoleViewAction('test/promedio.test.js', 'index', 'promedioList Pass ✅')

// -------- promedioListTest --------↴

consoleViewAction('test/promedio.test.js', 'index', 'promedioListTest Start ⏱️')

const idaPromedioList = promedio({ list: idalist, promedioList: idapromedioListNew })
const idaVueltaPromedioList = promedio({ list: idaVueltalist, promedioList: idaVueltapromedioListNew })

consoleViewAction('test/promedio.test.js', 'index', 'promedioListTest Pass ✅')

// -------- save --------↴

await localData.setAeroTest(idaPromedioList, 'idaPromedioList.json')
await localData.setAeroTest(idaVueltaPromedioList, 'idaVueltaPromedioList.json')

consoleViewCicle('STOP', 'test/promedio.test.js', 'index', 'Test exitoso! ✅')
