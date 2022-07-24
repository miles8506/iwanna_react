import { Firebase } from '../firebase'

const db = Firebase.firestore()

/**
 *
 * @param {string} collectionName
 * @returns {void}
 */
export function requestGoods(collectionName) {
  return new Promise((resolve, reject) => {
    const ref = db.collection(collectionName)
    ref
      .get()
      .then(doc => {
        resolve(doc)
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 *
 * @param {string} collectionName
 * @param {string} factoryNum
 * @param {{sort: string}} data
 * @returns {void}
 */
export function requestAddGood(collectionName, factoryNum, data) {
  return new Promise((resolve, reject) => {
    db.collection(collectionName)
      .doc(factoryNum)
      .set(data)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *
 * @param {string} collectionName
 * @param {string} id
 * @returns {void}
 */
export function requestDelGood(collectionName, id) {
  return new Promise((resolve, reject) => {
    db.collection(collectionName).doc(id).delete()
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
