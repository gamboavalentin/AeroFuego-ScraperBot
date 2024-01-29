import combinaciones from '../utils/combinaciones.js'
import IdaVuelta from './IdaVuelta.js'

export default class IdaVueltaList {
  date = Date;

  ['ush-cor'] = [IdaVuelta];
  ['cor-ush'] = [IdaVuelta];
  ['ush-bue'] = [IdaVuelta];
  ['bue-ush'] = [IdaVuelta];
  ['rga-cor'] = [IdaVuelta];
  ['cor-rga'] = [IdaVuelta];
  ['rga-bue'] = [IdaVuelta];
  ['bue-rga'] = [IdaVuelta]

  constructor (db = {}) {
    this.timestamp = db.timestamp || new Date()

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

  addOldList (idaVueltaListOld = new IdaVueltaList()) {
    for (let i = 0; i < combinaciones.length; i++) {
      const comb = combinaciones[i]
      if (this[comb].length === 0) {
        this[comb] = idaVueltaListOld[comb]
      }
    }
  }
}
