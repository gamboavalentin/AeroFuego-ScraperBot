export default class AeroArgURL {
  constructor () {
    this.dates_calendar = 'https://www.aerolineas.com.ar/flex-dates-calendar?adt=1&inf=0&chd=0&flexDates=true&cabinClass=Economy&flightType=ROUND_TRIP'
    this.dates_calendar_one_way = 'https://www.aerolineas.com.ar/flex-dates-calendar?adt=1&inf=0&chd=0&flexDates=true&cabinClass=Economy&flightType=ONE_WAY'
    this.flights_offers = 'https://www.aerolineas.com.ar/flights-offers?adt=1&inf=0&chd=0&flexDates=false&cabinClass=Economy&flightType=ONE_WAY'
    this.fechaIda = null
    this.fechaVuelta = null
    this.origen = null
    this.destino = null
    this.provincias = {
      cordoba: 'COR',
      ushuaia: 'USH',
      riogrande: 'RGA',
      buenosaires: 'BUE'
    }
    this.combinaciones = [
      ['ushuaia', 'cordoba'],
      ['ushuaia', 'buenosaires'],
      ['riogrande', 'cordoba'],
      ['riogrande', 'buenosaires']
    ]
    this.cant_meses = 8
  }

  setDates_calendar () {
    this.reloadURL()
    this.fechaVuelta = new Date(this.fechaIda)
    this.fechaVuelta.setMonth(this.fechaIda.getMonth() + 1)

    const fIda = `${this.fechaIda.getFullYear()}${addZero(this.fechaIda.getMonth() + 1)}16`
    const fVuelta = `${this.fechaVuelta.getFullYear()}${addZero(this.fechaVuelta.getMonth() + 1)}16`

    this.dates_calendar += '&leg=' + this.origen + '-' + this.destino + '-' + fIda + '&leg=' + this.destino + '-' + this.origen + '-' + fVuelta
    this.dates_calendar_one_way += '&leg=' + this.destino + '-' + this.origen + '-' + fIda
  }

  setDates_calendarFIda () {
    this.reloadURL()
    const fIda = `${this.fechaIda.getFullYear()}${addZero(this.fechaIda.getMonth() + 1)}15`
    const fVuelta = `${this.fechaVuelta.getFullYear()}${addZero(this.fechaVuelta.getMonth() + 1)}16`

    this.dates_calendar += '&leg=' + this.origen + '-' + this.destino + '-' + fIda + '&leg=' + this.destino + '-' + this.origen + '-' + fVuelta
    this.dates_calendar_one_way += '&leg=' + this.origen + '-' + this.destino + '-' + fIda
  }

  setDates_calendarFVuelta () {
    this.reloadURL()
    const fIda = `${this.fechaIda.getFullYear()}${addZero(this.fechaIda.getMonth() + 1)}16`
    const fVuelta = `${this.fechaVuelta.getFullYear()}${addZero(this.fechaVuelta.getMonth() + 1)}15`

    this.dates_calendar += '&leg=' + this.origen + '-' + this.destino + '-' + fIda + '&leg=' + this.destino + '-' + this.origen + '-' + fVuelta
    this.dates_calendar_one_way += '&leg=' + this.origen + '-' + this.destino + '-' + fIda
  }

  reloadURL () {
    this.dates_calendar = 'https://www.aerolineas.com.ar/flex-dates-calendar?adt=1&inf=0&chd=0&flexDates=true&cabinClass=Economy&flightType=ROUND_TRIP'
    this.dates_calendar_one_way = 'https://www.aerolineas.com.ar/flex-dates-calendar?adt=1&inf=0&chd=0&flexDates=true&cabinClass=Economy&flightType=ONE_WAY'
    this.flights_offers = 'https://www.aerolineas.com.ar/flights-offers?adt=1&inf=0&chd=0&flexDates=false&cabinClass=Economy&flightType=ONE_WAY'
  }

  setFlightsOffers (origen_, destino_) {
    this.reloadURL()
    const fIda = `${this.fechaIda.getFullYear()}${addZero(this.fechaIda.getMonth() + 1)}${addZero(this.fechaIda.getDate())}`
    this.flights_offers += '&leg=' + origen_.toUpperCase() + '-' + destino_.toUpperCase() + '-' + fIda
  }

  setDates_calendarFIdaFVuelta (origen = null, destino = null, fida = null, fvuelta = null) {
    this.reloadURL()
    this.origen = origen ? origen.toUpperCase() : this.origen
    this.destino = destino ? destino.toUpperCase() : this.destino
    this.fechaIda = fida ? new Date(fida.ano, fida.mes - 1, fida.dia) : this.fechaIda
    const fIda = `${this.fechaIda.getFullYear()}${addZero(this.fechaIda.getMonth() + 1)}${addZero(this.fechaIda.getDate())}`

    this.fechaVuelta = fvuelta ? new Date(fvuelta.ano, fvuelta.mes - 1, fvuelta.dia) : this.fechaVuelta
    const fVuelta = `${this.fechaVuelta.getFullYear()}${addZero(this.fechaVuelta.getMonth() + 1)}${addZero(this.fechaVuelta.getDate())}`

    this.dates_calendar += '&leg=' + this.origen + '-' + this.destino + '-' + fIda + '&leg=' + this.destino + '-' + this.origen + '-' + fVuelta
  }
}

function addZero (d) {
  const a = parseInt(d)
  if (a < 10) {
    return `0${a}`
  } else {
    return a
  }
}

/*
Links de Pasajes: https://www.aerolineas.com.ar/flights-offers?adt=1&inf=0&chd=0&flexDates=false&cabinClass=Economy&flightType=ONE_WAY&leg=USH-COR-20230516
*/
