import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyCP3enf6GJ9c4nIEdB0R1RYpF5gnIeVTXI',
  authDomain: 'yard-60efd.firebaseapp.com',
  projectId: 'yard-60efd',
  storageBucket: 'yard-60efd.appspot.com',
  messagingSenderId: '924045729952',
  appId: '1:924045729952:web:83f903a21b1ea97ff169c5',
}

const firebaseApp = initializeApp(firebaseConfig)

const db = getDatabase(firebaseApp)
const auth = getAuth()

export { db, auth }
