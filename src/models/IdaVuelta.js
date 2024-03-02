import { consoleViewError } from '../utils/consoleView.js'

export default class IdaVuelta {
  id = String
  comb = String
  idIda = String
  idVuelta = String
  precio = Number
  empresas = [String]
  date = Date
  cantDias = {
    max: Number,
    min: Number
  }

  constructor ({ id = null, comb = String, idIda = String, idVuelta = String, precio = Number, empresas = [String], cantDias = { max: Number, min: Number }, sumFechas = null, date = null }) {
    this.comb = comb
    this.idIda = idIda
    this.idVuelta = idVuelta
    this.precio = precio
    this.empresas = empresas
    this.date = date || new Date()
    this.cantDias = cantDias

    this.id = id || this.createId(sumFechas)
  }

  createId (sumFechas = Number) {
    if (!this.comb || !this.precio || !sumFechas || this.empresas.length === 0) {
      consoleViewError('src/models/IdaVuelta.js', 'createId', `Datos faltantes [comb=${this.comb}, precio=${this.precio}, sumFechas=${sumFechas}, empresas.length=${this.empresas.length}]`)
    }
    return `idaVuelta/${this.comb}/${this.empresas[0]}/${this.empresas[1]}/${this.precio}/${sumFechas}`
  }
}
