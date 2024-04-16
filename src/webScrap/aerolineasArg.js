import AeroargUrl from '../models/aeroargUrl.js'
import Ida from '../models/Ida.js'
import IdaList from '../models/IdaList.js'
import { consoleViewAction } from '../utils/consoleView.js'
import { fechaParse } from '../utils/fechas.js'
import reloadPageForSelector from '../utils/reloadPageForSelector.js'
import { pageScreenshot } from '../utils/screenshot.js'

async function aeroScraper (page, type, comb) {
  // fdcBox
  const fdcBox = await page.$(`.fdc-${type}-box`)
  // año
  let ano = await fdcBox.$eval('.header-title', text => text.textContent)
  ano = ano.split(' ')[4]
  // mes
  const mes = await fdcBox.$eval('.fdc-month', text => text.textContent)

  // Seleccionar los div de los días
  const diasList = await fdcBox.$$eval('div[class=react-calendar__month-view__days] > button', list => {
    // eliminar dias de otros meses
    list = list.filter(day => day.querySelector('.fdc-button-price') != null)

    list = list.map(day => {
      const datos = { dia: null, precio: null }
      // precio
      datos.precio = parseInt(day.querySelector('.fdc-button-price').textContent)
      // dia
      datos.dia = day.querySelector('.fdc-button-day').textContent
      return datos
    })
    return list
  })

  return diasList.map(diaPack => {
    const fecha = fechaParse({ año: ano, mesNombre: mes, dia: diaPack.dia })
    return new Ida({ comb, precio: diaPack.precio, fechas: [fecha], empresa: 'AA' })
  })
}

let _switch_ = false

export default async function aeroArgScraper ({ page, cantMesesProps, idaList = new IdaList(), switchTest }) {
  const url = new AeroargUrl()
  const combinaciones = []
  const cantMeses = cantMesesProps !== null ? cantMesesProps : url.cant_meses
  _switch_ = switchTest || _switch_

  if (_switch_) {
    combinaciones.push(url.combinaciones[0])
    combinaciones.push(url.combinaciones[1])
    _switch_ = false
  } else {
    combinaciones.push(url.combinaciones[2])
    combinaciones.push(url.combinaciones[3])
    _switch_ = true
  }

  for (let z = 0; z < combinaciones.length; z++) {
    const dateSearch = new Date()
    dateSearch.setDate(16)

    url.origen = url.provincias[combinaciones[z][0]]
    url.destino = url.provincias[combinaciones[z][1]]

    const combIda = `${url.origen.toLowerCase()}-${url.destino.toLowerCase()}`
    const comVuelta = `${url.destino.toLowerCase()}-${url.origen.toLowerCase()}`

    for (let i = -1; i < cantMeses; i++) {
      consoleViewAction('src/webScrap/aerolineasArg.js.js', 'aeroArgScraper', `cargando pagina: comb [${combinaciones[z]}] mes: [${i + 1}/${cantMeses}]`)
      let primerMes = false
      if (i !== 0) { dateSearch.setMonth(dateSearch.getMonth() + 1) }
      if (i === -1) { primerMes = true }

      url.fechaIda = dateSearch
      url.setDates_calendar()

      let pageUrl = ''
      if (primerMes) { pageUrl = url.dates_calendar_one_way } else { pageUrl = url.dates_calendar }

      const { error, page_ } = await reloadPageForSelector(page, pageUrl)

      if (error) {
        continue
      }
      page = page_

      // TODO: Probar que no se cargue la pagina desde el cache
      await pageScreenshot(page, combIda)

      if (primerMes) {
        idaList[comVuelta] = idaList[comVuelta].concat(await aeroScraper(page, 'from', comVuelta))
      } else {
        idaList[combIda] = idaList[combIda].concat(await aeroScraper(page, 'from', combIda))
        idaList[comVuelta] = idaList[comVuelta].concat(await aeroScraper(page, 'to', comVuelta))
      }
    }
  }

  return idaList
}
