import * as dotenv from 'dotenv'
import LocalData from '../src/models/localData.js'
import { consoleViewCicle } from '../src/utils/consoleView.js'
import combinaciones from '../src/utils/combinaciones.js'
import IdaList from '../src/models/IdaList.js'

dotenv.config({ path: './src/config/.env' })

consoleViewCicle('START', 'test/updateScrapId.test.js', 'index', 'Inicio de Test... ⏱️')

const localData = new LocalData()

let scrap = await localData.getAeroTest('scrap.json')

for (let combNro = 0; combNro < combinaciones.length; combNro++) {
  const comb = combinaciones[combNro]

  const vuelo = scrap[comb]

  for (let vueloNro = 0; vueloNro < vuelo.length; vueloNro++) {
    vuelo[vueloNro].comb = comb
  }
}

scrap = new IdaList(scrap)

await localData.setAeroTest(scrap, 'scrap.json')

consoleViewCicle('STOP', 'test/updateScrapId.test.js', 'index', 'Test exitoso! 🏁')
