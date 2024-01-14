import LocalData from '../models/LocalData.js'

export async function getLocalData (localData = new LocalData()) {
  await Promise.all([
    localData.getIdaList(),
    localData.getIdaVueltaList(),
    localData.getIdaPromedioList(),
    localData.getIdaVueltaPromedioList(),
    localData.getConfig()
  ])
  return localData
}
