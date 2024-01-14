import IdaVuelta from './IdaVuelta.js'
import combinaciones from './Combinaciones.js'
import IdaList from './IdaList.js'
import { checkFechasIdaVuelta } from '../utils/fechas.js'

export default class IdaVueltaList {
  timestamp = Date;

  ['ush-cor'] = [IdaVuelta];
  ['cor-ush'] = [IdaVuelta];
  ['ush-bue'] = [IdaVuelta];
  ['bue-ush'] = [IdaVuelta];
  ['rga-cor'] = [IdaVuelta];
  ['cor-rga'] = [IdaVuelta];
  ['rga-bue'] = [IdaVuelta];
  ['bue-rga'] = [IdaVuelta]

  constructor (db = {}) {
    const d = new Date()

    this.timestamp = db.timestamp || d.getTime()
    this['ush-cor'] = db['ush-cor'] ? this.toIdaVuelta(db['ush-cor']) : []
    this['cor-ush'] = db['cor-ush'] ? this.toIdaVuelta(db['cor-ush']) : []
    this['ush-bue'] = db['ush-bue'] ? this.toIdaVuelta(db['ush-bue']) : []
    this['bue-ush'] = db['bue-ush'] ? this.toIdaVuelta(db['bue-ush']) : []
    this['rga-cor'] = db['rga-cor'] ? this.toIdaVuelta(db['rga-cor']) : []
    this['cor-rga'] = db['cor-rga'] ? this.toIdaVuelta(db['cor-rga']) : []
    this['rga-bue'] = db['rga-bue'] ? this.toIdaVuelta(db['rga-bue']) : []
    this['bue-rga'] = db['bue-rga'] ? this.toIdaVuelta(db['bue-rga']) : []
  }

  toIdaVuelta (diasList = Array) {
    for (let i = 0; i < diasList.length; i++) {
      diasList[i] = new IdaVuelta(diasList[i])
    }
    return diasList
  }

  createList (idaList = new IdaList(), paramsCantDias = { max: Number, min: Number }) {
    for (let i = 0; i < combinaciones.length; i++) { // ← Combinaciones
      const combIda = combinaciones[i]
      const combVuelta = `${combIda.split('-')[1]}-${combIda.split('-')[0]}`

      const diasListIda = idaList[combIda]
      const diasListVuelta = idaList[combVuelta]

      for (let nroIda = 0; nroIda < diasListIda.length; nroIda++) { // ← Dias ida
        const ida = diasListIda[nroIda]
        const fechasIda = ida.fechas

        for (let nroVuelta = 0; nroVuelta < diasListVuelta.length; nroVuelta++) { // ← Dias vuelta
          const vuelta = diasListVuelta[nroVuelta]
          const fechaVuelta = vuelta.fechas

          const { checkCantDias, cantDias } = checkFechasIdaVuelta(fechasIda, fechaVuelta, paramsCantDias)
          if (checkCantDias) {
            const precio = ida.precio + vuelta.precio
            this[combIda].push(new IdaVuelta({ idIda: ida.id, idVuelta: vuelta.id, precio, cantDias }))
          }
        }
      }
    }
  }

  addOldList (idaVueltaListOld = new IdaVueltaList()) {
    for (let i = 0; i < combinaciones.length; i++) {
      const comb = combinaciones[i]
      if (this[comb].length === 0) {
        this[comb] = idaVueltaListOld[comb]
      }
    }
  }
}
