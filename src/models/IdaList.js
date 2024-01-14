import Ida from './Ida.js'
import combinaciones from './Combinaciones.js'

export default class IdaList {
  timestamp = Date;

  ['ush-cor'] = [Ida];
  ['cor-ush'] = [Ida];
  ['ush-bue'] = [Ida];
  ['bue-ush'] = [Ida];
  ['rga-cor'] = [Ida];
  ['cor-rga'] = [Ida];
  ['rga-bue'] = [Ida];
  ['bue-rga'] = [Ida]

  constructor (db = {}) {
    const d = new Date()

    this.timestamp = d.getTime()
    this['ush-cor'] = db['ush-cor'] ? this.toSrcapData(db['ush-cor']) : []
    this['cor-ush'] = db['cor-ush'] ? this.toSrcapData(db['cor-ush']) : []
    this['ush-bue'] = db['ush-bue'] ? this.toSrcapData(db['ush-bue']) : []
    this['bue-ush'] = db['bue-ush'] ? this.toSrcapData(db['bue-ush']) : []
    this['rga-cor'] = db['rga-cor'] ? this.toSrcapData(db['rga-cor']) : []
    this['cor-rga'] = db['cor-rga'] ? this.toSrcapData(db['cor-rga']) : []
    this['rga-bue'] = db['rga-bue'] ? this.toSrcapData(db['rga-bue']) : []
    this['bue-rga'] = db['bue-rga'] ? this.toSrcapData(db['bue-rga']) : []
  }

  toSrcapData (diasList = Array) {
    for (let i = 0; i < diasList.length; i++) {
      diasList[i] = new Ida(diasList[i])
    }
    return diasList
  }

  agruparPorPrecio () {
    // Recorrer todas las combinaciones
    for (let i = 0; i < combinaciones.length; i++) {
      if (this[combinaciones[i]].length > 0) {
        const diasList = this[combinaciones[i]]
        // Recorrer todos los dias
        for (let izq = 0; izq < (diasList.length - 1); izq++) { // ← Seleccionar el dia de la izquierda
          const diaIzq = diasList[izq]

          for (let der = izq + 1; der < diasList.length; der++) { // ← Seleccionar los dias de la derecha
            const diaDer = diasList[der]

            if (diaIzq.empresa === diaDer.empresa && diaIzq.precio === diaDer.precio) {
              diasList[izq].fechas = diasList[izq].fechas.concat(diaDer.fechas)

              diasList.splice(der, 1)
              der--
            }
          }
        }

        this[combinaciones[i]] = diasList
      }
    }
  }

  deleteOldPrices (idaListNew = new IdaList(), empresas = Array) {
    for (let i = 0; i < combinaciones.length; i++) {
      const comb = combinaciones[i]

      if (idaListNew[comb].length > 0) {
        const diasList = this[comb]
        for (let i = 0; i < diasList.length; i++) {
          const dia = diasList[i]
          if (empresas.indexOf(dia.empresa) !== -1) {
            diasList.splice(i, 1)
            i--
          }
        }
        this[comb] = diasList
      }
    }
  }

  addOldList (idaListOld = new IdaList()) {
    for (let i = 0; i < combinaciones.length; i++) {
      const comb = combinaciones[i]

      this[comb] = this[comb].concat(idaListOld[comb])
    }
  }
}
