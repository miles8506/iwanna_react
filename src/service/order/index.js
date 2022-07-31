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
