export default class ScrapData {
  id = String
  fechas = [Date]
  precio = Number
  empresa = String

  constructor ({ id = '', fechas = Array, precio = Number, empresa = String }) {
    this.id = id
    this.fechas = fechas
    this.precio = precio
    this.empresa = empresa
  }

  setId (comb = String, timestamp = Number) {
    this.id = `${comb}/${this.precio}/${this.empresa}/${timestamp}`
  }
}
