import { consoleLog, consoleError, ciclosEjecucion, dsOn } from '../api/discord.js'

function consoleViewAction (src, func, action) {
  const hoy = new Date()
  console.log(`[${hoy.toLocaleString()}] [ACTION] => ${src} => ${func} => ${action}`)
  // ---Discord---//
  if (dsOn) {
    consoleLog('ACTION', src, action)
  }
}

function consoleViewError (src, func, err) {
  const hoy = new Date()
  console.log(`[${hoy.toLocaleString()}] [ERROR] => ${src} => ${func} => ${err}`)
  // ---Discord---//
  if (dsOn) {
    consoleLog('ERROR', src, err)
    consoleError(src, err)
  }
}

function consoleViewCicle (tipo, src, func, action) {
  const hoy = new Date()
  console.log(`[${hoy.toLocaleString()}] [${tipo}] => ${src} => ${func} => ${action}`)
  // ---Discord---//
  if (dsOn) {
    consoleLog(tipo, src, action)
    ciclosEjecucion(tipo, src, action)
  }
}
export { consoleViewAction, consoleViewError, consoleViewCicle }
