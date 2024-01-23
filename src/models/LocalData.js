import os from 'os'
import * as url from 'url'
import fs from 'fs'
import nombreArchivos from '../utils/nombreArchivos.js'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

let urlOsType
let urlTest

if (os.type() === 'Linux') {
  urlOsType = '/home/gambolas/nodejs/af/public/'
  urlTest = '/home/gambolas/nodejs/af/test/'
} else if (os.type() === 'Windows_NT') {
  urlOsType = __dirname + '../../../public/'
  urlTest = __dirname + '../../../test/'
}

export default class LocalData {
  idaList
  idaVueltaList
  idaPromedioList
  idaVueltaPromedioList
  config

  constructor () {
    this.idaList = {}
    this.idaVueltaList = {}
    this.idaPromedioList = {}
    this.idaVueltaPromedioList = {}
    this.config = {}
  }

  // ----- Ida List -----//
  async getIdaList () {
    this.idaList = await JSON.parse(await fs.readFileSync(urlOsType + nombreArchivos.listas.ida))
    return this.idaList
  }

  async setIdaList (idaList_) {
    this.idaList = idaList_
    await fs.writeFileSync(urlOsType + nombreArchivos.listas.ida, JSON.stringify(this.idaList))
  }

  // ----- Ida Vuelta List -----//
  async getIdaVueltaList () {
    this.idaVueltaList = await JSON.parse(await fs.readFileSync(urlOsType + nombreArchivos.listas.idaVuelta))
    return this.idaVueltaList
  }

  async setIdaVueltaList (idaVueltaList_) {
    this.idaVueltaList = idaVueltaList_
    await fs.writeFileSync(urlOsType + nombreArchivos.listas.idaVuelta, JSON.stringify(this.idaVueltaList))
  }

  // ----- Ida Promedio List -----//
  async getIdaPromedioList () {
    this.idaPromedioList = await JSON.parse(await fs.readFileSync(urlOsType + nombreArchivos.promedio.ida))
    return this.idaPromedioList
  }

  async setIdaPromedioList (idaPromedioList_) {
    this.idaPromedioList = idaPromedioList_
    await fs.writeFileSync(urlOsType + nombreArchivos.promedio.ida, JSON.stringify(this.idaPromedioList))
  }

  // ----- Ida Vuelta Promedio List -----//
  async getIdaVueltaPromedioList () {
    this.idaVueltaPromedioList = await JSON.parse(await fs.readFileSync(urlOsType + nombreArchivos.promedio.idaVuelta))
    return this.idaVueltaPromedioList
  }

  async setIdaVueltaPromedioList (idaVueltaPromedioList_) {
    this.idaVueltaPromedioList = idaVueltaPromedioList_
    await fs.writeFileSync(urlOsType + nombreArchivos.promedio.idaVuelta, JSON.stringify(this.idaVueltaPromedioList))
  }

  // ----- AeroTest -----//
  async getAeroTest (nombreArchivo = String) {
    this.aero_test = await JSON.parse(await fs.readFileSync(urlTest + nombreArchivo))
    return this.aero_test
  }

  async setAeroTest (aeroTest_, nombreArchivo = String) {
    this.aero_test = aeroTest_
    await fs.writeFileSync(urlTest + nombreArchivo, JSON.stringify(aeroTest_))
    return null
  }

  // ----- Config -----//
  async getConfig () {
    this.config = await JSON.parse(await fs.readFileSync(urlOsType + nombreArchivos.config))
    return this.config
  }

  async setConfig (config_) {
    this.config = config_
    await fs.writeFileSync(urlOsType + nombreArchivos.config, JSON.stringify(config_))
  }
}
