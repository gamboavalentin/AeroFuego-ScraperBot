import { getLocalData } from '../src/controllers/localData.js'
import LocalData from '../src/models/localData.js'
import { consoleViewCicle } from '../src/utils/consoleView.js'

consoleViewCicle('START', 'test/getLocalData.test.js', 'index', 'Inicio de Test... 🛠️')

let localData = new LocalData()

localData = await getLocalData(localData)

console.log(localData.config)

consoleViewCicle('STOP', 'test/getLocalData.test.js', 'index', 'Test exitoso! ✅')
