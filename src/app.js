import * as dotenv from 'dotenv'
import { consoleViewCicle, consoleViewError } from './utils/consoleView.js'
import pageScraper from './controllers/pageScraper.js'
import { getLocalData } from './controllers/localData.js'
import { dsLogin, alertNewData } from './api/discord.js'
import aeroArgScraper from './webScrap/aerolineasArg.js'
import IdaList from './models/IdaList.js'
import { newListas } from './controllers/algoritmo.js'
import IdaVueltaList from './models/IdaVueltaList.js'
import PromedioList from './models/PromedioList.js'

dotenv.config({ path: './src/config/.env' })

// --------------- Discord --------------- //
dsLogin(process.env.DISCORD_TOKEN)

// -------------- LocalData ----------------//
const localData = await getLocalData()

// ---------------- Timer ----------------//
let timerOn = false
setInterval(async () => {
  const hoy = new Date()

  if ((hoy.getMinutes() === 0 || hoy.getMinutes() === 30) && !timerOn) {
    timerOn = true
    consoleViewCicle('START', 'src/utils/timer.js', 'timer', `trigger ${hoy.toLocaleTimeString()} [START]`)
    const { page, browser } = await pageScraper()

    if (!page || !browser) {
      consoleViewError('src/utils/timer.js', 'timer', `Error en la carga del browser [!page=${!page}, !browser=${!browser}]`)
      return
    }

    // ---- Scrap ---- ↴
    let idaListNew_ = new IdaList()

    idaListNew_ = await aeroArgScraper({ page, cantMesesProps: 8, idaList: idaListNew_ })

    await browser.close()

    // ---- Datos ---- ↴
    const datos = {
      idaListNew: idaListNew_,
      idaListOld: new IdaList(localData.idaList),
      idaVueltaListOld: new IdaVueltaList(localData.idaVueltaList),
      idaPromedioOld: new PromedioList({ db: localData.idaPromedioList }),
      idaVueltaPromedioOld: new PromedioList({ db: localData.idaVueltaPromedioList }),
      empresas: ['AA'],
      paramsCantDias: { max: 120, min: 3 }
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
