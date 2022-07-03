import { Firebase } from '../firebase'

const db = Firebase.firestore()

/**
 *
 * @param {string} collectionName
 * @returns
 */
export function requestGetSorts(collectionName) {
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
 * @param {string} doc
 * @param {{sort: string}} data
 * @returns
 */
export function requestAddSort(collectionName, doc, data) {
  return new Promise((resolve, reject) => {
    db.collection(collectionName)
      .doc(doc)
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
 */
export function requestDelSort(collectionName, id) {
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
