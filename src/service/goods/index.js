import { Firebase } from '../firebase'

const db = Firebase.firestore()

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
