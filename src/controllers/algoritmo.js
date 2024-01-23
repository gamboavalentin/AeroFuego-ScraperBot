import IdaList from '../models/IdaList.js'
import IdaVueltaList from '../models/IdaVueltaList.js'
import combinaciones from '../models/Combinaciones.js'
import Promedio from '../models/Promedio.js'
import PromedioList from '../models/PromedioList.js'

export function newListas ({
  idaListOld = new IdaList(),
  idaVueltaListOld = new IdaVueltaList(),
  idaListScrap = new IdaList(),
  empresas = Array,
  paramsCantDias = { max: Number, min: Number },
  idaPromedioOld = new PromedioList(),
  idaVueltaPromedioOld = new PromedioList()
}) {
  // ------------------------------ IDA ------------------------------ //
  let idaListNew = idaListScrap
  // Agrupamos por precio y creamos las id ↴
  idaListNew.agruparPorPrecio()
  idaListNew = setAllId(idaListNew)

  // Borramos los precios viejos de la vieja lista ↴
  idaListOld.deleteOldPrices(idaListNew, empresas)

  // Agregamos los precios que no se borraron a la nueva lista ↴
  idaListNew.addOldList(idaListOld)

  // Ordenamos la lista por precio ↴
  idaListNew = ordenarPorPrecio(idaListNew)

  // ------------------------------ IDA Y VUELTA ------------------------------ //
  let idaVueltaListNew = new IdaVueltaList()

  // Crear la Lista de ida y vuelta con los pasajes de ida ↴
  idaVueltaListNew.createList(idaListNew, paramsCantDias)
  idaVueltaListNew = setAllId(idaVueltaListNew)

  // Agregamos los vuelos de la vieja lista de otras combinaciones ↴
  idaVueltaListNew.addOldList(idaVueltaListOld)

  // Ordenamos la lista por precio ↴
  idaVueltaListNew = ordenarPorPrecio(idaVueltaListNew)

  // ------------------------------ Promedios ------------------------------ //
  const idaPromedioNew = promedio({ list: idaListNew, promedioList: idaPromedioOld })
  const idaVueltaPromedioNew = promedio({ list: idaVueltaListNew, promedioList: idaVueltaPromedioOld })

  return { idaListNew, idaVueltaListNew, idaPromedioNew, idaVueltaPromedioNew }
}

export function ordenarPorPrecio (list) {
  // ✈️ Recorrer todas las combinaciones
  for (let i = 0; i < combinaciones.length; i++) {
    if (list[combinaciones[i]].length > 0) {
      const diasList = list[combinaciones[i]]
      // 🗓️ Recorrer todos los dias
      for (let izq = 0; izq < (diasList.length - 1); izq++) { // ← Seleccionar el dia de la izquierda
        const diaIzq = diasList[izq]

        for (let der = izq + 1; der < diasList.length; der++) { // ← Seleccionar los dias de la derecha
          const diaDer = diasList[der]

          if (diaIzq.precio > diaDer.precio) {
            diasList[izq] = diaDer
            diasList[der] = diaIzq
            izq--
            break
          }
        }
      }

      // 💾 Guardar la lista
      list[combinaciones[i]] = diasList
    }
  }
  return list
}

export function setAllId (list) {
  // ✈️ Recorrer todas las combinaciones
  for (let i = 0; i < combinaciones.length; i++) {
    const comb = combinaciones[i]
    if (list[comb].length > 0) {
      const viajes = list[comb]
      // 🗓️ Recorrer todos los viajes
      for (let z = 0; z < viajes.length; z++) { // ← Seleccionar cada uno de los viejes
        viajes[z].setId(comb, list.timestamp)
      }

      // 💾 Guardar la lista
      list[comb] = viajes
    }
  }
  return list
}

export function promedio ({ list = new IdaList() || new IdaVueltaList(), promedioList = new PromedioList() }) {
  promedioList.addNewDate()

  for (let i = 0; i < combinaciones.length; i++) {
    const comb = combinaciones[i]
    const vuelosCombinacion = list[comb]
    const promedio = new Promedio({})

    vuelosCombinacion.forEach(vuelo => {
      if (promedio.max.valor && vuelo.precio > promedio.max.valor) {
        promedio.max.valor = vuelo.precio
      }
      if (promedio.min.valor && vuelo.precio < promedio.min.valor) {
        promedio.min.valor = vuelo.precio
      }
      promedio.media.precios.push(vuelo.precio)
    })

    promedio.media.valor = promedio.calcularPromedio(promedio.media.precios)

    promedioList.addNewPrecios({ promedio, comb })
  }

  return promedioList
}
