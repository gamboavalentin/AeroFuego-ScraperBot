const mesesList = {
  enero: 1,
  febrero: 2,
  marzo: 3,
  abril: 4,
  mayo: 5,
  junio: 6,
  julio: 7,
  agosto: 8,
  septiembre: 9,
  octubre: 10,
  noviembre: 11,
  diciembre: 12
}

export function fechaParse ({ año, mes, mesNombre, dia }) {
  mes = mesNombre ? mesesList[mesNombre] : mes
  return new Date(año, mes, dia)
}

export function checkFechasIdaVuelta (fechasIda = Array, fechasVuelta = Array, paramsCantDias = { max: Number, min: Number }) {
  const cantDias = { max: 0, min: 999 }
  let checkCantDias = false

  for (let nroIda = 0; nroIda < fechasIda.length; nroIda++) { // ← Fechas ida
    const fechaIda = new Date(fechasIda[nroIda])

    for (let nroVuelta = 0; nroVuelta < fechasVuelta.length; nroVuelta++) { // ← Fechas vuelta
      const fechaVuelta = new Date(fechasVuelta[nroVuelta])

      const msEntreFechas = fechaVuelta.getTime() - fechaIda.getTime()

      if (msEntreFechas > 0) {
        const diasCombinacion = parseInt(msEntreFechas / (1000 * 60 * 60 * 24)) // (1000*60*60*24) --> milisegundos -> segundos -> minutos -> horas -> días

        if (diasCombinacion >= paramsCantDias.min && diasCombinacion <= paramsCantDias.max) {
          checkCantDias = true
        }

        if (checkCantDias) {
          cantDias.max = diasCombinacion > cantDias.max ? diasCombinacion : cantDias.max
          cantDias.min = diasCombinacion < cantDias.min ? diasCombinacion : cantDias.min
        }
      }
    }
  }

  return { checkCantDias, cantDias }
}
