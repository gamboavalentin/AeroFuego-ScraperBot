import Promedio from './Promedio.js'

export default class PromedioList {
  dateArray = [Date]
  preciosLength = Number;

  ['ush-cor'] = Promedio;
  ['cor-ush'] = Promedio;
  ['ush-bue'] = Promedio;
  ['bue-ush'] = Promedio;
  ['rga-cor'] = Promedio;
  ['cor-rga'] = Promedio;
  ['rga-bue'] = Promedio;
  ['bue-rga'] = Promedio

  constructor ({ db = {}, preciosLength = 120 }) {
    this.dateArray = db.dateArray || [new Date()]
    this.preciosLength = db.preciosLength || preciosLength

    this['cor-ush'] = new Promedio(db['cor-ush'] || {})
    this['ush-bue'] = new Promedio(db['ush-bue'] || {})
    this['bue-ush'] = new Promedio(db['bue-ush'] || {})
    this['ush-cor'] = new Promedio(db['ush-cor'] || {})
    this['rga-cor'] = new Promedio(db['rga-cor'] || {})
    this['cor-rga'] = new Promedio(db['cor-rga'] || {})
    this['rga-bue'] = new Promedio(db['rga-bue'] || {})
    this['bue-rga'] = new Promedio(db['bue-rga'] || {})
  }

  addNewPrecios ({ promedio = new Promedio(), comb }) {
    this[comb].addAllPrecios(promedio, this.preciosLength)
    this[comb].calcularAllPromedios()
  }
}
