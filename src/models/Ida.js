export default class Ida {
  id = String
  comb = String
  fechas = [Date]
  precio = Number
  empresa = String
  date = Date

  constructor ({ id = '', comb = String, fechas = Array, precio = Number, empresa = String, date = null }) {
    this.comb = comb
    this.fechas = fechas
    this.precio = precio
    this.empresa = empresa
    this.date = date || new Date()

    this.id = id || this.createId()
  }

  createId () {
    return `ida/${this.comb}/${this.empresa}/${this.precio}/${this.sumFechas()}`
  }

  updateId () {
    this.id = this.createId()
  }

  sumFechas () {
    let sumaDias = 0

    this.fechas.forEach(fecha => {
      const dateFecha = new Date(fecha)

      sumaDias += (dateFecha.getMonth() + 1) + dateFecha.getDate()
    })

    return sumaDias
  }

  agregarFechas (fechas_) {
    this.fechas = this.fechas.concat(fechas_)
  }
}
