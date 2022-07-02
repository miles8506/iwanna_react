import { Firebase } from '../firebase'

const db = Firebase.firestore()

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

export function requestAddSort(collectionName) {
  return new Promise((resolve, reject) => {
    db.collection(collectionName)
      .doc('1212')
      .set({ sort: '1212' })
      .then((res) => {
        console.log('success', res)
      })
      .catch((err) => {
        console.log(err)
      })
  })
}
