import combinaciones from '../utils/combinaciones.js'
import IdaList from '../models/IdaList.js'
import Ida from '../models/Ida.js'
import IdaVuelta from '../models/IdaVuelta.js'
import { checkFechasIdaVuelta } from '../utils/fechas.js'
import IdaVueltaList from '../models/IdaVueltaList.js'

export function idaVueltaCreateList (idaList = new IdaList(), paramsCantDias = { max: Number, min: Number }, idaVueltaList = new IdaVueltaList()) {
  for (let i = 0; i < combinaciones.length; i++) { // ← Combinaciones
    const combIda = combinaciones[i]
    const combVuelta = `${combIda.split('-')[1]}-${combIda.split('-')[0]}`

    const diasListIda = idaList[combIda]
    const diasListVuelta = idaList[combVuelta]

    for (let nroIda = 0; nroIda < diasListIda.length; nroIda++) { // ← Dias ida
      const ida = new Ida(diasListIda[nroIda])
      const fechasIda = ida.fechas

      for (let nroVuelta = 0; nroVuelta < diasListVuelta.length; nroVuelta++) { // ← Dias vuelta
        const vuelta = new Ida(diasListVuelta[nroVuelta])
        const fechaVuelta = vuelta.fechas

        const { checkCantDias, cantDias } = checkFechasIdaVuelta(fechasIda, fechaVuelta, paramsCantDias)

        // ---- IdaVuelta Valido ---- ↴
        if (checkCantDias) {
          const precio = ida.precio + vuelta.precio
          const empresas = [ida.empresa, vuelta.empresa]
          const sumFechas = ida.sumFechas() + vuelta.sumFechas()

          idaVueltaList[combIda].push(new IdaVuelta({ comb: combIda, idIda: ida.id, idVuelta: vuelta.id, precio, empresas, cantDias, sumFechas }))
        }
      }
    }
  }

  return idaVueltaList
}
