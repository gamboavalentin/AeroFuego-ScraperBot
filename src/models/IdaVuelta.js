export default class IdaVuelta {
  id = String
  idIda = String
  idVuelta = String
  precio = Number
  cantDias = {
    max: Number,
    min: Number
  }

  constructor ({ id = '', idIda = String, idVuelta = String, precio = Number, cantDias = { max: Number, min: Number } }) {
    this.id = id
    this.idIda = idIda
    this.idVuelta = idVuelta
    this.precio = precio
    this.cantDias = cantDias
  }

  setId (comb = String, timestamp = Number) {
    this.id = `${comb}/${this.precio}/${timestamp}`
  }
}
