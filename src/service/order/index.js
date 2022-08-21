import { Firebase } from '../firebase'

const db = Firebase.firestore()

/**
 *
 * @param {string} collectionName
 * @returns {void}
 */
export function requestGetOrders(collectionName) {
  return new Promise((resolve, reject) => {
    const ref = db.collection(collectionName)
    ref
      .get()
      .then((doc) => {
        resolve(doc)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 *
 * @param {string} collectionName
 * @param {string} orderId
 * @param {{sort: string}} data
 * @returns {void}
 */
export function requestAddOrder(collectionName, id, data) {
  return new Promise((resolve, reject) => {
    db.collection(collectionName)
      .doc(id)
      .set(data)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
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
export function requestDelOrder(collectionName, id) {
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

/**
 *
 * @param {string} collectionName
 * @param {string} fieldPath
 * @param {string} opStr
 * @param {number | string} value
 * @returns {void}
 */
export function requestGetOrder(collectionName, fieldPath, opStr, value) {
  return new Promise((resolve, reject) => {
    const ref = db.collection(collectionName)
    ref
      .where(fieldPath, opStr, value).get()
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 *
 * @param {string} collectionName
 * @param {string} iid
 * @param {any} data
 * @returns {void}
 */
export function requestUpdateOrder(collectionName, iid, data) {
  return new Promise((resolve, reject) => {
    const ref = db.collection(collectionName).doc(iid)
    ref.update(data)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
