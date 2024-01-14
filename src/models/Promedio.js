export default class Promedio {
  max = {
    valor: Number,
    precios: Array
  }

  min = {
    valor: Number,
    precios: Array
  }

  media = {
    valor: Number,
    precios: Array
  }

  constructor ({ max = { valor: -1, precios: [] }, min = { valor: 9999999, precios: [] }, media = { valor: 0, precios: [] } }) {
    this.max = max
    this.min = min
    this.media = media
  }

  calcularAllPromedios () {
    this.max.valor = this.calcularPromedio(this.max.precios)
    this.media.valor = this.calcularPromedio(this.media.precios)
    this.min.valor = this.calcularPromedio(this.min.precios)
  }

  calcularPromedio (precios) {
    let suma = 0
    precios.forEach(precio => {
      suma += precio
    })

    return parseInt(suma / precios.length)
  }

  addAllPrecios (promedio = new Promedio(), preciosLength) {
    this.max.precios.unshift(promedio.max.valor)
    this.max.precios.length = preciosLength > this.max.precios.length ? this.max.precios.length : preciosLength

    this.media.precios.unshift(promedio.media.valor)
    this.media.precios.length = preciosLength > this.max.precios.length ? this.max.precios.length : preciosLength

    this.min.precios.unshift(promedio.min.valor)
    this.min.precios.length = preciosLength > this.max.precios.length ? this.max.precios.length : preciosLength
  }
}
