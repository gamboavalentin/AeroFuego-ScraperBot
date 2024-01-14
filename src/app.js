import * as dotenv from 'dotenv'
import { consoleViewCicle } from './utils/consoleView.js'
import pageScraper from './controllers/pageScraper.js'
import { getLocalData } from './controllers/localData.js'
import { dsLogin, alertNewData } from './api/discord.js'
import aeroArgScraper from './webScrap/aerolineasArg.js'
import IdaList from './models/IdaList.js'
import { newListas } from './controllers/algoritmo.js'
import IdaVueltaList from './models/IdaVueltaList.js'
import PromedioList from './models/PromedioList.js'

dotenv.config({ path: './src/config/.env' })

// -----------------DISCORD-----------------//
dsLogin(process.env.DISCORD_TOKEN)

// -----------------TRIGGER-----------------//
await getLocalData()

// -----------------LocalData-----------------//
const localData = await getLocalData()

// -----------------TIMER-----------------//
let timerOn = false
setInterval(async () => {
  const hoy = new Date()

  if ((hoy.getMinutes() === 0 || hoy.getMinutes() === 30) && !timerOn) {
    timerOn = true
    consoleViewCicle('START', 'src/utils/timer.js', 'timer', `trigger ${hoy.toLocaleTimeString()} [START]`)
    const { page, browser } = await pageScraper()

    // ---- SCRAP ---- ↴
    let idaListScrap = new IdaList()

    idaListScrap = await aeroArgScraper({ page, cantMesesProps: 8, idaList: idaListScrap })

    await page.close()
    await browser.close()

    // ---- Datos ---- ↴
    const datos = {
      idaListScrap,
      idaListOld: new IdaList(localData.idaList),
      idaVueltaListOld: new IdaVueltaList(localData.idaVueltaList),
      idaPromedioOld: new PromedioList(localData.idaPromedioList),
      idaVueltaPromedioOld: new PromedioList(localData.idaVueltaPromedioList),
      empresas: ['AA']
    }

    // ---- newList ---- ↴
    const { idaListNew, idaVueltaListNew, idaPromedioNew, idaVueltaPromedioNew } = newListas(datos)

    // ---- Local Data READ ---- ↴
    await localData.setIdaList(idaListNew)
    await localData.setIdaVueltaList(idaVueltaListNew)
    await localData.setIdaPromedioList(idaPromedioNew)
    await localData.setIdaVueltaPromedioList(idaVueltaPromedioNew)

    // ---- Alerta Discord ---- ↴
    alertNewData()

    consoleViewCicle('STOP', 'src/utils/timer.js', 'timer', `stop ${hoy.toLocaleTimeString()} [STOP]`)
    timerOn = false
  }
}, 1000)
